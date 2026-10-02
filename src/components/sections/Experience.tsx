// // import { experiences } from "../../data/portfolio";
// import Section from "../layout/Section";
// import Reveal from "../ui/Reveal";

// export default function Experience() {
//   return (
//     <Section id="experience" title="Experiences">
//       <div className="space-y-6">
//         {experiences.map((e, i) => (
//           <Reveal key={e.company} delay={i * 0.08}>
//             <div className="flex justify-between gap-4">
//               <div>
//                 <h3 className="font-semibold">{e.role} <span className="text-muted">· {e.company}</span></h3>
//                 <p className="mt-1 text-sm text-muted">{e.summary}</p>
//               </div>
//               <div className="shrink-0 text-right text-sm text-muted"><p>{e.period}</p><p>{e.location}</p></div>
//             </div>
//           </Reveal>
//         ))}
//       </div>
//     </Section>
//   );
// }
