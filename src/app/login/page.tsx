import { redirect } from "next/navigation";

export default function LoginRedirect() {
  // Redirect generic /login to the student login route
  redirect("/student/login");
}
