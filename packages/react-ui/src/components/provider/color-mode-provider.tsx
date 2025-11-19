import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import type { JSX } from "react/jsx-runtime";
import { useLocalStorage, useMediaQuery } from "../../hooks";
import {
  type ColorMode,
  ColorModeDispatchContext,
  ColorModeStateContext,
} from "./color-mode-context";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";
const COLOR_MODE_STORAGE_KEY = "rui:color-mode";

export type ColorModeProviderProps = {
  nonce?: string;
  disableTransitionOnChange?: boolean;
};

export const ColorModeProvider = ({
  children,
  nonce,
  disableTransitionOnChange = false,
}: PropsWithChildren<ColorModeProviderProps>): JSX.Element => {
  const osDark = useMediaQuery(COLOR_SCHEME_QUERY);

  const [value, setValue] = useLocalStorage<ColorMode>(COLOR_MODE_STORAGE_KEY, "auto");

  useEffect(() => {
    const root = document.documentElement;

    const enable = disableTransitionOnChange ? disableTransition(nonce) : null;

    if (value == "dark" || (value == "auto" && osDark)) {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }

    enable?.();
  }, [value, osDark, disableTransitionOnChange, nonce]);

  return (
    <ColorModeDispatchContext value={setValue}>
      <ColorModeStateContext value={value}>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `try{var dark=localStorage.getItem("${COLOR_MODE_STORAGE_KEY}");(dark?'"dark"'==dark:matchMedia("${COLOR_SCHEME_QUERY}").matches)&&document.documentElement.classList.add("dark-mode")}catch(a){}`,
          }}
        />
        {children}
      </ColorModeStateContext>
    </ColorModeDispatchContext>
  );
};

const disableTransition = (nonce?: string) => {
  const css = document.createElement("style");

  if (nonce) {
    css.setAttribute("nonce", nonce);
  }

  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  );

  document.head.appendChild(css);

  return () => {
    (() => window.getComputedStyle(document.body))();

    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};
