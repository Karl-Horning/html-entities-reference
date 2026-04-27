import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { SearchInput } from "./SearchInput";

// Placeholder used where the onChange callback is not under test.
const noop = () => {};

describe("SearchInput", () => {
  it("renders an accessible search input", () => {
    render(
      <SearchInput value="" onChange={noop} resultCount={0} totalCount={100} />
    );
    expect(
      screen.getByRole("searchbox", { name: /filter entities/i })
    ).toBeInTheDocument();
  });

  it("calls onChange with the new value when the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SearchInput
        value=""
        onChange={onChange}
        resultCount={0}
        totalCount={100}
      />
    );
    await user.type(screen.getByRole("searchbox"), "a");
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("shows the result count when a query is active", () => {
    render(
      <SearchInput
        value="amp"
        onChange={noop}
        resultCount={5}
        totalCount={100}
      />
    );
    expect(screen.getByText(/5 of 100/i)).toBeInTheDocument();
  });

  it("shows nothing in the status region when the query is empty", () => {
    render(
      <SearchInput value="" onChange={noop} resultCount={100} totalCount={100} />
    );
    expect(screen.queryByText(/of 100/i)).not.toBeInTheDocument();
  });

  it("uses the singular 'result' when exactly one entity matches", () => {
    render(
      <SearchInput
        value="amp"
        onChange={noop}
        resultCount={1}
        totalCount={100}
      />
    );
    expect(screen.getByText(/1 of 100 result\b/i)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SearchInput value="" onChange={noop} resultCount={0} totalCount={100} />
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
