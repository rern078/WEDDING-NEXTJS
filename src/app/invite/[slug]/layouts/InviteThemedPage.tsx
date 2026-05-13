import type { ComponentType } from "react";
import type { InvitePageViewModel } from "../invite-page-types";
import type { InviteLayoutKey } from "@/lib/invite-layout-theme";
import { InviteLayout1 } from "./InviteLayout1";
import { InviteLayout2 } from "./InviteLayout2";
import { InviteLayout3 } from "./InviteLayout3";
import { InviteLayout4 } from "./InviteLayout4";
import { InviteLayout5 } from "./InviteLayout5";
import { InviteLayout6 } from "./InviteLayout6";
import { InviteLayout7 } from "./InviteLayout7";

const pages: Record<InviteLayoutKey, ComponentType<InvitePageViewModel>> = {
  layout1: InviteLayout1,
  layout2: InviteLayout2,
  layout3: InviteLayout3,
  layout4: InviteLayout4,
  layout5: InviteLayout5,
  layout6: InviteLayout6,
  layout7: InviteLayout7,
};

export function InviteThemedPage(props: InvitePageViewModel) {
  const Page = pages[props.layout] ?? InviteLayout1;
  return <Page {...props} />;
}
