import { UserRegisterForm } from "@/components/auth/UserRegisterForm";

type Props = { params: Promise<{ slug: string }> };

export default async function InviteRegisterPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16">
      <UserRegisterForm inviteSlug={slug} />
    </main>
  );
}
