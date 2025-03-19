import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, test } from "vitest";
import { axe } from "vitest-axe";
import { Pagination, type PaginationProps } from "../pagination";

const ComponentUnderTest = (props: PaginationProps) => <Pagination {...props} />;

describe("Pagination", () => {
  afterEach(() => {
    cleanup();
  });

  test("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest total={100} pageSize={10} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  test("should update page when item is clicked", async () => {
    render(<ComponentUnderTest total={100} pageSize={10} />);

    const pageTwoLink = screen.getByLabelText("第 2 页");

    expect(pageTwoLink).not.toHaveAttribute("aria-current", "page");

    await userEvent.click(pageTwoLink);

    expect(pageTwoLink).toHaveAttribute("aria-current", "page");
  });

  test("should update page when next button is clicked", async () => {
    render(<ComponentUnderTest total={100} pageSize={10} />);

    const pageOneLink = screen.getByLabelText("第 1 页");
    expect(pageOneLink).toHaveAttribute("aria-current", "page");

    const nextPageLink = screen.getByLabelText("下一页");

    await userEvent.click(nextPageLink);

    const pageTwoLink = screen.getByLabelText("第 2 页");
    expect(pageTwoLink).toHaveAttribute("aria-current", "page");
  });

  test("should update page when prev button is clicked", async () => {
    render(<ComponentUnderTest total={100} pageSize={10} />);

    const pageTwoLink = screen.getByLabelText("第 2 页");

    await userEvent.click(pageTwoLink);
    expect(pageTwoLink).toHaveAttribute("aria-current", "page");

    const prevPageLink = screen.getByLabelText("上一页");
    await userEvent.click(prevPageLink);

    const pageOneLink = screen.getByLabelText("第 1 页");
    expect(pageOneLink).toHaveAttribute("aria-current", "page");
  });
});
