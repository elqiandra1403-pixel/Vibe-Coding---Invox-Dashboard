import { redirect } from "next/navigation";

export default function RootPage() {
  // Temporary redirect to login since the root page doesn't exist yet
  redirect("/login");
}
