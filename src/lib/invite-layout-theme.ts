import type { InviteLayoutKey } from "./invite-layout-values";
import { INVITE_LAYOUT_VALUES } from "./invite-layout-values";

export type { InviteLayoutKey };

export const INVITE_LAYOUT_OPTIONS: { id: InviteLayoutKey; label: string; hint: string }[] = [
  { id: "layout1", label: "Layout 1", hint: "Rose & cream — soft classic" },
  { id: "layout2", label: "Layout 2", hint: "Sage & teal — garden fresh" },
  { id: "layout3", label: "Layout 3", hint: "Midnight & gold — evening formal" },
  { id: "layout4", label: "Layout 4", hint: "Red fresh — bold & vibrant" },
  { id: "layout5", label: "Layout 5", hint: "Pink fresh — bright & playful" },
  { id: "layout6", label: "Layout 6", hint: "Pink classic — soft & timeless" },
  { id: "layout7", label: "Layout 7", hint: "Red classic — elegant & formal" },
];

export function parseInviteLayout(v: string | null | undefined): InviteLayoutKey {
  if (v && (INVITE_LAYOUT_VALUES as readonly string[]).includes(v)) return v as InviteLayoutKey;
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
    case "layout4":
      return {
        wrap: "overflow-hidden rounded-2xl border border-red-200 bg-white shadow-lg shadow-red-900/10 ring-1 ring-red-100/80",
        header:
          "border-b border-red-100 bg-gradient-to-r from-red-50 to-orange-50/80 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-red-800",
        listenWrap: "rounded-2xl border border-red-200 bg-white px-5 py-4 text-center shadow-sm",
        listenEyebrow: "text-xs font-semibold uppercase tracking-wider text-red-800",
        listenBtn:
          "mt-2 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-900/20 transition hover:bg-red-700",
      };
    case "layout5":
      return {
        wrap: "overflow-hidden rounded-2xl border border-pink-300/90 bg-gradient-to-b from-white to-pink-50/90 shadow-lg shadow-pink-500/10",
        header:
          "border-b border-pink-200 bg-gradient-to-r from-pink-100/95 to-fuchsia-100/80 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-pink-900",
        listenWrap: "rounded-2xl border border-pink-200 bg-white/95 px-5 py-4 text-center shadow-sm",
        listenEyebrow: "text-xs font-semibold uppercase tracking-wider text-fuchsia-900",
        listenBtn:
          "mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-fuchsia-500 hover:to-pink-500",
      };
    case "layout6":
      return {
        wrap: "overflow-hidden rounded-3xl border border-pink-100 bg-white/90 shadow-sm",
        header:
          "border-b border-pink-100 bg-pink-50/90 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-pink-900/90",
        listenWrap: "rounded-3xl border border-pink-100 bg-white/90 px-5 py-4 text-center shadow-sm",
        listenEyebrow: "text-xs font-semibold uppercase tracking-wider text-pink-900/90",
        listenBtn:
          "mt-2 inline-flex items-center justify-center rounded-full bg-pink-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-950",
      };
    case "layout7":
      return {
        wrap: "overflow-hidden rounded-3xl border border-red-200/90 bg-[#fdfcfb] shadow-md",
        header:
          "border-b border-red-100 bg-red-950/[0.04] px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-red-950",
        listenWrap: "rounded-3xl border border-red-200/80 bg-white px-5 py-4 text-center shadow-sm",
        listenEyebrow: "text-xs font-semibold uppercase tracking-wider text-red-950/90",
        listenBtn:
          "mt-2 inline-flex items-center justify-center rounded-full bg-red-950 px-6 py-2.5 text-sm font-semibold text-[#fdfcfb] transition hover:bg-red-900",
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
    case "layout4":
      return {
        section: "rounded-2xl border border-red-200 bg-white px-5 py-6 text-center shadow-lg shadow-red-900/10",
        eyebrow: "text-xs font-semibold uppercase tracking-wider text-red-800",
        path: "mt-3 break-all text-xs text-red-700/75",
      };
    case "layout5":
      return {
        section: "rounded-2xl border border-pink-200 bg-white/95 px-5 py-6 text-center shadow-md shadow-pink-500/10",
        eyebrow: "text-xs font-semibold uppercase tracking-wider text-pink-900",
        path: "mt-3 break-all text-xs text-pink-800/70",
      };
    case "layout6":
      return {
        section: "rounded-3xl border border-pink-100 bg-white/90 px-5 py-6 text-center shadow-sm",
        eyebrow: "text-xs font-semibold uppercase tracking-wider text-pink-900/90",
        path: "mt-3 break-all text-xs text-stone-500",
      };
    case "layout7":
      return {
        section: "rounded-3xl border border-red-200/90 bg-white px-5 py-6 text-center shadow-sm",
        eyebrow: "text-xs font-semibold uppercase tracking-wider text-red-950",
        path: "mt-3 break-all text-xs text-red-900/70",
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
        downloadBtn:
          "mt-4 inline-flex items-center justify-center rounded-full border border-emerald-200/90 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60",
      };
    case "layout3":
      return {
        section:
          "rounded-2xl border border-amber-500/15 bg-zinc-900/70 px-5 py-6 text-center shadow-xl shadow-black/25 ring-1 ring-inset ring-white/[0.05] sm:px-6",
        title: "text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200/90",
        sub: "mt-1 text-xs text-amber-100/55",
        downloadBtn:
          "mt-4 inline-flex items-center justify-center rounded-full border border-amber-500/25 bg-zinc-800/90 px-4 py-2 text-sm font-semibold text-amber-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60",
      };
    case "layout4":
      return {
        section: "rounded-2xl border border-red-200 bg-white px-5 py-6 text-center shadow-lg shadow-red-900/10",
        title: "text-xs font-semibold uppercase tracking-wider text-red-800",
        sub: "mt-1 text-xs text-red-700/75",
        downloadBtn:
          "mt-4 inline-flex items-center justify-center rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60",
      };
    case "layout5":
      return {
        section: "rounded-2xl border border-pink-200 bg-white/95 px-5 py-6 text-center shadow-md",
        title: "text-xs font-semibold uppercase tracking-wider text-pink-900",
        sub: "mt-1 text-xs text-pink-800/70",
        downloadBtn:
          "mt-4 inline-flex items-center justify-center rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-pink-800 shadow-sm transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-60",
      };
    case "layout6":
      return {
        section: "rounded-3xl border border-pink-100 bg-white/90 px-5 py-6 text-center shadow-sm",
        title: "text-xs font-semibold uppercase tracking-wider text-pink-900/90",
        sub: "mt-1 text-xs text-stone-500",
        downloadBtn:
          "mt-4 inline-flex items-center justify-center rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-pink-900 shadow-sm transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-60",
      };
    case "layout7":
      return {
        section: "rounded-3xl border border-red-200/90 bg-white px-5 py-6 text-center shadow-sm",
        title: "text-xs font-semibold uppercase tracking-wider text-red-950",
        sub: "mt-1 text-xs text-red-900/65",
        downloadBtn:
          "mt-4 inline-flex items-center justify-center rounded-full border border-red-200 bg-[#fdfcfb] px-4 py-2 text-sm font-semibold text-red-950 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60",
      };
    default:
      return {
        section: "rounded-2xl border border-rose-100 bg-white/90 px-5 py-6 text-center shadow-sm",
        title: "text-xs font-semibold uppercase tracking-wider text-rose-900/90",
        sub: "mt-1 text-xs text-stone-500",
        downloadBtn:
          "mt-4 inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-900 shadow-sm transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60",
      };
  }
}

