export type SectionId = "experience" | "projects" | "open-source" | "skills" | "blog" | "highlights";
export type ProjectStatus = "Live" | "Building" | "Not Started";

export interface Profile { name: string; age?: number; tagline: string; bullets: string[]; bannerUrl: string; avatarUrl: string; email: string; callUrl: string; socials: { label: string; url: string }[] }
export interface Experience { role: string; company: string; period: string; location: string; summary: string }
export interface Project { title: string; status: ProjectStatus; description: string; tags: string[]; url: string; image?: string }
export interface Contribution { repo: string; title: string; url: string; state: "Merged" | "Open" }
export interface BlogPost { title: string; date: string; tags: string[]; url: string }
export interface Highlight { title: string; detail: string }
