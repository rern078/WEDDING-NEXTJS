import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function InviteViewerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    const back = `/invite/${slug}/viewer`;
    redirect(`/invite/${slug}/login?callbackUrl=${encodeURIComponent(back)}`);
  }
  return <>{children}</>;
}
