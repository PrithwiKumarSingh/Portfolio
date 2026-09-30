import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "./IndexNav";

/** ⌘K / Ctrl+K quick-jump menu. */
export default function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(!open); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const items = NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-32"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div className="w-full max-w-md rounded-xl border border-line bg-card p-3 shadow-2xl"
            initial={{ scale: 0.96, y: -8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96 }} onClick={(e) => e.stopPropagation()}>
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Jump to section…"
              className="mb-2 w-full bg-transparent px-2 py-2 text-sm outline-none" />
            {items.map((i) => (
              <a key={i.id} href={`#${i.id}`} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm text-muted hover:bg-line/50 hover:text-fg">
                {i.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
