import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, test } from "vitest";
import { axe } from "vitest-axe";
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  type PopoverProps,
  PopoverTitle,
  PopoverTrigger,
} from "../popover";

const ComponentUnderTest = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger>click me</PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverTitle>title</PopoverTitle>
      <PopoverDescription>description</PopoverDescription>
      <PopoverClose>close</PopoverClose>
    </PopoverContent>
  </Popover>
);

describe("Popover", () => {
  afterEach(() => {
    cleanup();
  });

  test("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  test("should open and close the popover", async () => {
    render(<ComponentUnderTest />);

    await userEvent.click(screen.getByText("click me"));
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    await userEvent.click(screen.getByText("close"));
    await waitFor(() => {
      expect(screen.queryByText("title")).not.toBeInTheDocument();
    });
  });

  test("should focus the first focusable element", async () => {
    render(<ComponentUnderTest />);

    await userEvent.click(screen.getByText("click me"));
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
  });

  test("should open by default", async () => {
    render(<ComponentUnderTest defaultOpen />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
