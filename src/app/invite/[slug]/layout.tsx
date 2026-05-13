import { InviteSlugNav } from "@/components/invite/InviteSlugNav";

export default async function InviteSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="flex flex-1 flex-col">
      <InviteSlugNav slug={slug} />
      {children}
    </div>
  );
}
