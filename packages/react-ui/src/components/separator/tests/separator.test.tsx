import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Separator } from "../separator";

describe("Separator", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders a div with the `separator` role", async () => {
    const { getByRole } = render(<Separator />);

    expect(getByRole("separator")).toBeVisible();
  });

  test("should have implicit 'aria-orientation' by default", () => {
    const { getByRole } = render(<Separator />);

    const separator = getByRole("separator");

    expect(separator).toHaveAttribute("aria-orientation");
  });
});
