import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { axe } from "vitest-axe";
import { Avatar, type AvatarProps } from "../avatar";
import { AvatarFallback } from "../avatar-fallback";
import { AvatarImage } from "../avatar-image";

const ComponentUnderTest = (props: AvatarProps) => {
  return (
    <Avatar name={"avatar"} {...props}>
      <AvatarImage src="https://file.resolid.tech/images%2Fa001.jpg" />
      <AvatarFallback>PA</AvatarFallback>
    </Avatar>
  );
};

describe("Avatar", () => {
  afterEach(() => {
    cleanup();
  });

  test("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
