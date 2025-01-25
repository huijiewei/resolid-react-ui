import { useControllableState } from "../use-controllable-state";

export type UseDisclosureOptions = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const useDisclosure = (options: UseDisclosureOptions) => {
  const { open, defaultOpen = false, onOpenChange } = options;

  const [openState, setOpenState] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const handleOpen = () => setOpenState(true);
  const handleClose = () => setOpenState(false);
  const handleToggle = () => setOpenState((prev) => !prev);

  return [openState, { handleOpen, handleClose, handleToggle }] as const;
};
