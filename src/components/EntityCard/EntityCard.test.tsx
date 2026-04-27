import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { EntityCard } from "./EntityCard";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import type { Entity } from "../../types/entity";

// Mock the hook so tests are not coupled to the Clipboard API,
// which jsdom does not implement.
vi.mock("../../hooks/useCopyToClipboard");

const entity: Entity = {
  byte: 193,
  dec: [193],
  hex: ["U+00C1"],
  char: "Á",
  htmlNumberDecimal: "&#193;",
  htmlNumberHex: "&#xC1;",
  htmlName: "&Aacute;",
  description: "LATIN CAPITAL LETTER A WITH ACUTE",
};

// EntityCard renders an <li>, which requires a list parent to be valid HTML.
const renderCard = () => render(<ul><EntityCard entity={entity} /></ul>);

describe("EntityCard", () => {
  const mockCopy = vi.fn<(value: string) => Promise<void>>();

  beforeEach(() => {
    mockCopy.mockClear();
    mockCopy.mockResolvedValue(undefined);
    vi.mocked(useCopyToClipboard).mockReturnValue({
      copiedValue: null,
      copy: mockCopy,
    });
  });

  it("renders a copy button for each entity code", () => {
    renderCard();
    expect(
      screen.getByRole("button", { name: /copy &aacute; to clipboard/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /copy &#193; to clipboard/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /copy &#xc1; to clipboard/i })
    ).toBeInTheDocument();
  });

  it("renders the Unicode description", () => {
    renderCard();
    expect(
      screen.getByText("LATIN CAPITAL LETTER A WITH ACUTE")
    ).toBeInTheDocument();
  });

  it("calls copy with the correct value when the button is clicked", async () => {
    const user = userEvent.setup();
    renderCard();
    await user.click(
      screen.getByRole("button", { name: /copy &aacute; to clipboard/i })
    );
    expect(mockCopy).toHaveBeenCalledWith("&Aacute;");
  });

  it("shows 'Copied' in the button whose value matches copiedValue", () => {
    vi.mocked(useCopyToClipboard).mockReturnValueOnce({
      copiedValue: "&Aacute;",
      copy: mockCopy as (value: string) => Promise<void>,
    });
    renderCard();
    expect(
      screen.getByRole("button", { name: /copied &aacute;/i })
    ).toHaveTextContent("Copied");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderCard();
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
