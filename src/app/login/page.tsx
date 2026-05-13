import { UserLoginForm } from "@/components/auth/UserLoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16">
      <UserLoginForm showDevHint />
    </main>
  );
}
