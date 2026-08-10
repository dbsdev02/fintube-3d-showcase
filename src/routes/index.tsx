import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Gauge, Layers, ShieldCheck, ArrowRight } from "lucide-react";
import { Hero3D } from "@/components/hero-3d";
import { Reveal } from "@/components/reveal";
import { useScrollProgress } from "@/hooks/use-scroll-anim";
import bundleImg from "@/assets/product-bundle.jpg";
import factoryImg from "@/assets/factory.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinTube — Precision Finned Tubes for Heat Exchangers" },
      {
        name: "description",
        content:
          "FinTube manufactures extruded, spiral-wound and L-footed finned tubes for heat exchangers, economisers and air-cooled condensers.",
      },
      { property: "og:title", content: "FinTube — Precision Finned Tubes for Heat Exchangers" },
      {
        property: "og:description",
        content:
          "Extruded, spiral-wound and L-footed finned tubes engineered for maximum heat transfer.",
      },
    ],
  }),
  component: Home,
});

const specs = [
  { icon: Layers, value: "12×", label: "Surface area vs bare tube" },
  { icon: Gauge, value: "0.4 mm", label: "Minimum fin thickness" },
  { icon: Flame, value: "480 °C", label: "Continuous service temp" },
  { icon: ShieldCheck, value: "ASME", label: "Certified fabrication" },
];

function ParallaxPanel() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const shift = (progress - 0.5) * 120;
  const tilt = (0.5 - progress) * 10;

  return (
    <div ref={ref} className="scene-3d">
      <div
        className="overflow-hidden rounded-xl border border-border shadow-panel"
        style={{ transform: `rotateX(${tilt}deg)` }}
      >
        <img
          src={factoryImg}
          alt="Fin-rolling machine producing a copper finned tube on the FinTube shop floor"
          width={1200}
          height={800}
          loading="lazy"
          className="h-[420px] w-full scale-110 object-cover"
          style={{ transform: `translateY(${shift * 0.3}px)` }}
        />
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero3D />

      <section className="relative border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 md:grid-cols-4">
          {specs.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="px-4 py-12">
                <s.icon className="size-5 text-primary" />
                <p className="mt-5 font-display text-4xl font-bold">{s.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">What we build</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Fins rolled with micron discipline
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Every tube leaves our floor with a continuous, tension-controlled fin — no gaps, no
              lift, no thermal bottleneck. We machine integral low fins, extrude bi-metallic
              profiles and wire-wrap high-frequency welded fins on the same line.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              {[
                "Base tubes in copper, cupro-nickel, carbon steel and SS 316L",
                "Fin densities from 7 to 13 FPI, heights to 16 mm",
                "Eddy-current and hydro testing on every batch",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/products"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-forge px-6 py-3 font-display text-sm font-semibold text-primary-foreground shadow-forge transition-transform hover:-translate-y-0.5"
            >
              Explore the range <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={140}>
            <ParallaxPanel />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border py-28">
        <div className="absolute inset-0 glow-deep animate-heat-pulse" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <img
              src={bundleImg}
              alt="Bundle of copper spiral finned tubes strapped for despatch"
              width={1200}
              height={912}
              loading="lazy"
              className="rounded-xl border border-border shadow-panel"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Where they run</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              From boiler economisers to data-centre chillers
            </h2>
            <div className="mt-10 grid gap-px sm:grid-cols-2">
              {[
                ["Power generation", "Economisers, air pre-heaters, HRSG modules"],
                ["Petrochemical", "Air-cooled heat exchangers, fired heater coils"],
                ["HVAC & Refrigeration", "Chiller coils, condensers, dry coolers"],
                ["Process industry", "Waste-heat recovery, dryers, radiators"],
              ].map(([title, body]) => (
                <div key={title} className="border border-border bg-card/50 p-6">
                  <h3 className="font-display text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-28">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Send us your <span className="text-forge">duty sheet</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Share thermal duty, fluid data and layout constraints — our engineers respond with a fin
            geometry and quotation within two working days.
          </p>
          <Link
            to="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-primary/60 px-7 py-3 font-display text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Talk to an engineer <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
