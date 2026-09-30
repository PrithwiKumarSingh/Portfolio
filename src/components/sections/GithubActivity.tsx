import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import {
  fetchGitHubContributions,
  type GitHubContribution,
} from "../../lib/github";

const GITHUB_USERNAME = "Prithwikumarsingh";

const OPACITY = [0.08, 0.3, 0.5, 0.75, 1];

type TooltipPosition = {
  x: number;
  y: number;
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

export default function GithubActivity() {
  const [contributions, setContributions] = useState<
    GitHubContribution[]
  >([]);

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [hoveredDay, setHoveredDay] =
    useState<GitHubContribution | null>(null);

  const [tooltipPosition, setTooltipPosition] =
    useState<TooltipPosition | null>(null);

  /*
   * Fetch GitHub activity
   */
  useEffect(() => {
    async function loadGitHubActivity() {
      try {
        setLoading(true);
        setError(null);

        const result =
          await fetchGitHubContributions(
            GITHUB_USERNAME
          );

        setContributions(result.contributions);
        setTotal(result.total);
      } catch (error) {
        console.error(
          "Failed to load GitHub activity:",
          error
        );

        setError(
          "Unable to load GitHub activity."
        );
      } finally {
        setLoading(false);
      }
    }

    loadGitHubActivity();
  }, []);

  /*
   * Create a map for fast date lookup.
   */
  const contributionMap = useMemo(() => {
    const map = new Map<
      string,
      GitHubContribution
    >();

    for (const contribution of contributions) {
      map.set(contribution.date, contribution);
    }

    return map;
  }, [contributions]);

  /*
   * Build calendar weeks.
   */
  const weeks = useMemo(() => {
    if (contributions.length === 0) {
      return [];
    }

    const firstDate = new Date(
      `${contributions[0].date}T00:00:00`
    );

    const lastDate = new Date(
      `${
        contributions[contributions.length - 1].date
      }T00:00:00`
    );

    /*
     * Start from Sunday.
     */
    firstDate.setDate(
      firstDate.getDate() - firstDate.getDay()
    );

    /*
     * End on Saturday.
     */
    lastDate.setDate(
      lastDate.getDate() +
        (6 - lastDate.getDay())
    );

    const result: GitHubContribution[][] = [];

    const currentDate = new Date(firstDate);

    let currentWeek: GitHubContribution[] = [];

    while (currentDate <= lastDate) {
      const dateString = currentDate
        .toISOString()
        .split("T")[0];

      const contribution =
        contributionMap.get(dateString);

      currentWeek.push(
        contribution ?? {
          date: dateString,
          count: 0,
          level: 0,
        }
      );

      /*
       * Saturday = end of week.
       */
      if (currentDate.getDay() === 6) {
        result.push(currentWeek);
        currentWeek = [];
      }

      currentDate.setDate(
        currentDate.getDate() + 1
      );
    }

    return result;
  }, [contributions, contributionMap]);

  /*
   * Handle square hover.
   *
   * We calculate the square's position and
   * render the tooltip OUTSIDE the scroll container.
   */
  function handleMouseEnter(
    event: React.MouseEvent<HTMLDivElement>,
    day: GitHubContribution
  ) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    setHoveredDay(day);

    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }

  function handleMouseLeave() {
    setHoveredDay(null);
    setTooltipPosition(null);
  }

  /*
   * Loading state
   */
  if (loading) {
    return (
      <section className="border-t border-dashed border-line px-6 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">
              Activity
            </p>

            <h2 className="text-2xl font-bold">
              GitHub Activity
            </h2>
          </div>

          <span className="text-sm text-muted">
            Loading...
          </span>
        </div>

        <div className="flex gap-[3px] overflow-x-auto pb-2">
          {Array.from({ length: 53 }).map(
            (_, week) => (
              <div
                key={week}
                className="flex flex-col gap-[3px]"
              >
                {Array.from({ length: 7 }).map(
                  (_, day) => (
                    <span
                      key={day}
                      className="h-2.5 w-2.5 animate-pulse rounded-[2px] bg-fg opacity-10"
                    />
                  )
                )}
              </div>
            )
          )}
        </div>
      </section>
    );
  }

  /*
   * Error state
   */
  if (error) {
    return (
      <section className="border-t border-dashed border-line px-6 py-12">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">
          Activity
        </p>

        <h2 className="mb-3 text-2xl font-bold">
          GitHub Activity
        </h2>

        <p className="text-sm text-muted">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section
      id="github"
      className="relative border-t border-dashed border-line px-6 py-12"
    >
      {/* Header */}
      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">
            Activity
          </p>

          <h2 className="text-2xl font-bold">
            GitHub Activity
          </h2>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted">
            {total.toLocaleString()} contributions
          </p>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted transition-colors hover:text-fg"
          >
            @{GITHUB_USERNAME}
          </a>
        </div>
      </div>

      {/* Contribution Calendar */}
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max gap-[3px]">
          {weeks.map(
            (week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex flex-col gap-[3px]"
              >
                {week.map((day) => {
                  const opacity =
                    OPACITY[day.level];

                  return (
                    <motion.div
                      key={day.date}
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.15,
                        delay:
                          weekIndex * 0.006,
                      }}
                      className="group"
                      onMouseEnter={(event) =>
                        handleMouseEnter(
                          event,
                          day
                        )
                      }
                      onMouseLeave={
                        handleMouseLeave
                      }
                    >
                      <div
                        className="
                          h-2.5
                          w-2.5
                          cursor-pointer
                          rounded-[2px]
                          bg-fg
                          transition-transform
                          duration-150
                          group-hover:scale-125
                        "
                        style={{
                          opacity,
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted">
        <span>Less active</span>

        {OPACITY.map((opacity, index) => (
          <span
            key={index}
            className="h-2.5 w-2.5 rounded-[2px] bg-fg"
            style={{
              opacity,
            }}
          />
        ))}

        <span>More active</span>
      </div>

      {/* =====================================================
          TOOLTIP
          ===================================================== */}

      {hoveredDay && tooltipPosition && (
        <div
          className="
            pointer-events-none
            fixed
            z-[9999]
            -translate-x-1/2
            -translate-y-[calc(100%+12px)]
            whitespace-nowrap
            rounded-md
            border
            border-zinc-700
            bg-zinc-950
            px-3
            py-2
            text-xs
            shadow-xl
          "
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
        >
          <p className="font-medium text-white">
            {hoveredDay.count}{" "}
            {hoveredDay.count === 1
              ? "contribution"
              : "contributions"}
          </p>

          <p className="mt-1 text-zinc-400">
            {formatDate(hoveredDay.date)}
          </p>

          {/* Tooltip arrow */}
          <span
            className="
              absolute
              left-1/2
              top-full
              -translate-x-1/2
              border-x-4
              border-t-4
              border-x-transparent
              border-t-zinc-950
            "
          />
        </div>
      )}
    </section>
  );
}