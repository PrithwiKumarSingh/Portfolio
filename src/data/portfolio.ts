/** ALL site content lives here. Edit this file only to make the site yours. */
import type { BlogPost, Contribution, Experience, Highlight, Profile, Project } from "../types";

export const profile: Profile = {
  name: "Prithwi Kumar",
  age: 23,
  tagline: "Full Stack Developer + GenAI",
  bullets: [
    "AI, open source, and developer tools excite me.",
    "I believe actions speak louder than words, so I put my code where my mouth is.",
    "Currently building ProjectOne, ProjectTwo, and experimental AI tools.",
  ],
  bannerUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600",
  avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
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
  { title: "ProjectOne", status: "Live", description: "A collection of animated components for landing pages.", tags: ["Next", "React", "TypeScript", "Tailwind"], url: "#" },
  { title: "ProjectTwo", status: "Building", description: "Turn sketches into 3D objects — no 3D skills required.", tags: ["Next", "Three.js", "TypeScript"], url: "#" },
  { title: "ProjectThree", status: "Building", description: "An AI UI builder that turns prompts into production-ready interfaces.", tags: ["Next", "Prisma", "Node"], url: "#" },
  { title: "ProjectFour", status: "Not Started", description: "An AI-powered search engine for the internet.", tags: ["Next", "Redis", "TypeScript"], url: "#" },
];

export const contributions: Contribution[] = [
  { repo: "org/repo", title: "Fix: handle empty state in list view", url: "#", state: "Merged" },
  { repo: "org/another-repo", title: "Docs: improve setup guide", url: "#", state: "Open" },
];

export const skills: string[] = [
  "React", "Next", "Node", "Express", "MongoDB", "PostgreSQL", "Redis", "Prisma", "Zustand", "Tanstack Query",
  "Tailwind", "Framer Motion", "JavaScript", "TypeScript", "Python", "Git", "GitHub", "Docker", "Linux",
];

export const posts: BlogPost[] = [
  { title: "You Are Not Ready for Open Source Just Because You Want to Start", date: "Jul 2026", tags: ["Open Source", "Learning"], url: "#" },
];

export const highlights: Highlight[] = [
  { title: "Hackathon Finalist", detail: "Top 10 out of 500+ teams." },
  { title: "2000+ GitHub contributions", detail: "In the last year." },
];
