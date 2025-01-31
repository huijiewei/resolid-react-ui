import type { SVGAttributes } from "react";

export const AngleRightIcon = ({ size = "1em" }: { size?: string }) => {
  return (
    <svg width={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
};

type IconProps = Omit<
  SVGAttributes<HTMLOrSVGElement>,
  "viewBox" | "stroke" | "strokeWidth" | "strokeLinejoin" | "strokeLinecap" | "fill"
> & { size?: string };

export const AngleUpIcon = (props: IconProps) => {
  const { size = "1em", ...rest } = props;

  return (
    <svg
      width={size}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin={"round"}
      strokeLinecap={"round"}
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
      width={size}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin={"round"}
      strokeLinecap={"round"}
      {...rest}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};
