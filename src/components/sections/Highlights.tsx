import { highlights } from "../../data/portfolio";
import Section from "../layout/Section";

export default function Highlights() {
  return (
    <Section id="highlights" title="Highlights">
      <div className="grid gap-4 sm:grid-cols-2">
        {highlights.map((h) => (
          <div key={h.title} className="rounded-xl border border-line bg-card p-4">
            <h3 className="font-semibold">{h.title}</h3>
            <p className="mt-1 text-sm text-muted">{h.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
