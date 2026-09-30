import { motion } from "framer-motion";
import { projects } from "../../data/portfolio";
import type { ProjectStatus } from "../../types";
import Section from "../layout/Section";

const STATUS_DOT: Record<ProjectStatus, string> = { Live: "bg-emerald-500", Building: "bg-red-500", "Not Started": "bg-neutral-500" };

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <motion.article key={p.title} whileHover={{ y: -4 }} className="rounded-2xl border border-line bg-card p-3">
            <div className="aspect-video rounded-xl bg-line/40">
              {p.image && <img src={p.image} alt={p.title} className="h-full w-full rounded-xl object-cover" />}
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <span className="flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs">
                  <span className={`h-2 w-2 rounded-full ${STATUS_DOT[p.status]}`} />{p.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-muted">{p.tags.join(" · ")}</p>
                <a href={p.url} className="text-sm hover:underline">View Project ↗</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
