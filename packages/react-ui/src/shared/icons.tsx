import type { SVGAttributes } from "react";

export const AngleRightIcon = ({ size = "1em" }: { size?: string }) => {
  return (
    <svg style={{ width: size }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
};

type IconProps = Omit<
  SVGAttributes<HTMLOrSVGElement>,
  "viewBox" | "stroke" | "strokeWidth" | "strokeLinejoin" | "strokeLinecap" | "fill" | "style"
> & { size?: string };

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
