import { authOptions } from "@/lib/auth"; // adjust path to where you defined authOptions
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");   // protect root
  }

  redirect("/home");       // if logged in
}