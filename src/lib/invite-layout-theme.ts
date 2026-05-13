/** Matches Prisma `InviteLayout` — public invite theme variants. */
export type InviteLayoutKey = "layout1" | "layout2" | "layout3";

export const INVITE_LAYOUT_OPTIONS: { id: InviteLayoutKey; label: string; hint: string }[] = [
  { id: "layout1", label: "Layout 1", hint: "Rose & cream — soft classic" },
  { id: "layout2", label: "Layout 2", hint: "Sage & teal — garden fresh" },
  { id: "layout3", label: "Layout 3", hint: "Midnight & gold — evening formal" },
];

export function parseInviteLayout(v: string | null | undefined): InviteLayoutKey {
  if (v === "layout2" || v === "layout3") return v;
  return "layout1";
}

export function musicSectionClasses(layout: InviteLayoutKey) {
  switch (layout) {
    case "layout2":
      return {
        wrap: "overflow-hidden rounded-2xl border border-emerald-200/90 bg-white/95 shadow-sm",
        header: "border-b border-emerald-100 bg-emerald-50/90 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-emerald-900/90",
        listenWrap: "rounded-2xl border border-emerald-200/90 bg-white/95 px-5 py-4 text-center shadow-sm",
        listenEyebrow: "text-xs font-semibold uppercase tracking-wider text-emerald-900/90",
        listenBtn:
          "mt-2 inline-flex items-center justify-center rounded-full bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900",
      };
    case "layout3":
      return {
        wrap: "overflow-hidden rounded-2xl border border-amber-500/15 bg-zinc-900/70 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/[0.05]",
        header:
          "border-b border-amber-500/10 bg-amber-950/25 px-4 py-2.5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-100/95",
        listenWrap:
          "rounded-2xl border border-amber-500/15 bg-zinc-900/65 px-5 py-5 text-center shadow-lg ring-1 ring-inset ring-white/[0.04] sm:px-6",
        listenEyebrow: "text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200/90",
        listenBtn:
          "mt-3 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-amber-400 to-amber-600 px-7 py-2.5 text-sm font-semibold text-zinc-950 shadow-md shadow-amber-900/30 transition hover:from-amber-300 hover:to-amber-500",
      };
    default:
      return {
        wrap: "overflow-hidden rounded-2xl border border-rose-100 bg-white/90 shadow-sm",
        header: "border-b border-rose-100 bg-rose-50/80 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-rose-900/90",
        listenWrap: "rounded-2xl border border-rose-100 bg-white/90 px-5 py-4 text-center shadow-sm",
        listenEyebrow: "text-xs font-semibold uppercase tracking-wider text-rose-900/90",
        listenBtn:
          "mt-2 inline-flex items-center justify-center rounded-full bg-rose-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-800",
      };
  }
}

export function qrBlockClasses(layout: InviteLayoutKey) {
  switch (layout) {
    case "layout2":
      return {
        section: "rounded-2xl border border-emerald-200/90 bg-white/95 px-5 py-6 text-center shadow-sm",
        eyebrow: "text-xs font-semibold uppercase tracking-wider text-emerald-900/90",
        path: "mt-3 break-all text-xs text-emerald-800/70",
      };
    case "layout3":
      return {
        section:
          "rounded-2xl border border-amber-500/15 bg-zinc-900/70 px-5 py-6 text-center shadow-xl shadow-black/25 ring-1 ring-inset ring-white/[0.05] sm:px-6",
        eyebrow: "text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200/90",
        path: "mt-3 break-all text-xs text-amber-100/55",
      };
    default:
      return {
        section: "rounded-2xl border border-rose-100 bg-white/90 px-5 py-6 text-center shadow-sm",
        eyebrow: "text-xs font-semibold uppercase tracking-wider text-rose-900/90",
        path: "mt-3 break-all text-xs text-stone-500",
      };
  }
}

export function bankQrBlockClasses(layout: InviteLayoutKey) {
  switch (layout) {
    case "layout2":
      return {
        section: "rounded-2xl border border-emerald-200/90 bg-white/95 px-5 py-6 text-center shadow-sm",
        title: "text-xs font-semibold uppercase tracking-wider text-emerald-900/90",
        sub: "mt-1 text-xs text-emerald-800/70",
      };
    case "layout3":
      return {
        section:
          "rounded-2xl border border-amber-500/15 bg-zinc-900/70 px-5 py-6 text-center shadow-xl shadow-black/25 ring-1 ring-inset ring-white/[0.05] sm:px-6",
        title: "text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200/90",
        sub: "mt-1 text-xs text-amber-100/55",
      };
    default:
      return {
        section: "rounded-2xl border border-rose-100 bg-white/90 px-5 py-6 text-center shadow-sm",
        title: "text-xs font-semibold uppercase tracking-wider text-rose-900/90",
        sub: "mt-1 text-xs text-stone-500",
      };
  }
}

