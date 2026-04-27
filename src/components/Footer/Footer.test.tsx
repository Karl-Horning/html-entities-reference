import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Footer } from "./Footer";
import { SITE_START_YEAR } from "../../config";

describe("Footer", () => {
  it("renders the author name as a link", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: "Karl Horning" })
    ).toBeInTheDocument();
  });

  it("renders an accessible link to the GitHub repository", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: /source code on github/i })
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  describe("copyright year range", () => {
    // Fake timers pin new Date() so year-range assertions are deterministic.
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("shows only the start year when the current year matches", () => {
      vi.setSystemTime(new Date(`${SITE_START_YEAR}-06-15`));
      render(<Footer />);
      expect(
        screen.getByText(new RegExp(`© ${SITE_START_YEAR}\\b`))
      ).toBeInTheDocument();
    });

    it("shows a year range when the current year exceeds the start year", () => {
      const nextYear = SITE_START_YEAR + 1;
      vi.setSystemTime(new Date(`${nextYear}-01-01`));
      render(<Footer />);
      expect(
        screen.getByText(new RegExp(`© ${SITE_START_YEAR}–${nextYear}`))
      ).toBeInTheDocument();
    });
  });
});
