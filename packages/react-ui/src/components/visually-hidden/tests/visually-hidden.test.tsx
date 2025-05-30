import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { axe } from "vitest-axe";
import { VisuallyHidden } from "../visually-hidden";

describe("VisuallyHidden", () => {
  afterEach(() => {
    cleanup();
  });

  test("should have no a11y violations", async () => {
    const { container } = render(<VisuallyHidden>Click me</VisuallyHidden>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
