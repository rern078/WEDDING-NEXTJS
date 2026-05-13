import type { InvitePageViewModel } from "../invite-page-types";
import { InviteLayout1 } from "./InviteLayout1";
import { InviteLayout2 } from "./InviteLayout2";
import { InviteLayout3 } from "./InviteLayout3";

export function InviteThemedPage(props: InvitePageViewModel) {
  switch (props.layout) {
    case "layout2":
      return <InviteLayout2 {...props} />;
    case "layout3":
      return <InviteLayout3 {...props} />;
    default:
      return <InviteLayout1 {...props} />;
  }
}
