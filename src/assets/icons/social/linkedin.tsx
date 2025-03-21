import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const LinkedInIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill={props.color}
      d="M21 4.324v15.353A1.323 1.323 0 0 1 19.677 21H4.324A1.323 1.323 0 0 1 3 19.677V4.324A1.324 1.324 0 0 1 4.324 3h15.353A1.323 1.323 0 0 1 21 4.324ZM8.294 9.882H5.647v8.47h2.647v-8.47Zm.238-2.911a1.525 1.525 0 0 0-1.514-1.536h-.047a1.535 1.535 0 0 0 0 3.07 1.525 1.525 0 0 0 1.561-1.487v-.047Zm9.82 6.236c0-2.546-1.62-3.536-3.229-3.536a3.017 3.017 0 0 0-2.678 1.366h-.074V9.882H9.882v8.47h2.647v-4.504a1.757 1.757 0 0 1 1.589-1.896h.1c.842 0 1.467.53 1.467 1.864v4.537h2.647l.02-5.146Z"
    />
  </svg>
);
const ForwardRef = forwardRef(LinkedInIcon);
export default ForwardRef;
