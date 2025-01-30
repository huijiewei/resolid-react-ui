import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { axe } from "vitest-axe";
import { Spinner } from "../spinner";

describe("Spinner", () => {
  afterEach(() => {
    cleanup();
  });

  test("should have no a11y violations", async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  test("should render with default sr-only", () => {
    const { getByText } = render(<Spinner />);

    expect(getByText("加载中")).toHaveClass("sr-only");
  });
});
