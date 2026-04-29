"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type Props = {
  value: string;
  onChange: (value: string) => void;
  height?: number;
};

export function AdminMdEditor({ value, onChange, height = 400 }: Props) {
  return (
    <div data-color-mode="dark" className="admin-md-editor-wrap">
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? "")}
        height={height}
        preview="edit"
        visibleDragbar={false}
      />
    </div>
  );
}
