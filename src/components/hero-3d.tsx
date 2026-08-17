import { useEffect, useRef, useState } from "react";
import heroTube from "@/assets/hero-tube.png";

/**
 * Scroll-driven 3D hero: a vertical finned tube rises from below the fold,
 * rotates gently in space and settles. The stage is clipped to the lower
 * band of the viewport so the tube never overlaps the headline text.
 */
export function Hero3D() {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const track = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / track)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Normalised 0 -> 1 across the sticky scroll track.
  const p = Math.min(1, progress * 1.35);
  const ease = 1 - Math.pow(1 - p, 3);

  const rise = 110 - ease * (110 - 13); // rises from fully below and settles clear of the copy
  const spin = 20 - ease * 20;
  const tilt = -6 + ease * 6;
  const scale = 0.9 + ease * 0.1;
  const glow = 0.2 + ease * 0.65;

  // Text drifts up and fades out as the tube takes over the stage.
  const textShift = -ease * 22; // % upward travel
  const textOpacity = Math.max(0, 1 - ease * 1.4);
  const textScale = 1 - ease * 0.05;



  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen overflow-hidden scene-3d">
        <div className="absolute inset-0 grid-etch opacity-[0.35]" />
        <div className="absolute inset-0 glow-deep" style={{ opacity: glow }} />

        {/* Copy block — drifts up and fades away as the tube rises */}
        <div
          className="relative z-20 mx-auto flex max-w-7xl flex-col px-6 pt-24 text-center sm:pt-28 will-change-transform"
          style={{
            transform: `translateY(${textShift}%) scale(${textScale})`,
            opacity: textOpacity,
            transition: "transform 100ms linear, opacity 100ms linear",
          }}
        >
          <p className="eyebrow animate-rise-in">Finned tube engineering</p>
          <h1 className="mx-auto mt-3 max-w-4xl text-3xl font-bold leading-[0.95] sm:text-5xl lg:text-6xl">
            Heat transfer,
            <br />
            <span className="text-forge">multiplied</span>
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Extruded, spiral-wound and L-footed fins rolled onto copper, aluminium and stainless
            base tubes — up to 12× the surface area of a bare tube.
          </p>
        </div>


        {/* 3D product stage — large, cropped close-up that rises from below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[68vh] overflow-hidden">
          <div
            className="absolute bottom-0 left-1/2 h-[66vh] w-[32vh] -translate-x-1/2 will-change-transform"
            style={{
              transform: `translateX(-50%) translateY(${rise}%)`,
              transformStyle: "preserve-3d",
              transition: "transform 100ms linear",
            }}
          >
            <div className="absolute inset-0 animate-orbit-3d">
              <img
                src={heroTube}
                alt="Copper spiral finned tube with machined fin profile"
                width={1600}
                height={912}
                className="absolute left-1/2 top-1/2 h-auto w-[88vh] max-w-none drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)]"
                style={{
                  transform: `translate(calc(-50% + 18vh), -50%) rotate(110deg) rotateX(${spin}deg) rotateY(${tilt}deg) scale(${scale})`,
                  transformStyle: "preserve-3d",
                }}
              />
            </div>

          </div>
        </div>

        <div
          className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-center"
          style={{ opacity: Math.max(0, 1 - p * 1.6) }}
        >
          <span className="eyebrow">Scroll</span>
          <div className="mx-auto mt-3 h-12 w-px bg-linear-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}
