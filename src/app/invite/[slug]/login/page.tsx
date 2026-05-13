import { UserLoginForm } from "@/components/auth/UserLoginForm";

type Props = { params: Promise<{ slug: string }> };

export default async function InviteLoginPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16">
      <UserLoginForm inviteSlug={slug} />
    </main>
  );
}
