/** ALL site content lives here. Edit this file only to make the site yours. */
import type { BlogPost, Contribution, Experience, Highlight, Profile, Project } from "../types";

export const profile: Profile = {
  name: "Prithwi Kumar",
  age: 23,
  tagline: "Full Stack Developer + GenAI",
  bullets: [
    "I enjoy building things from scratch and understanding how they work under the hood.",
    "My current focus is full-stack development and Generative AI.",
    "Most of my learning happens through projects, experimentation, and writing code.",
  ],
  bannerUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600",
  avatarUrl: "https://res.cloudinary.com/o5mjgvg6/image/upload/v1790789733/square-image.jpg",
  email: "prithwikumar871@gmail.com",
  callUrl: "https://cal.com/your-name",
  socials: [
    { label: "GitHub", url: "https://github.com/prithwikumarsingh" },
    { label: "Twitter", url: "https://x.com/PrithwiSingh_" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/prithwikumar" },
    { label: "Discord", url: "https://discord.com/users/1416074936023257199" },
  ],
};

// export const experiences: Experience[] = [
//   { role: "Full Stack Developer", company: "Company A", period: "Jan 2026 – Present", location: "Remote", summary: "Built dashboards and APIs with React, Node and MongoDB." },
//   { role: "Frontend Intern", company: "Company B", period: "Jun 2025 – Dec 2025", location: "Remote", summary: "Shipped reusable UI components in TypeScript." },
// ];

export const projects: Project[] = [
  { title: "Mentis", status: "Live", description: "A full-stack second brain application for saving, organizing, and managing links, notes, documents, and media in one secure place.", tags: ["TypeScript", "React", "MongoDB", "Node.js", "Express", "TailwindCSS", "JWT", "Axios"], image: "https://res.cloudinary.com/o5mjgvg6/image/upload/v1790789123/Mentis.png", url: "https://mentis-digital.vercel.app/" },
  { title: "VanishDrop", status: "Live", description: "A full-stack temporary file-sharing platform that lets users securely upload and share files without requiring an account, with automatic expiration.", tags: ["TypeScript", "React", "Node.js", "Express", "Multer", "Supabase"], image: "https://res.cloudinary.com/o5mjgvg6/image/upload/v1790789129/Vanishdrop.png", url: "https://vanishdropfile.vercel.app/" },
  { title: "Swiggy Clone", status: "Live", description: "A food delivery web application built with React and live Swiggy APIs, featuring restaurant browsing, menus, routing, and state management.", tags: ["React", "TailwindCSS", "React Router", "Redux", "React Icons"], image: "https://res.cloudinary.com/o5mjgvg6/image/upload/v1790789096/Swiggy.png", url: "https://swiggy-project-three.vercel.app/" },
  { title: "CloneCraft", status: "Live", description: "A frontend practice project focused on recreating modern web interfaces using React and TailwindCSS with responsive layouts and reusable components.", tags: ["React", "TailwindCSS", "React Router"], image: "https://res.cloudinary.com/o5mjgvg6/image/upload/v1790789110/frontend.png", url: "https://clonecraft-ui.vercel.app/" },
];

export const contributions: Contribution[] = [
  { repo: "org/repo", title: "Fix: handle empty state in list view", url: "#", state: "Merged" },
  { repo: "org/another-repo", title: "Docs: improve setup guide", url: "#", state: "Open" },
];

export const skills: string[] = [
  "React", "Next", "Node", "Express", "MongoDB", "PostgreSQL", "Redis", "Prisma",
  "Tailwind", "JavaScript", "TypeScript", "Git", "GitHub", "Docker", "Linux",
];

export const posts: BlogPost[] = [
  { title: "You Are Not Ready for Open Source Just Because You Want to Start", date: "Jul 2026", tags: ["Open Source", "Learning"], url: "#" },
];

export const highlights: Highlight[] = [
  { title: "Hackathon Finalist", detail: "Top 10 out of 500+ teams." },
  { title: "2000+ GitHub contributions", detail: "In the last year." },
];
