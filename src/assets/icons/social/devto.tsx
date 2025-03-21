import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";

const DevToIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M7.826 10.083a.78.78 0 0 0-.468-.175h-.7v4.198h.7a.78.78 0 0 0 .469-.175c.156-.116.233-.291.233-.525v-2.798c0-.233-.078-.408-.234-.525ZM19.236 3H4.764C3.792 3 3.002 3.787 3 4.76v14.48c.002.973.792 1.76 1.764 1.76h14.472c.973 0 1.762-.787 1.764-1.76V4.76A1.764 1.764 0 0 0 19.236 3ZM9.196 13.414c0 .756-.467 1.9-1.943 1.898H5.388V8.664h1.904c1.424 0 1.903 1.144 1.903 1.9v2.85Zm4.045-3.562H11.1v1.543h1.309v1.188H11.1v1.544h2.141v1.188h-2.498a.812.812 0 0 1-.833-.791V9.497a.812.812 0 0 1 .792-.831h2.54l-.001 1.186Zm4.164 4.632c-.53 1.235-1.48.99-1.906 0L13.95 8.666h1.308l1.194 4.57 1.188-4.57h1.31l-1.546 5.818Z"
    />
  </svg>
);

const ForwardRef = forwardRef(DevToIcon);
export default ForwardRef;
