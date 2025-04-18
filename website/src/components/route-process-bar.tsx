import { tx } from "@resolid/react-ui";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router";

export const RouteProcessBar = () => {
  const transition = useNavigation();
  const active = transition.state !== "idle";

  const ref = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    Promise.allSettled(ref.current.getAnimations().map(({ finished }) => finished)).then(() => {
      if (!active) setAnimating(false);
    });

    const id = active ? setTimeout(() => setAnimating(true), 100) : null;

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [active]);

  return (
    <div
      aria-hidden={!active}
      aria-valuetext={active ? "正在加载" : undefined}
      className="z-80 pointer-events-none fixed inset-x-0 top-0 h-1 animate-pulse"
    >
      <div
        ref={ref}
        className={tx(
          "h-full transition-[width,background-image] duration-500",
          "from-bg-primary-emphasis to-bg-primary-pressed bg-gradient-to-r",
          transition.state === "idle" && (animating ? "w-full" : "w-0 opacity-0 transition-none"),
          transition.state === "submitting" && "w-4/12",
          transition.state === "loading" && "w-10/12",
        )}
      />
    </div>
  );
};
