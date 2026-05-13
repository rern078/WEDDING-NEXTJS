"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BankTransferQrDownload } from "@/components/invite/BankTransferQrDownload";

type Slide = { src: string; index: number };

const hideScrollbar =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

/** Advance carousel automatically when multiple bank QRs exist. */
const AUTO_ADVANCE_MS = 4000;

/** Large display for easy scanning; capped so layout stays usable on small phones. */
const bankQrImgClassName =
  "h-auto w-full max-w-[min(92vw,280px)] rounded-xl object-contain sm:max-w-[300px]";

type Props = {
  slides: Slide[];
  downloadBtnClassName: string;
};

export function BankQrSlider({ slides, downloadBtnClassName }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    const w = track.clientWidth;
    track.scrollTo({ left: clamped * w, behavior: "smooth" });
    setActive(clamped);
  }, [slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || slides.length <= 1) return;

    const onScroll = () => {
      const { scrollLeft, clientWidth } = track;
      if (clientWidth < 1) return;
      const i = Math.round(scrollLeft / clientWidth);
      setActive(Math.max(0, Math.min(slides.length - 1, i)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const tick = () => {
      setActive((prev) => {
        const next = (prev + 1) % slides.length;
        const track = trackRef.current;
        if (track && track.clientWidth > 0) {
          track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
        }
        return next;
      });
    };

    let id: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      if (id) clearInterval(id);
      id = setInterval(tick, AUTO_ADVANCE_MS);
    };

    const stop = () => {
      if (id) clearInterval(id);
      id = undefined;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [slides.length]);

  if (slides.length === 0) return null;

  if (slides.length === 1) {
    const { src, index } = slides[0];
    return (
      <div className="mt-4 flex flex-col items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Bank transfer QR code"
          width={250}
          height={250}
          className={bankQrImgClassName}
        />
        <BankTransferQrDownload src={src} downloadIndex={index + 1} className={downloadBtnClassName} />
      </div>
    );
  }

  return (
    <div className="relative mt-4" role="region" aria-roledescription="carousel" aria-label="Bank transfer QR codes">
      <div
        ref={trackRef}
        className={`flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth ${hideScrollbar}`}
      >
        {slides.map(({ src, index }) => (
          <div
            key={`${index}-${src.slice(0, 40)}`}
            className="flex min-w-full shrink-0 snap-center flex-col items-center justify-center gap-3 px-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Bank transfer QR code ${index + 1}`}
              width={400}
              height={400}
              className={bankQrImgClassName}
            />
            <BankTransferQrDownload src={src} downloadIndex={index + 1} className={downloadBtnClassName} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous QR"
          onClick={() => scrollToIndex(active - 1)}
          disabled={active <= 0}
          className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white px-3 text-lg font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50 disabled:pointer-events-none disabled:opacity-35"
        >
          ‹
        </button>
        <div className="flex justify-center gap-1.5" role="tablist" aria-label="QR slides">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show QR ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-stone-800" : "w-2 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next QR"
          onClick={() => scrollToIndex(active + 1)}
          disabled={active >= slides.length - 1}
          className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white px-3 text-lg font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50 disabled:pointer-events-none disabled:opacity-35"
        >
          ›
        </button>
      </div>
    </div>
  );
}
