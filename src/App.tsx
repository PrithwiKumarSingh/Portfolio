import { useState } from "react";
import CommandPalette from "./components/layout/CommandPalette";
import IndexNav, { NAV_ITEMS } from "./components/layout/IndexNav";
import Blog from "./components/sections/Blog";
import  ChatWidget  from "./features/ChatWidget";
import GithubActivity from "./components/sections/GithubActivity";
import Hero from "./components/sections/Hero";
import Highlights from "./components/sections/Highlights";
import OpenSource from "./components/sections/OpenSource";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import { useActiveSection } from "./hooks/useActiveSection";
import { useTheme } from "./hooks/useTheme";

const SECTION_IDS = NAV_ITEMS.map((i) => i.id);

export default function App() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection(SECTION_IDS);
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <main className="mx-auto max-w-3xl border-x border-dashed border-line">
        <Hero theme={theme} onToggleTheme={toggle} onOpenPalette={() => setPaletteOpen(true)} />
        {/* <Experience /> */}
        <Skills />
        <Projects />
        {/* <OpenSource /> */}
        {/* <Blog /> */}
        {/* <Highlights /> */}
        <GithubActivity />
        <ChatWidget/>
      </main>
      <IndexNav active={active} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
