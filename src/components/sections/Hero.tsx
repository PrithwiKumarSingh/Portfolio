import { motion } from "framer-motion";
import { profile } from "../../data/portfolio";
import Pill from "../ui/Pill";

interface Props { theme: "dark" | "light"; onToggleTheme: () => void; onOpenPalette: () => void }

export default function Hero({ theme, onToggleTheme, onOpenPalette }: Props) {
  return (
    <header>
      <img src={profile.bannerUrl} alt="" className="h-[205px] w-full object-cover" />
      <div className="px-6 pt-4">
        <div className="flex items-start justify-between">
          <motion.img src={profile.avatarUrl} alt={profile.name} className="h-32 w-32 rounded-xl border border-line object-cover"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} />
          <div className="flex gap-2">
            <button onClick={onOpenPalette} className="rounded-lg border border-line bg-card px-3 py-1.5 text-sm text-muted">⌘ K</button>
            <button onClick={onToggleTheme} aria-label="Toggle theme" className="rounded-lg border border-line bg-card px-3 py-1.5 text-sm">
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </div>
        </div>
        <h1 className="-mt-16 ml-40 text-3xl font-bold">{profile.name}</h1>
        {profile.age && <p className="ml-40 text-muted">{profile.age}</p>}

        <p className="mt-10 text-lg">{profile.tagline}</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-muted marker:text-fg">
          {profile.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {/* <a href={profile.callUrl} className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg">Book an intro call</a> */}
          <a href={`mailto:${profile.email}`} className="rounded-lg bg-fg px-4 py-2 text-sm border font-medium text-bg hover:bg-card hover:border-line hover:text-white hover:scale transition-all ease-in-out">Send an email</a>
          {/* <a href={`mailto:${profile.email}`} className="rounded-lg border border-line bg-card px-4 py-2 text-sm">Send an email</a> */}
        </div>
        <p className="mt-6 text-muted">Here are my <span className="font-semibold text-fg">socials</span></p>
        <div className="mt-3 flex flex-wrap gap-3 pb-10">
          {profile.socials.map((s) => <Pill key={s.label} label={s.label} href={s.url} />)}
        </div>
      </div>
    </header>
  );
}
