import { motion } from "framer-motion";
import { skills } from "../../data/portfolio";
import Section from "../layout/Section";
import Pill from "../ui/Pill";

/** Pills stagger in one after another when the section scrolls into view. */
export default function Skills() {
  return (
    <Section id="skills" title="Skills & Technologies">
      <motion.div className="flex flex-wrap gap-3" initial="hidden" whileInView="show" viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.03 } } }}>
        {skills.map((s) => (
          <motion.div key={s} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
            <Pill label={s} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
