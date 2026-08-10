import heroTube from "@/assets/hero-tube.png";
import { useScrollProgress } from "@/hooks/use-scroll-anim";


/**
 * Scroll-driven 3D hero: the finned tube rises from below the fold,
 * rotates in space and settles as the user scrolls.
 */
export function Hero3D() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  // progress runs 0 -> 1 across the tall scroll track.
  const p = Math.min(1, progress * 1.6);
  const rise = 70 - p * 78; // vh offset: starts below the fold
  const rotateX = 46 - p * 46;
  const rotateZ = -22 + p * 4;
  const scale = 0.72 + p * 0.36;
  const glow = 0.25 + p * 0.6;
  const titleShift = p * -60;

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden scene-3d">
        <div className="absolute inset-0 grid-etch opacity-[0.35]" />
        <div className="absolute inset-0 glow-deep" style={{ opacity: glow }} />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-start px-6 pt-32 text-center">
          <p className="eyebrow animate-rise-in">Finned tube engineering</p>
          <h1
            className="mx-auto mt-6 max-w-4xl text-5xl font-bold leading-[0.95] sm:text-7xl lg:text-8xl"
            style={{ transform: `translateY(${titleShift}px)`, opacity: 1 - p * 0.35 }}
          >
            Heat transfer,
            <br />
            <span className="text-forge">multiplied</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
            style={{ transform: `translateY(${titleShift * 0.6}px)`, opacity: 1 - p * 0.8 }}
          >
            Extruded, spiral-wound and L-footed fins rolled onto copper, aluminium and stainless
            base tubes — up to 12× the surface area of a bare tube.
          </p>
        </div>

        {/* The 3D product stage */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="w-[92vw] max-w-5xl will-change-transform"
            style={{
              transform: `translateY(${rise}vh) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
              transformStyle: "preserve-3d",
              transition: "transform 120ms linear",
            }}
          >
            <img
              src={fintubeAsset.url}
              alt="Copper spiral finned tube with machined fin profile"
              width={1200}
              height={800}
              className="w-full rounded-lg shadow-forge mix-blend-lighten"
            />
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center"
          style={{ opacity: 1 - p * 1.4 }}
        >
          <span className="eyebrow">Scroll</span>
          <div className="mx-auto mt-3 h-12 w-px bg-linear-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}