export function rsvpFormClasses(layout: InviteLayoutKey) {
  switch (layout) {
    case "layout2":
      return {
        form: "space-y-4 rounded-2xl border border-emerald-200/90 bg-white/95 p-5 shadow-sm backdrop-blur",
        h2: "font-serif text-xl font-semibold text-emerald-950",
        label: "text-sm font-medium text-emerald-900/80",
        input:
          "w-full rounded-2xl border border-emerald-200/80 bg-white px-4 py-3 text-stone-900 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-300/30",
        radioRow:
          "flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-200/80 px-3 py-2 has-[:checked]:border-emerald-400 has-[:checked]:bg-emerald-50/90",
        radioDot: "text-emerald-800",
        span: "text-sm text-stone-800",
        btn: "w-full rounded-full bg-emerald-800 py-3.5 font-semibold text-white shadow-md hover:bg-emerald-900 disabled:opacity-60",
      };
    case "layout3":
      return {
        form: "space-y-4 rounded-2xl border border-amber-500/15 bg-zinc-900/65 p-5 shadow-xl shadow-black/25 ring-1 ring-inset ring-white/[0.04] backdrop-blur-md sm:p-6",
        h2: "font-serif text-xl font-semibold tracking-tight text-amber-50",
        label: "text-sm font-medium text-amber-200/85",
        input:
          "w-full rounded-xl border border-zinc-600/90 bg-zinc-800/90 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/25",
        radioRow:
          "flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-600/80 px-3 py-2.5 transition has-[:checked]:border-amber-500/50 has-[:checked]:bg-amber-950/35",
        radioDot: "text-amber-400",
        span: "text-sm text-stone-200",
        btn: "w-full rounded-full bg-gradient-to-b from-amber-400 to-amber-600 py-3.5 font-semibold text-zinc-950 shadow-md shadow-amber-900/25 transition hover:from-amber-300 hover:to-amber-500 disabled:opacity-60",
      };
    default:
      return {
        form: "space-y-4 rounded-2xl border border-rose-100 bg-white/90 p-5 shadow-sm backdrop-blur",
        h2: "font-serif text-xl font-semibold text-rose-950",
        label: "text-sm font-medium text-stone-700",
        input:
          "w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-300/30",
        radioRow:
          "flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 px-3 py-2 has-[:checked]:border-rose-300 has-[:checked]:bg-rose-50/80",
        radioDot: "text-rose-900",
        span: "text-sm text-stone-800",
        btn: "w-full rounded-full bg-rose-900 py-3.5 font-semibold text-white shadow-md hover:bg-rose-800 disabled:opacity-60",
      };
  }
}

/** Sticky site header on `/invite/...` — palette follows the invite’s chosen layout. */
export function siteHeaderInviteTheme(layout: InviteLayoutKey) {
  switch (layout) {
    case "layout2":
      return {
        shell: "border-b border-emerald-200/80 bg-gradient-to-r from-teal-50/95 via-white to-emerald-50/90 backdrop-blur-md",
        brandSkeleton: "bg-emerald-100/80",
        navSkeleton: "bg-emerald-100/70",
        couple: "text-emerald-950",
        subtitle: "text-emerald-800/75",
        invitationFallback: "text-emerald-950",
        navLinkIdle: "text-emerald-900 hover:bg-emerald-100/60",
        navLinkActive: "bg-emerald-100 text-emerald-950",
        registerBtn: "bg-emerald-800 text-white shadow-sm hover:bg-emerald-900",
        registerBtnActive:
          "bg-emerald-950 text-white ring-2 ring-emerald-300 ring-offset-2 ring-offset-teal-50",
        signOut: "border-emerald-200/90 bg-white/95 text-emerald-900 hover:bg-emerald-50/80",
      };
    case "layout3":
      return {
        shell: "border-b border-amber-500/15 bg-zinc-950/88 backdrop-blur-md",
        brandSkeleton: "bg-zinc-700/50",
        navSkeleton: "bg-zinc-600/45",
        couple: "text-amber-50",
        subtitle: "text-amber-200/75",
        invitationFallback: "text-amber-50",
        navLinkIdle: "text-amber-100/90 hover:bg-zinc-800/90",
        navLinkActive: "bg-amber-500/10 text-amber-50 ring-1 ring-amber-400/25",
        registerBtn:
          "bg-gradient-to-b from-amber-400 to-amber-600 text-zinc-950 shadow-md shadow-amber-950/30 hover:from-amber-300 hover:to-amber-500",
        registerBtnActive:
          "bg-gradient-to-b from-amber-300 to-amber-500 text-zinc-950 ring-2 ring-amber-400/40 ring-offset-2 ring-offset-zinc-950",
        signOut: "border-amber-500/25 bg-zinc-800/90 text-amber-50 hover:bg-zinc-800",
      };
    default:
      return {
        shell: "border-b border-rose-100/80 bg-cream/90 backdrop-blur-md",
        brandSkeleton: "bg-rose-100/70",
        navSkeleton: "bg-rose-100/60",
        couple: "text-rose-950",
        subtitle: "text-stone-600",
        invitationFallback: "text-rose-950",
        navLinkIdle: "text-rose-900 hover:bg-rose-50",
        navLinkActive: "bg-rose-100 text-rose-950",
        registerBtn: "bg-rose-900 text-white shadow-sm hover:bg-rose-800",
        registerBtnActive: "bg-rose-950 text-white ring-2 ring-rose-300 ring-offset-2 ring-offset-cream",
        signOut: "border-stone-300 bg-white text-stone-700 hover:bg-stone-50",
      };
  }
}
