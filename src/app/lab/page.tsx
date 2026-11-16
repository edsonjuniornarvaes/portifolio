import type { Metadata } from "next";
import LabView from "./lab-view";

export const metadata: Metadata = { title: "Laboratório" };

export default function LabPage() {
  return <LabView />;
}
