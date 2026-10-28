import { redirect } from "next/navigation";

export default function About() {
  redirect("/home#sobre");
}
