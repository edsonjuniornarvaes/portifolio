"use client";

import dynamic from "next/dynamic";

const Inner = dynamic(() => import("./admin/md-editor-inner"), { ssr: false });

type Props = {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  mode?: "edit" | "live";
  getAuthHeader: () => string;
  onError?: (msg: string) => void;
};

export function AdminMdEditor({ value, onChange, height = 480, mode = "edit", getAuthHeader, onError }: Props) {
  return (
    <div data-color-mode="dark" className="admin-md-editor-wrap">
      <Inner
        value={value}
        onChange={onChange}
        height={height}
        preview={mode}
        getAuthHeader={getAuthHeader}
        onError={onError ?? (() => {})}
      />
    </div>
  );
}
