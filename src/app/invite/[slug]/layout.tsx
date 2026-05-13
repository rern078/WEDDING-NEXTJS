import { InviteSlugNav } from "@/components/invite/InviteSlugNav";
import { parseInviteLayout } from "@/lib/invite-layout-theme";
import { prisma } from "@/lib/prisma";

export default async function InviteSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    select: { inviteLayout: true },
  });
  const layout = parseInviteLayout(event?.inviteLayout);

  return (
    <div className="flex flex-1 flex-col">
      <InviteSlugNav slug={slug} layout={layout} />
      {children}
    </div>
  );
}
