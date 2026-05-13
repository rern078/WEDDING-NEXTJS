import { UserRegisterForm } from "@/components/auth/UserRegisterForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16">
      <UserRegisterForm />
    </main>
  );
}
