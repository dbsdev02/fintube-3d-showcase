import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useScrollProgress } from "@/hooks/use-scroll-anim";
import fintubeAsset from "@/assets/fintube.jpeg.asset.json";
import bundleImg from "@/assets/product-bundle.jpg";
import aluImg from "@/assets/product-alu.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Finned Tube Products — Extruded, Spiral & Low Fin | FinTube" },
      {
        name: "description",
        content:
          "Extruded bi-metallic, spiral-wound L-foot, integral low fin and studded tubes in copper, aluminium, carbon steel and stainless.",
      },
      { property: "og:title", content: "Finned Tube Products | FinTube" },
      {
        property: "og:description",
        content:
          "Extruded bi-metallic, spiral-wound L-foot, integral low fin and studded finned tubes.",
      },
    ],
  }),
  component: Products,
});

const products = [
  {
    name: "Extruded bi-metallic",
    image: aluImg,
    body: "Aluminium sleeve extruded over a copper or steel liner for a seamless bond and full corrosion cover. Ideal for air-cooled heat exchangers.",
    specs: ["Fin height to 16 mm", "9–11 FPI", "Service to 300 °C"],
  },
  {
    name: "Spiral wound L-foot",
    image: bundleImg,
    body: "Tension-wound strip with an L-shaped foot covering 100% of the base tube. Economical surface multiplication for economisers and dryers.",
    specs: ["Fin height to 19 mm", "7–13 FPI", "Service to 180 °C"],
  },
  {
    name: "Integral low fin",
    image: fintubeAsset.url,
    body: "Fins machined directly from the tube wall — one metal, no bond to fail. The default choice for shell-and-tube condensers.",
    specs: ["19–40 fins/inch", "Cu, CuNi, SS 316L", "Service to 480 °C"],
  },
];

function ProductCard({ p, index }: { p: (typeof products)[number]; index: number }) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const tilt = (0.5 - progress) * 12;
  const lift = (0.5 - progress) * 40;

  return (
    <div ref={ref} className="scene-3d">
      <article
        className="grid items-center gap-10 border border-border bg-card/50 p-6 shadow-panel md:grid-cols-2 md:p-10"
        style={{
          transform: `rotateX(${tilt}deg) translateY(${lift * 0.3}px)`,
          transition: "transform 120ms linear",
        }}
      >
        <div className={index % 2 ? "md:order-2" : ""}>
          <img
            src={p.image}
            alt={`${p.name} finned tube`}
            width={1000}
            height={750}
            loading="lazy"
            className="h-72 w-full rounded-lg object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">0{index + 1}</p>
          <h2 className="mt-4 text-3xl font-bold">{p.name}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{p.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.specs.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}

function Products() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <p className="eyebrow">Products</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.02] sm:text-6xl">
            Four fin geometries, <span className="text-forge">one tolerance</span>
          </h1>
          <p className="mt-7 max-w-2xl leading-relaxed text-muted-foreground">
            Select by duty, fluid and ambient. Every geometry below is produced in-house and
            supplied with material test certificates.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-6 pb-20">
        {products.map((p, i) => (
          <Reveal key={p.name} delay={60}>
            <ProductCard p={p} index={i} />
          </Reveal>
        ))}
      </section>

      <section className="border-t border-border bg-surface/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="text-3xl font-bold">Studded & serrated fins</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              For fired heaters and high-fouling flue gas, we weld studs or serrate the fin edge to
              break the boundary layer and shed ash. Available on carbon steel and alloy base tubes.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-forge px-6 py-3 font-display text-sm font-semibold text-primary-foreground shadow-forge transition-transform hover:-translate-y-0.5"
            >
              Request specification sheet <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
