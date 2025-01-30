import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "../tooltip";

describe("Tooltip", () => {
  test("renders tooltip trigger", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Tooltip Trigger</TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          Tooltip Content
        </TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByText("Tooltip Trigger")).toBeInTheDocument();
    expect(screen.queryByText("Tooltip Content")).not.toBeInTheDocument();
  });

  test("renders tooltip content when trigger is hovered", async () => {
    render(
      <Tooltip openDelay={0}>
        <TooltipTrigger>Tooltip Trigger</TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          Tooltip Content
        </TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByText("Tooltip Trigger");

    expect(screen.queryByText("Tooltip Content")).not.toBeInTheDocument();

    await userEvent.hover(trigger);

    await waitFor(() => {
      expect(screen.queryAllByText("Tooltip Content")[0]).toBeVisible();
    });
  });

  test("renders tooltip content is dismissed when trigger is clicked", async () => {
    render(
      <Tooltip openDelay={0}>
        <TooltipTrigger>Tooltip Trigger</TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          Tooltip Content
        </TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByText("Tooltip Trigger");

    expect(screen.queryByText("Tooltip Content")).not.toBeInTheDocument();

    await userEvent.hover(trigger);

    await waitFor(() => {
      expect(screen.queryAllByText("Tooltip Content")[0]).toBeVisible();
    });

    await userEvent.click(trigger);

    await waitFor(() => {
      expect(screen.queryByText("Tooltip Content")).not.toBeInTheDocument();
    });
  });
});
