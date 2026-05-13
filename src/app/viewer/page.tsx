import { auth } from "@/auth";
import { ViewerAccountView } from "@/components/viewer/ViewerAccountView";
import { getMyInvitesForEmail } from "@/lib/viewer-my-invites";

export default async function ViewerHomePage() {
  const session = await auth();
  const name = session?.user?.name ?? session?.user?.email ?? "Guest";
  const isAdmin = session?.user?.role === "ADMIN";
  const accountEmail = session?.user?.email ?? null;
  const myInvites = await getMyInvitesForEmail(accountEmail);

  return (
    <ViewerAccountView
      name={name}
      isAdmin={isAdmin}
      accountEmail={accountEmail}
      invites={myInvites}
    />
  );
}
