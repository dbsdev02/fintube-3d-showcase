import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { useScrollProgress } from "@/hooks/use-scroll-anim";
import factoryImg from "@/assets/factory.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FinTube — Three Decades of Fin Rolling" },
      {
        name: "description",
        content:
          "FinTube has manufactured finned tubes since 1994, supplying heat exchanger makers across 24 countries from an ASME-certified plant.",
      },
      { property: "og:title", content: "About FinTube — Three Decades of Fin Rolling" },
      {
        property: "og:description",
        content: "An ASME-certified finned tube plant supplying 24 countries since 1994.",
      },
    ],
  }),
  component: About,
});

const milestones = [
  ["1994", "First integral low-fin lathe commissioned in a two-bay shed."],
  ["2003", "Extruded bi-metallic line added; first export order to the Gulf."],
  ["2011", "ASME U-stamp fabrication and in-house eddy-current testing."],
  ["2018", "Automated high-frequency welded fin cell, 40 m/min throughput."],
  ["2024", "Second plant opened; 24 countries served, 1.2 M metres a year."],
];

function TiltImage() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  return (
    <div ref={ref} className="scene-3d">
      <img
        src={factoryImg}
        alt="FinTube production hall with fin-rolling machinery"
        width={1200}
        height={800}
        loading="lazy"
        className="w-full rounded-xl border border-border object-cover shadow-panel"
        style={{
          transform: `rotateY(${(0.5 - progress) * 14}deg) rotateX(${(progress - 0.5) * 8}deg)`,
        }}
      />
    </div>
  );
}

function About() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <p className="eyebrow">About us</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.02] sm:text-6xl">
            We have been rolling fins since <span className="text-forge">1994</span>
          </h1>
          <p className="mt-7 max-w-2xl leading-relaxed text-muted-foreground">
            FinTube began as a single lathe cutting integral low fins for a local boiler maker.
            Three decades later we run twelve fin-forming cells and ship over a million metres of
            finned tube a year to heat exchanger fabricators in 24 countries.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Reveal>
          <TiltImage />
        </Reveal>
      </section>

      <section className="border-y border-border bg-surface/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3">
          {[
            [
              "Metallurgy first",
              "Fin and base tube are matched for thermal expansion, galvanic behaviour and service temperature before a single metre is rolled.",
            ],
            [
              "Measured, not assumed",
              "Bond resistance, fin pitch and wall thinning are logged per coil and shipped with the material test certificate.",
            ],
            [
              "Built for the field",
              "Tubes are packed on cradles with fin guards so the geometry that left our floor is the geometry that reaches your bundle.",
            ],
          ].map(([title, body], i) => (
            <Reveal key={title} delay={i * 110}>
              <h3 className="font-display text-xl font-semibold">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-28">
        <Reveal>
          <p className="eyebrow">Timeline</p>
          <h2 className="mt-5 text-4xl font-bold">Milestones</h2>
        </Reveal>
        <div className="mt-14 space-y-0">
          {milestones.map(([year, text], i) => (
            <Reveal key={year} delay={i * 90}>
              <div className="grid grid-cols-[88px_1fr] gap-6 border-t border-border py-8">
                <span className="font-display text-lg font-bold text-primary">{year}</span>
                <p className="text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
