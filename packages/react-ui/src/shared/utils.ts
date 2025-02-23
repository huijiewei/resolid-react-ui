export const hasBackgroundClass = (className?: string) => {
  if (!className) {
    return false;
  }

  return className.includes("bg-") && className.split(" ").some((cls) => cls.startsWith("bg-"));
};
