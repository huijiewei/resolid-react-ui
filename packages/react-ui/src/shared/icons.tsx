import type { SVGAttributes } from "react";

type IconProps = Omit<
  SVGAttributes<HTMLOrSVGElement>,
  "viewBox" | "stroke" | "strokeWidth" | "strokeLinejoin" | "strokeLinecap" | "fill" | "style"
> & { size?: string };

export const CloseIcon = (props: IconProps) => {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export const AngleLeftIcon = (props: IconProps) => {
  const { size = "1em", ...rest } = props;

  return (
    <svg style={{ width: size }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...rest}>
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
};

export const AngleRightIcon = (props: IconProps) => {
  const { size = "1em", ...rest } = props;

  return (
    <svg style={{ width: size }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...rest}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
};

export const AngleUpIcon = (props: IconProps) => {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      {...rest}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
};

export const AngleDownIcon = (props: IconProps) => {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      {...rest}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

export const CheckedIcon = (props: IconProps) => {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      style={{ width: size }}
      fill="none"
      viewBox="0 0 12 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="16"
      strokeDashoffset="0"
      {...rest}
    >
      <polyline points="1.5 6 4.5 9 10.5 1" />
    </svg>
  );
};

export const IndeterminateIcon = (props: IconProps) => {
  const { size = "1em", ...rest } = props;

  return (
    <svg style={{ width: size }} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" {...rest}>
      <line x1="21" x2="3" y1="12" y2="12" />
    </svg>
  );
};
