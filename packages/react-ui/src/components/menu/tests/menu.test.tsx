import { act, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { describe, expect, test, vi } from "vitest";
import { Menu, MenuContent, MenuItem, MenuSubmenuTrigger, MenuTrigger } from "../menu";

describe("Menu", () => {
  const setup = (jsx: ReactNode) => ({
    user: userEvent.setup(),
    ...render(jsx),
  });

  describe("keyboard navigation", () => {
    test("changes the highlighted item using the arrow keys", async () => {
      const { getByRole, getByTestId, user } = setup(
        <Menu>
          <MenuTrigger>Toggle</MenuTrigger>
          <MenuContent>
            <MenuItem data-testid="item-1">1</MenuItem>
            <MenuItem data-testid="item-2">2</MenuItem>
            <MenuItem data-testid="item-3">3</MenuItem>
          </MenuContent>
        </Menu>,
      );

      const trigger = getByRole("button", { name: "Toggle" });

      await act(async () => {
        trigger.focus();
      });

      await user.keyboard("[Enter]");

      const item1 = getByTestId("item-1");
      const item2 = getByTestId("item-2");
      const item3 = getByTestId("item-3");

      await waitFor(() => {
        expect(item1).toHaveFocus();
      });

      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        expect(item2).toHaveFocus();
      });

      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        expect(item3).toHaveFocus();
      });

      await user.keyboard("{ArrowUp}");

      await waitFor(() => {
        expect(item2).toHaveFocus();
      });
    });

    test("changes the highlighted item using the Home and End keys", async () => {
      const { getByRole, getByTestId, user } = setup(
        <Menu>
          <MenuTrigger>Toggle</MenuTrigger>
          <MenuContent>
            <MenuItem data-testid="item-1">1</MenuItem>
            <MenuItem data-testid="item-2">2</MenuItem>
            <MenuItem data-testid="item-3">3</MenuItem>
          </MenuContent>
        </Menu>,
      );

      const trigger = getByRole("button", { name: "Toggle" });

      await act(async () => {
        trigger.focus();
      });

      await user.keyboard("[Enter]");

      const item1 = getByTestId("item-1");
      const item3 = getByTestId("item-3");

      await waitFor(() => {
        expect(item1).toHaveFocus();
      });

      await user.keyboard("{End}");

      await waitFor(() => {
        expect(item3).toHaveFocus();
      });

      await user.keyboard("{Home}");
      await waitFor(() => {
        expect(item1).toHaveFocus();
      });
    });

    test("includes disabled items during keyboard navigation", async () => {
      const { getByRole, getByTestId, user } = setup(
        <Menu>
          <MenuTrigger>Toggle</MenuTrigger>
          <MenuContent>
            <MenuItem data-testid="item-1">1</MenuItem>
            <MenuItem disabled data-testid="item-2">
              2
            </MenuItem>
          </MenuContent>
        </Menu>,
      );

      const trigger = getByRole("button", { name: "Toggle" });

      await act(async () => {
        trigger.focus();
      });

      await user.keyboard("[Enter]");

      const item1 = getByTestId("item-1");
      const item2 = getByTestId("item-2");

      await waitFor(() => {
        expect(item1).toHaveFocus();
      });

      await user.keyboard("{ArrowDown}");

      expect(item2).toHaveAttribute("aria-disabled", "true");
    });

    describe("text navigation", () => {
      test("changes the highlighted item", async () => {
        const { getByText, getAllByRole, user } = setup(
          <Menu open>
            <MenuTrigger>Toggle</MenuTrigger>
            <MenuContent>
              <MenuItem>Aa</MenuItem>
              <MenuItem>Ba</MenuItem>
              <MenuItem>Bb</MenuItem>
              <MenuItem>Ca</MenuItem>
              <MenuItem>Cb</MenuItem>
              <MenuItem>Cd</MenuItem>
            </MenuContent>
          </Menu>,
        );

        const items = getAllByRole("menuitem");

        await act(async () => {
          items[0].focus();
        });

        await user.keyboard("c");

        await waitFor(() => {
          expect(getByText("Ca")).toHaveFocus();
        });

        expect(getByText("Ca")).toHaveAttribute("tabindex", "0");

        await user.keyboard("d");
        await waitFor(() => {
          expect(getByText("Cd")).toHaveFocus();
        });

        expect(getByText("Cd")).toHaveAttribute("tabindex", "0");
      });

      test("changes the highlighted item using text navigation on label prop", async () => {
        const { getByRole, getAllByRole, user } = setup(
          <Menu>
            <MenuTrigger>Toggle</MenuTrigger>
            <MenuContent>
              <MenuItem label="Aa">1</MenuItem>
              <MenuItem label="Ba">2</MenuItem>
              <MenuItem label="Bb">3</MenuItem>
              <MenuItem label="Ca">4</MenuItem>
            </MenuContent>
          </Menu>,
        );

        const trigger = getByRole("button", { name: "Toggle" });

        await user.click(trigger);

        const items = getAllByRole("menuitem");

        await act(async () => {});

        await user.keyboard("b");

        await waitFor(() => {
          expect(items[1]).toHaveAttribute("tabindex", "0");
        });

        await user.keyboard("b");

        await waitFor(() => {
          expect(items[2]).toHaveAttribute("tabindex", "0");
        });

        await user.keyboard("b");

        await waitFor(() => {
          expect(items[2]).to.toHaveAttribute("tabindex", "0");
        });
      });

      test("skips the non-stringify items", async () => {
        const { getByText, getAllByRole, user } = setup(
          <Menu open>
            <MenuTrigger>Toggle</MenuTrigger>
            <MenuContent>
              <MenuItem>Aa</MenuItem>
              <MenuItem>Ba</MenuItem>
              <MenuItem />
              <MenuItem>
                <div>Nested Content</div>
              </MenuItem>
              <MenuItem>{undefined}</MenuItem>
              <MenuItem>{null}</MenuItem>
              <MenuItem>Bc</MenuItem>
            </MenuContent>
          </Menu>,
        );

        const items = getAllByRole("menuitem");

        await act(async () => {
          items[0].focus();
        });

        await user.keyboard("b");

        await waitFor(() => {
          expect(getByText("Ba")).toHaveFocus();
        });
        expect(getByText("Ba")).toHaveAttribute("tabindex", "0");

        await user.keyboard("c");
        await waitFor(() => {
          expect(getByText("Bc")).toHaveFocus();
        });
        expect(getByText("Bc")).toHaveAttribute("tabindex", "0");
      });

      test("navigate to options with diacritic characters", async () => {
        const { getByText, getAllByRole, user } = setup(
          <Menu open>
            <MenuTrigger>Toggle</MenuTrigger>
            <MenuContent>
              <MenuItem>Aa</MenuItem>
              <MenuItem>Ba</MenuItem>
              <MenuItem>Bb</MenuItem>
              <MenuItem>Bą</MenuItem>
            </MenuContent>
          </Menu>,
        );

        const items = getAllByRole("menuitem");

        await act(async () => {
          items[0].focus();
        });

        await user.keyboard("b");

        await waitFor(() => {
          expect(getByText("Ba")).toHaveFocus();
        });

        expect(getByText("Ba")).toHaveAttribute("tabindex", "0");

        await user.keyboard("ą");

        await waitFor(() => {
          expect(getByText("Bą")).toHaveFocus();
        });

        expect(getByText("Bą")).toHaveAttribute("tabindex", "0");
      });

      test("navigate to next options beginning with diacritic characters", async () => {
        const { getByText, getAllByRole, user } = setup(
          <Menu open>
            <MenuTrigger>Toggle</MenuTrigger>
            <MenuContent>
              <MenuItem>Aa</MenuItem>
              <MenuItem>ąa</MenuItem>
              <MenuItem>ąb</MenuItem>
              <MenuItem>ąc</MenuItem>
            </MenuContent>
          </Menu>,
        );

        const items = getAllByRole("menuitem");

        await act(async () => {
          items[0].focus();
        });

        await user.keyboard("ą");

        await waitFor(() => {
          expect(getByText("ąa")).toHaveFocus();
        });

        expect(getByText("ąa")).toHaveAttribute("tabindex", "0");
      });

      test("does not trigger the onClick event when Space is pressed during text navigation", async () => {
        const handleClick = vi.fn();

        const { getAllByRole, user } = setup(
          <Menu open>
            <MenuTrigger>Toggle</MenuTrigger>
            <MenuContent>
              <MenuItem onClick={() => handleClick()}>Item One</MenuItem>
              <MenuItem onClick={() => handleClick()}>Item Two</MenuItem>
              <MenuItem onClick={() => handleClick()}>Item Three</MenuItem>
            </MenuContent>
          </Menu>,
        );

        const items = getAllByRole("menuitem");

        await act(async () => {
          items[0].focus();
        });

        await user.keyboard("Item T");

        expect(handleClick).not.toHaveBeenCalled();

        await waitFor(() => {
          expect(items[1]).toHaveFocus();
        });
      });
    });
  });

  describe("nested menus", () => {
    ([["vertical", "ltr", "ArrowRight", "ArrowLeft"]] as const).forEach(
      ([orientation, direction, openKey, closeKey]) => {
        test(`opens a nested menu of a ${orientation} ${direction.toUpperCase()} menu with ${openKey} key and closes it with ${closeKey}`, async () => {
          const { getByTestId, queryByTestId, user } = setup(
            <Menu open>
              <MenuContent>
                <MenuItem>1</MenuItem>
                <Menu>
                  <MenuSubmenuTrigger data-testid="submenu-trigger">2</MenuSubmenuTrigger>
                  <MenuContent data-testid="submenu">
                    <MenuItem data-testid="submenu-item-1">2.1</MenuItem>
                    <MenuItem>2.2</MenuItem>
                  </MenuContent>
                </Menu>
              </MenuContent>
            </Menu>,
          );

          const submenuTrigger = getByTestId("submenu-trigger");

          await act(async () => {
            submenuTrigger.focus();
          });

          await user.keyboard(`[${openKey}]`);

          let submenu = queryByTestId("submenu");
          expect(submenu).not.toEqual(null);

          const submenuItem1 = queryByTestId("submenu-item-1");
          expect(submenuItem1).not.toEqual(null);

          await waitFor(() => {
            expect(submenuItem1).toHaveFocus();
          });

          await user.keyboard(`[${closeKey}]`);

          submenu = queryByTestId("submenu");
          expect(submenu).toEqual(null);

          expect(submenuTrigger).toHaveFocus();
        });
      },
    );
  });

  describe("focus management", () => {
    function Test() {
      return (
        <Menu>
          <MenuTrigger>Toggle</MenuTrigger>
          <MenuContent>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
          </MenuContent>
        </Menu>
      );
    }

    test("focuses the first item after the menu is opened by keyboard", async () => {
      const { getAllByRole, getByRole, user } = setup(<Test />);

      const trigger = getByRole("button", { name: "Toggle" });
      await act(async () => {
        trigger.focus();
      });

      await user.keyboard("[Enter]");

      const [firstItem, ...otherItems] = getAllByRole("menuitem");
      await waitFor(() => {
        expect(firstItem.tabIndex).to.equal(0);
      });
      otherItems.forEach((item) => {
        expect(item.tabIndex).to.equal(-1);
      });
    });

    test("focuses the first item when down arrow key opens the menu", async () => {
      const { getByRole, getAllByRole, user } = setup(<Test />);

      const trigger = getByRole("button", { name: "Toggle" });
      await act(async () => {
        trigger.focus();
      });

      await user.keyboard("[ArrowDown]");

      const [firstItem, ...otherItems] = getAllByRole("menuitem");
      await waitFor(() => expect(firstItem).toHaveFocus());
      expect(firstItem.tabIndex).to.equal(0);
      otherItems.forEach((item) => {
        expect(item.tabIndex).to.equal(-1);
      });
    });

    test("focuses the last item when up arrow key opens the menu", async () => {
      const { getByRole, getAllByRole, user } = setup(<Test />);

      const trigger = getByRole("button", { name: "Toggle" });

      await act(async () => {
        trigger.focus();
      });

      await user.keyboard("[ArrowUp]");

      const [firstItem, secondItem, lastItem] = getAllByRole("menuitem");
      await waitFor(() => {
        expect(lastItem).toHaveFocus();
      });

      expect(lastItem.tabIndex).to.equal(0);
      [firstItem, secondItem].forEach((item) => {
        expect(item.tabIndex).to.equal(-1);
      });
    });

    test("focuses the trigger after the menu is closed", async () => {
      const { getByRole, user } = setup(
        <div>
          <input type="text" />
          <Menu>
            <MenuTrigger>Toggle</MenuTrigger>
            <MenuContent>
              <MenuItem>Close</MenuItem>
            </MenuContent>
          </Menu>
          <input type="text" />
        </div>,
      );

      const button = getByRole("button", { name: "Toggle" });
      await user.click(button);

      const menuItem = getByRole("menuitem");
      await user.click(menuItem);

      await waitFor(() => {
        expect(button).toHaveFocus();
      });
    });
  });
});
