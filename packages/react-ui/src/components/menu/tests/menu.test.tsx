import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuContent,
  MenuContextmenuTrigger,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIndicator,
  type MenuProps,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "../menu";

const ComponentUnderTest = (
  props: MenuProps & {
    onValueChange?: (value: string | number) => void;
  },
) => {
  const { onValueChange, ...rest } = props;
  return (
    <Menu {...rest}>
      <MenuTrigger>Open menu</MenuTrigger>
      <MenuContextmenuTrigger>Open Context Menu</MenuContextmenuTrigger>
      <MenuContent>
        <MenuArrow />
        <MenuGroup>
          <MenuGroupLabel>Resolid UI</MenuGroupLabel>
          <MenuItem disabled>Dialog</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuCheckboxItem checked>
          <MenuItemIndicator>✅</MenuItemIndicator>
          Check me
        </MenuCheckboxItem>
        <MenuSeparator />
        <MenuRadioGroup value="react" onChange={onValueChange}>
          <MenuGroupLabel>JS Frameworks</MenuGroupLabel>
          {["react", "solid", "vue", "svelte"].map((framework) => (
            <MenuRadioItem key={framework} value={framework} disabled={framework === "svelte"}>
              <MenuItemIndicator>✅</MenuItemIndicator>
              {framework}
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
        <MenuSeparator />
        <Menu>
          <MenuSubmenuTrigger>CSS Frameworks</MenuSubmenuTrigger>
          <MenuContent>
            <MenuItem>Tailwind CSS</MenuItem>
          </MenuContent>
        </Menu>
      </MenuContent>
    </Menu>
  );
};

describe("Menu", () => {
  afterEach(() => {
    cleanup();
  });

  test("should have no a11y violations", async () => {
    const { container } = render(<ComponentUnderTest />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  test("should set correct aria attributes on disabled MenuItems", () => {
    render(<ComponentUnderTest open />);

    expect(screen.getByText("Dialog")).toHaveAttribute("aria-disabled", "true");
  });

  test("should not fire onValueChange on disabled MenuItems", async () => {
    const onValueChange = vi.fn();

    render(<ComponentUnderTest open onValueChange={onValueChange} />);

    await userEvent.click(screen.getByText(/svelte/i));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  test("should apply correct role to MenuItemGroup", async () => {
    render(<ComponentUnderTest />);

    const button = screen.getByRole("button", { name: /open menu/i });

    fireEvent.click(button);

    await waitFor(() => expect(screen.getAllByRole("group")).toHaveLength(2));
  });

  test("should open on context menu", async () => {
    render(<ComponentUnderTest />);

    const div = screen.getByText(/Open Context Menu/i);

    fireEvent.contextMenu(div);

    await waitFor(() => expect(screen.getByText(/Resolid UI/i)).toBeVisible());
  });

  test("should open on nested menu", async () => {
    render(<ComponentUnderTest />);

    const button = screen.getByRole("button", { name: /open menu/i });

    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText(/Resolid UI/i)).toBeVisible());

    fireEvent.click(screen.getByText(/CSS Frameworks/i));

    await waitFor(() => expect(screen.getByText(/Tailwind CSS/i)).toBeVisible());
  });

  test("should select a radio option", async () => {
    render(<ComponentUnderTest />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);
    await waitFor(() => expect(screen.getByText(/JS Frameworks/i)).toBeVisible());

    const radioButton = screen.getByRole("menuitemradio", { name: /react/i });
    fireEvent.click(radioButton);

    await waitFor(() => expect(radioButton).toHaveAttribute("aria-checked", "true"));
  });

  test("focuses the first item after the menu is opened by keyboard", async () => {
    render(<ComponentUnderTest />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });

    await act(async () => {
      menuButton.focus();
    });

    await userEvent.keyboard("[Enter]");

    const [firstItem, ...otherItems] = screen.getAllByRole("menuitem");

    await waitFor(() => {
      expect(firstItem.tabIndex).to.equal(0);
    });

    otherItems.forEach((item) => {
      expect(item.tabIndex).to.equal(-1);
    });
  });

  test("focuses the first item when down arrow key opens the menu", async () => {
    render(<ComponentUnderTest />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });

    await act(async () => {
      menuButton.focus();
    });

    await userEvent.keyboard("[ArrowDown]");

    const [firstItem, ...otherItems] = screen.getAllByRole("menuitem");

    await waitFor(() => expect(firstItem).toHaveFocus());

    otherItems.forEach((item) => {
      expect(item.tabIndex).to.equal(-1);
    });
  });
});
