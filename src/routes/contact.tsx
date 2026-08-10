import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact FinTube — Request a Finned Tube Quotation" },
      {
        name: "description",
        content:
          "Send your thermal duty and tube specification to FinTube's engineering desk and receive a fin geometry proposal within two working days.",
      },
      { property: "og:title", content: "Contact FinTube" },
      {
        property: "og:description",
        content: "Request a finned tube quotation from FinTube's engineering desk.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.02] sm:text-6xl">
            Tell us the <span className="text-forge">duty</span>
          </h1>
          <p className="mt-7 max-w-2xl leading-relaxed text-muted-foreground">
            Fluid, flow rate, inlet and outlet temperatures, and any layout constraints. That is all
            we need to propose a fin geometry.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-28 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <form
            className="space-y-5 border border-border bg-card/50 p-8 shadow-panel"
            onSubmit={(e) => {
              e.preventDefault();
              setSending(true);
              window.setTimeout(() => {
                setSending(false);
                toast.success("Enquiry received", {
                  description: "Our engineering desk will reply within two working days.",
                });
                (e.target as HTMLFormElement).reset();
              }, 700);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Company" name="company" placeholder="Company" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
              <Field label="Phone" name="phone" placeholder="+91 …" required={false} />
            </div>
            <div>
              <label
                htmlFor="message"
                className="font-display text-xs uppercase tracking-widest text-muted-foreground"
              >
                Duty details
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Fluid, flow, temperatures, tube material, quantity…"
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-forge px-6 py-3 font-display text-sm font-semibold text-primary-foreground shadow-forge transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send enquiry"}
            </button>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-8">
            {[
              { icon: MapPin, title: "Plant", lines: ["Plot 42, Industrial Estate", "Pune, Maharashtra 411019"] },
              { icon: Phone, title: "Phone", lines: ["+91 20 4890 1200", "Mon–Sat, 09:00–18:00 IST"] },
              { icon: Mail, title: "Email", lines: ["sales@fintube.co", "engineering@fintube.co"] },
            ].map((c) => (
              <div key={c.title} className="flex gap-4 border-b border-border pb-8">
                <c.icon className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-semibold">{c.title}</h3>
                  {c.lines.map((l) => (
                    <p key={l} className="mt-1 text-sm text-muted-foreground">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-display text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
      />
    </div>
  );
}
