import { contributions } from "../../data/portfolio";
import Section from "../layout/Section";

export default function OpenSource() {
  return (
    <Section id="open-source" title="Open Source">
      <ul className="divide-y divide-line rounded-xl border border-line bg-card">
        {contributions.map((c) => (
          <li key={c.repo + c.title}>
            <a href={c.url} className="flex items-center justify-between gap-4 p-4 hover:bg-line/30">
              <div><p className="font-medium">{c.title}</p><p className="text-sm text-muted">{c.repo}</p></div>
              <span className="rounded-full border border-line px-3 py-1 text-xs">{c.state}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
