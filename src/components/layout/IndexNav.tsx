import { motion } from "framer-motion";
import type { SectionId } from "../../types";

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "open-source", label: "Open Source" },
  { id: "skills", label: "Skills" },
  { id: "blog", label: "Blog" },
  { id: "highlights", label: "Highlights" },
];

/** Sticky right-hand index; highlights the section in view. Hidden on small screens. */
export default function IndexNav({ active }: { active: SectionId }) {
  return (
    <nav className="fixed right-[max(1rem,calc(50%-560px))] top-[220px] hidden w-40 lg:block">
      <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-muted">INDEX</p>
      <ul className="space-y-4">
        {NAV_ITEMS.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`} className={`relative block pl-6 text-sm transition-colors ${active === id ? "text-fg" : "text-muted hover:text-fg"}`}>
              {active === id && <motion.span layoutId="nav-dash" className="absolute left-0 top-1/2 h-px w-4 bg-fg" />}
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