/** Horizontal photo gallery on public invite — palette matches layout. */
export function gallerySectionClasses(layout: InviteLayoutKey) {
  switch (layout) {
    case "layout2":
      return {
        section: "rounded-2xl border border-emerald-200/90 bg-white/95 px-4 py-5 shadow-sm sm:px-5",
        title: "text-center text-xs font-semibold uppercase tracking-wider text-emerald-900/90",
        track:
          "mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        item: "snap-center shrink-0 w-[78vw] max-w-xs overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50/20 sm:w-72",
        img: "aspect-[4/3] h-full w-full object-cover",
      };
    case "layout3":
      return {
        section:
          "rounded-2xl border border-amber-500/15 bg-zinc-900/70 px-4 py-5 shadow-xl shadow-black/25 ring-1 ring-inset ring-white/[0.05] sm:px-5",
        title: "text-center text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200/90",
        track:
          "mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        item: "snap-center shrink-0 w-[78vw] max-w-xs overflow-hidden rounded-xl border border-amber-500/15 bg-zinc-800/40 ring-1 ring-inset ring-white/[0.04] sm:w-72",
        img: "aspect-[4/3] h-full w-full object-cover",
      };
    case "layout4":
      return {
        section: "rounded-2xl border border-red-200 bg-white px-4 py-5 shadow-lg shadow-red-900/10 sm:px-5",
        title: "text-center text-xs font-semibold uppercase tracking-wider text-red-800",
        track:
          "mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        item: "snap-center shrink-0 w-[78vw] max-w-xs overflow-hidden rounded-xl border border-red-100 bg-red-50/30 sm:w-72",
        img: "aspect-[4/3] h-full w-full object-cover",
      };
    case "layout5":
      return {
        section:
          "rounded-2xl border border-pink-200 bg-gradient-to-b from-white to-pink-50/90 px-4 py-5 shadow-md shadow-pink-500/10 sm:px-5",
        title: "text-center text-xs font-semibold uppercase tracking-wider text-pink-900",
        track:
          "mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        item: "snap-center shrink-0 w-[78vw] max-w-xs overflow-hidden rounded-xl border border-pink-200 bg-white/80 sm:w-72",
        img: "aspect-[4/3] h-full w-full object-cover",
      };
    case "layout6":
      return {
        section: "rounded-3xl border border-pink-100 bg-white/90 px-4 py-5 shadow-sm sm:px-5",
        title: "text-center text-xs font-semibold uppercase tracking-wider text-pink-900/90",
        track:
          "mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        item: "snap-center shrink-0 w-[78vw] max-w-xs overflow-hidden rounded-2xl border border-pink-100 bg-pink-50/40 sm:w-72",
        img: "aspect-[4/3] h-full w-full object-cover",
      };
    case "layout7":
      return {
        section: "rounded-3xl border border-red-200/90 bg-[#fdfcfb] px-4 py-5 shadow-md sm:px-5",
        title: "text-center text-xs font-semibold uppercase tracking-wider text-red-950",
        track:
          "mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        item: "snap-center shrink-0 w-[78vw] max-w-xs overflow-hidden rounded-2xl border border-red-100 bg-white sm:w-72",
        img: "aspect-[4/3] h-full w-full object-cover",
      };
    default:
      return {
        section: "rounded-2xl border border-rose-100 bg-white/90 px-4 py-5 shadow-sm sm:px-5",
        title: "text-center text-xs font-semibold uppercase tracking-wider text-rose-900/90",
        track:
          "mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        item: "snap-center shrink-0 w-[78vw] max-w-xs overflow-hidden rounded-xl border border-rose-100 bg-rose-50/40 sm:w-72",
        img: "aspect-[4/3] h-full w-full object-cover",
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
    case "layout4":
      return {
        form: "space-y-4 rounded-2xl border border-red-200 bg-white p-5 shadow-lg shadow-red-900/10 backdrop-blur",
        h2: "font-serif text-xl font-semibold text-red-800",
        label: "text-sm font-medium text-red-900/75",
        input:
          "w-full rounded-2xl border border-red-200/90 bg-white px-4 py-3 text-stone-900 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-300/25",
        radioRow:
          "flex cursor-pointer items-center gap-2 rounded-xl border border-red-200/80 px-3 py-2 has-[:checked]:border-red-400 has-[:checked]:bg-red-50",
        radioDot: "text-red-700",
        span: "text-sm text-stone-800",
        btn: "w-full rounded-full bg-red-600 py-3.5 font-semibold text-white shadow-md shadow-red-900/20 hover:bg-red-700 disabled:opacity-60",
      };
    case "layout5":
      return {
        form: "space-y-4 rounded-2xl border border-pink-200 bg-white/95 p-5 shadow-md backdrop-blur",
        h2: "font-serif text-xl font-semibold text-pink-900",
        label: "text-sm font-medium text-pink-900/80",
        input:
          "w-full rounded-2xl border border-pink-200/90 bg-white px-4 py-3 text-stone-900 outline-none focus:border-fuchsia-400 focus:ring-4 focus:ring-pink-300/30",
        radioRow:
          "flex cursor-pointer items-center gap-2 rounded-xl border border-pink-200 px-3 py-2 has-[:checked]:border-fuchsia-400 has-[:checked]:bg-pink-50/90",
        radioDot: "text-fuchsia-700",
        span: "text-sm text-stone-800",
        btn: "w-full rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 py-3.5 font-semibold text-white shadow-md hover:from-fuchsia-500 hover:to-pink-500 disabled:opacity-60",
      };
    case "layout6":
      return {
        form: "space-y-4 rounded-3xl border border-pink-100 bg-white/90 p-5 shadow-sm backdrop-blur",
        h2: "font-serif text-xl font-semibold text-pink-950",
        label: "text-sm font-medium text-stone-700",
        input:
          "w-full rounded-2xl border border-pink-100 px-4 py-3 outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-200/40",
        radioRow:
          "flex cursor-pointer items-center gap-2 rounded-xl border border-pink-100 px-3 py-2 has-[:checked]:border-pink-300 has-[:checked]:bg-pink-50/90",
        radioDot: "text-pink-900",
        span: "text-sm text-stone-800",
        btn: "w-full rounded-full bg-pink-900 py-3.5 font-semibold text-white shadow-md hover:bg-pink-950 disabled:opacity-60",
      };
    case "layout7":
      return {
        form: "space-y-4 rounded-3xl border border-red-200/90 bg-white p-5 shadow-md backdrop-blur",
        h2: "font-serif text-xl font-semibold text-red-950",
        label: "text-sm font-medium text-stone-700",
        input:
          "w-full rounded-2xl border border-red-200/80 bg-[#fdfcfb] px-4 py-3 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-200/35",
        radioRow:
          "flex cursor-pointer items-center gap-2 rounded-xl border border-red-200/80 px-3 py-2 has-[:checked]:border-red-400 has-[:checked]:bg-red-50/80",
        radioDot: "text-red-950",
        span: "text-sm text-stone-800",
        btn: "w-full rounded-full bg-red-950 py-3.5 font-semibold text-[#fdfcfb] shadow-md hover:bg-red-900 disabled:opacity-60",
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
    case "layout4":
      return {
        shell: "border-b border-red-200/90 bg-gradient-to-r from-red-50/90 via-white to-orange-50/80 backdrop-blur-md",
        brandSkeleton: "bg-red-100/80",
        navSkeleton: "bg-red-100/70",
        couple: "text-red-900",
        subtitle: "text-red-800/70",
        invitationFallback: "text-red-900",
        navLinkIdle: "text-red-900 hover:bg-red-50/90",
        navLinkActive: "bg-red-100 text-red-950",
        registerBtn: "bg-red-600 text-white shadow-sm hover:bg-red-700",
        registerBtnActive: "bg-red-950 text-white ring-2 ring-red-300 ring-offset-2 ring-offset-white",
        signOut: "border-red-200 bg-white text-red-900 hover:bg-red-50",
      };
    case "layout5":
      return {
        shell: "border-b border-pink-200/90 bg-gradient-to-r from-pink-50/95 via-white to-fuchsia-50/90 backdrop-blur-md",
        brandSkeleton: "bg-pink-100/80",
        navSkeleton: "bg-fuchsia-100/70",
        couple: "text-pink-950",
        subtitle: "text-fuchsia-900/70",
        invitationFallback: "text-pink-950",
        navLinkIdle: "text-pink-900 hover:bg-pink-50/90",
        navLinkActive: "bg-pink-100 text-pink-950",
        registerBtn: "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-sm hover:from-fuchsia-500 hover:to-pink-500",
        registerBtnActive: "bg-white text-pink-950 ring-2 ring-pink-400 ring-offset-2 ring-offset-pink-50",
        signOut: "border-pink-200 bg-white text-pink-900 hover:bg-pink-50",
      };
    case "layout6":
      return {
        shell: "border-b border-pink-100/90 bg-[#fdf7f9]/95 backdrop-blur-md",
        brandSkeleton: "bg-pink-100/70",
        navSkeleton: "bg-pink-100/60",
        couple: "text-pink-950",
        subtitle: "text-stone-600",
        invitationFallback: "text-pink-950",
        navLinkIdle: "text-pink-900 hover:bg-pink-50/80",
        navLinkActive: "bg-pink-100 text-pink-950",
        registerBtn: "bg-pink-900 text-white shadow-sm hover:bg-pink-950",
        registerBtnActive: "bg-pink-950 text-white ring-2 ring-pink-300 ring-offset-2 ring-offset-[#fdf7f9]",
        signOut: "border-pink-200 bg-white text-pink-900 hover:bg-pink-50/80",
      };
    case "layout7":
      return {
        shell: "border-b border-red-200/85 bg-[#faf8f7]/95 backdrop-blur-md",
        brandSkeleton: "bg-red-100/60",
        navSkeleton: "bg-red-100/50",
        couple: "text-red-950",
        subtitle: "text-stone-600",
        invitationFallback: "text-red-950",
        navLinkIdle: "text-red-900 hover:bg-red-50/90",
        navLinkActive: "bg-red-100 text-red-950",
        registerBtn: "bg-red-950 text-[#fdfcfb] shadow-sm hover:bg-red-900",
        registerBtnActive: "bg-red-900 text-white ring-2 ring-red-400 ring-offset-2 ring-offset-[#faf8f7]",
        signOut: "border-red-200 bg-white text-red-950 hover:bg-red-50",
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

/** Secondary nav under `/invite/[slug]/*` — palette matches invite layout. */
export function inviteSlugNavTheme(layout: InviteLayoutKey) {
  switch (layout) {
    case "layout2":
      return {
        shell: "border-b border-emerald-200/75 bg-gradient-to-r from-teal-50/75 via-white/85 to-emerald-50/75 backdrop-blur-sm",
        divider: "text-emerald-200/90",
        linkIdle: "text-emerald-900/90 hover:text-emerald-950",
        linkActive: "text-emerald-950",
        registerIdle: "bg-emerald-800 text-white shadow-sm hover:bg-emerald-900",
        registerActive: "bg-emerald-100 text-emerald-950 ring-1 ring-emerald-200/80",
        hint: "text-emerald-900/55",
      };
    case "layout3":
      return {
        shell: "border-b border-amber-500/15 bg-zinc-950/80 backdrop-blur-sm",
        divider: "text-zinc-600",
        linkIdle: "text-amber-100/85 hover:text-amber-50",
        linkActive: "text-amber-50",
        registerIdle:
          "bg-gradient-to-b from-amber-400 to-amber-600 text-zinc-950 shadow-sm shadow-amber-950/25 hover:from-amber-300 hover:to-amber-500",
        registerActive: "bg-amber-500/10 text-amber-50 ring-1 ring-amber-400/35",
        hint: "text-stone-500",
      };
    case "layout4":
      return {
        shell: "border-b border-red-200/80 bg-gradient-to-r from-red-50/80 via-white/90 to-orange-50/70 backdrop-blur-sm",
        divider: "text-red-200",
        linkIdle: "text-red-900/90 hover:text-red-950",
        linkActive: "text-red-950",
        registerIdle: "bg-red-600 text-white shadow-sm hover:bg-red-700",
        registerActive: "bg-red-100 text-red-950 ring-1 ring-red-200/90",
        hint: "text-red-800/55",
      };
    case "layout5":
      return {
        shell: "border-b border-pink-200/80 bg-gradient-to-r from-pink-50/85 via-white/90 to-fuchsia-50/80 backdrop-blur-sm",
        divider: "text-pink-200",
        linkIdle: "text-pink-900/90 hover:text-pink-950",
        linkActive: "text-pink-950",
        registerIdle: "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-sm hover:from-fuchsia-500 hover:to-pink-500",
        registerActive: "bg-pink-100 text-pink-950 ring-1 ring-pink-300/80",
        hint: "text-pink-900/55",
      };
    case "layout6":
      return {
        shell: "border-b border-pink-100/80 bg-[#fdf7f9]/90 backdrop-blur-sm",
        divider: "text-pink-200/80",
        linkIdle: "text-pink-900/85 hover:text-pink-950",
        linkActive: "text-pink-950",
        registerIdle: "bg-pink-900 text-white hover:bg-pink-950",
        registerActive: "bg-pink-100 text-pink-950 ring-1 ring-pink-200",
        hint: "text-stone-500",
      };
    case "layout7":
      return {
        shell: "border-b border-red-200/75 bg-[#faf8f7]/90 backdrop-blur-sm",
        divider: "text-red-200/90",
        linkIdle: "text-red-900/90 hover:text-red-950",
        linkActive: "text-red-950",
        registerIdle: "bg-red-950 text-[#fdfcfb] hover:bg-red-900",
        registerActive: "bg-red-100 text-red-950 ring-1 ring-red-200/90",
        hint: "text-stone-500",
      };
    default:
      return {
        shell: "border-b border-rose-100/70 bg-white/60 backdrop-blur-sm",
        divider: "text-stone-300",
        linkIdle: "text-stone-700 hover:text-rose-900",
        linkActive: "text-rose-900",
        registerIdle: "bg-rose-900 text-white hover:bg-rose-800",
        registerActive: "bg-rose-100 text-rose-950",
        hint: "text-stone-500",
      };
  }
}

/** Site footer on `/invite/...` — matches header palette per invite layout. */
export function siteFooterInviteTheme(layout: InviteLayoutKey) {
  switch (layout) {
    case "layout2":
      return {
        shell: "border-t border-emerald-200/80 bg-gradient-to-b from-white to-teal-50/40",
        brand: "font-serif font-semibold text-emerald-950",
        muted: "text-emerald-900/60",
        link: "text-emerald-800 underline-offset-2 hover:text-emerald-950 hover:underline",
      };
    case "layout3":
      return {
        shell: "border-t border-amber-500/15 bg-zinc-950",
        brand: "font-serif font-semibold text-amber-100",
        muted: "text-stone-500",
        link: "text-amber-200/85 underline-offset-2 hover:text-amber-50 hover:underline",
      };
    case "layout4":
      return {
        shell: "border-t border-red-200/90 bg-gradient-to-b from-white to-red-50/50",
        brand: "font-serif font-semibold text-red-900",
        muted: "text-red-800/65",
        link: "text-red-700 underline-offset-2 hover:text-red-950 hover:underline",
      };
    case "layout5":
      return {
        shell: "border-t border-pink-200/90 bg-gradient-to-b from-white to-pink-50/45",
        brand: "font-serif font-semibold text-pink-950",
        muted: "text-pink-900/60",
        link: "text-fuchsia-800 underline-offset-2 hover:text-pink-950 hover:underline",
      };
    case "layout6":
      return {
        shell: "border-t border-pink-100/90 bg-[#fdf7f9]",
        brand: "font-serif font-semibold text-pink-950",
        muted: "text-stone-600",
        link: "text-pink-800 underline-offset-2 hover:text-pink-950 hover:underline",
      };
    case "layout7":
      return {
        shell: "border-t border-red-200/85 bg-[#faf8f7]",
        brand: "font-serif font-semibold text-red-950",
        muted: "text-stone-600",
        link: "text-red-900 underline-offset-2 hover:text-red-950 hover:underline",
      };
    default:
      return {
        shell: "border-t border-rose-100/90 bg-cream/95",
        brand: "font-serif font-semibold text-rose-950",
        muted: "text-stone-600",
        link: "text-rose-800 underline-offset-2 hover:text-rose-950 hover:underline",
      };
  }
}
