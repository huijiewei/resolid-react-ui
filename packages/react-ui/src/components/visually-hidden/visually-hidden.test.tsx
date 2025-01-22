import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { VisuallyHidden } from "./visually-hidden";

describe("VisuallyHidden", () => {
  test("should render correctly", async () => {
    const { getByText } = render(<VisuallyHidden>Click me</VisuallyHidden>);

    expect(getByText(/Click me/i)).toBeInTheDocument();
  });
});
