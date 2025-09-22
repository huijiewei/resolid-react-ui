import { isBrowser } from "@resolid/utils";
import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicEffect: typeof useEffect = isBrowser ? useLayoutEffect : useEffect;
