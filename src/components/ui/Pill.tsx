import { motion } from "framer-motion";

/** Small bordered label used for skills, tags and links. */
export default function Pill({ label, href }: { label: string; href?: string }) {
  const className = "inline-flex items-center rounded-lg border border-line bg-card px-3 py-2 text-sm text-fg";
  return href ? (
    <motion.a href={href} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} className={className}>{label}</motion.a>
  ) : (
    <motion.span whileHover={{ y: -2 }} className={className}>{label}</motion.span>
  );
}
