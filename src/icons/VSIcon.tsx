import { SVGProps } from "react";

export const VSIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="none"
      viewBox="0 0 64 64"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="7"
        d="m10 18.596 11 27 10.5-27m21.5.5c-13.5-5-18.5 8.5-7 12.5s6.5 17.5-7 12.5"
      />
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="m6 58 6-6m39.5-40.5L58 5"
      />
    </svg>
  );
};
