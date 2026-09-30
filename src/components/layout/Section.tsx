import type { ReactNode } from "react";
import type { SectionId } from "../../types";
import Reveal from "../ui/Reveal";

interface Props { id: SectionId; title: string; children: ReactNode }

/** Shared wrapper: anchor id, dashed divider, heading and reveal animation. */
export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-dashed border-line px-6 py-12">
      <Reveal>
        <h2 className="mb-6 text-2xl font-bold">{title}</h2>
        {children}
      </Reveal>
    </section>
  );
}
