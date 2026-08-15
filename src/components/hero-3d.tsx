import heroTube from "@/assets/hero-tube.png";
import { useScrollProgress } from "@/hooks/use-scroll-anim";

/**
 * Scroll-driven 3D hero: a vertical finned tube rises from below the fold,
 * rotates gently in space and settles. The stage is clipped to the lower
 * half of the viewport so the tube never overlaps the headline text.
 */
export function Hero3D() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  // Normalised 0 -> 1 across the tall scroll track.
  const p = Math.min(1, Math.max(0, progress * 1.5));
  const ease = 1 - Math.pow(1 - p, 3);

  const rise = 100 - ease * 100; // % of the stage height: starts fully below
  const rotateY = 26 - ease * 26;
  const tilt = -8 + ease * 8;
  const scale = 0.86 + ease * 0.14;
  const glow = 0.2 + ease * 0.65;

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden scene-3d">
        <div className="absolute inset-0 grid-etch opacity-[0.35]" />
        <div className="absolute inset-0 glow-deep" style={{ opacity: glow }} />

        {/* Copy block — always on top, never covered by the tube */}
        <div className="relative z-20 mx-auto flex max-w-7xl flex-col px-6 pt-28 text-center sm:pt-32">
          <p className="eyebrow animate-rise-in">Finned tube engineering</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
            Heat transfer,
            <br />
            <span className="text-forge">multiplied</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Extruded, spiral-wound and L-footed fins rolled onto copper, aluminium and stainless
            base tubes — up to 12× the surface area of a bare tube.
          </p>
        </div>

        {/* 3D product stage, clipped to the lower band of the viewport */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[46vh] overflow-hidden sm:h-[44vh]">
          <div
            className="absolute inset-x-0 bottom-0 flex justify-center will-change-transform"
            style={{
              transform: `translateY(${rise}%)`,
              transformStyle: "preserve-3d",
              transition: "transform 100ms linear",
            }}
          >
            <img
              src={heroTube}
              alt="Copper spiral finned tube with machined fin profile"
              width={1600}
              height={912}
              className="h-auto w-[64vh] max-w-none origin-bottom drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)]"
              style={{
                transform: `rotate(90deg) translateY(-50%) rotateY(${rotateY}deg) rotateX(${tilt}deg) scale(${scale})`,
              }}
            />
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
