export async function getRepo(owner: string, repo: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

  if (!response.ok) {
    throw new Error("Repo not found :C");
  }

  return response.json();
}

export async function getReadme(owner: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.raw+json",
      },
    },
  );
  if (!response.ok) {
    return null; // No README
  }
  return response.text();
}

interface ProjectInfo {
  description: string | null;
  stars: number;
  language: string | null;
  readme: string | null;
}

// Cache in-flight/resolved requests per repo so remounts, re-renders, and
// StrictMode's double-invoke in dev don't burn extra GitHub API rate limit.
const projectCache = new Map<string, Promise<ProjectInfo>>();

async function fetchProject(owner: string, repo: string): Promise<ProjectInfo> {
  const [repoRes, readmeRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${owner}/${repo}`),
    fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: {
        Accept: "application/vnd.github.raw+json",
      },
    }),
  ]);

  if (!repoRes.ok) {
    throw new Error("Repo not found :C");
  }

  const repoData = await repoRes.json();
  const readme = readmeRes.ok ? await readmeRes.text() : null;

  return {
    description: repoData.description,
    stars: repoData.stargazers_count,
    language: repoData.language,
    readme,
  };
}

export function getProject(owner: string, repo: string): Promise<ProjectInfo> {
  const key = `${owner}/${repo}`;
  let cached = projectCache.get(key);

  if (!cached) {
    cached = fetchProject(owner, repo).catch((error) => {
      projectCache.delete(key); // don't cache failures, allow retrying later
      throw error;
    });
    projectCache.set(key, cached);
  }

  return cached;
}
