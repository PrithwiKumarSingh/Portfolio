export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubContributionsResponse {
  total: {
    lastYear?: number;
    [year: string]: number | undefined;
  };
  contributions: GitHubContribution[];
}

const API_URL =
  "https://github-contributions-api.jogruber.de/v4";

export async function fetchGitHubContributions(
  username: string
): Promise<{
  contributions: GitHubContribution[];
  total: number;
}> {
  const response = await fetch(
    `${API_URL}/${encodeURIComponent(username)}?y=last`
  );

  if (!response.ok) {
    throw new Error(
      `GitHub API request failed: ${response.status}`
    );
  }

  const data =
    (await response.json()) as GitHubContributionsResponse;

  return {
    contributions: data.contributions,
    total: data.total.lastYear ?? 0,
  };
}