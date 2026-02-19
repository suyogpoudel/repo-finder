"use server";

export type Repo = {
  id: number;
  name: string;
  url: string;
  description: string;
  stargazersCount: number;
  forksCount: number;
  watchersCount: number;
  ownerUsername: string;
  ownerUrl: string;
};

const PER_PAGE = 30;

const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getRepos = async (language: string): Promise<Repo> => {
  const initialRes = await fetch(
    `https://api.github.com/search/repositories?q=language:${language}&per_page=1`,
    {
      next: { revalidate: 3600 },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!initialRes.ok) {
    throw new Error("Failed to fetch total count");
  }

  const initialData = await initialRes.json();
  const totalCount = initialData.total_count;

  if (!totalCount) {
    throw new Error("No repositories found");
  }

  const MAX_RESULTS = 1000;
  const safeTotal = Math.min(totalCount, MAX_RESULTS);
  const totalPages = Math.floor(safeTotal / PER_PAGE);

  const randomPage = getRandomNumber(totalPages) + 1;

  const pageRes = await fetch(
    `https://api.github.com/search/repositories?q=language:${language}&per_page=${PER_PAGE}&page=${randomPage}`,

    {
      next: { revalidate: 3600 },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to fetch random page");
  }

  const pageData = await pageRes.json();

  if (!pageData.items || pageData.items.length === 0) {
    throw new Error("No repositories in the selected page");
  }

  const randomItem = pageData.items[getRandomNumber(pageData.items.length)];

  return {
    id: randomItem.id,
    name: randomItem.name,
    url: randomItem.html_url,
    description: randomItem.description,
    stargazersCount: randomItem.stargazers_count,
    forksCount: randomItem.forks_count,
    watchersCount: randomItem.watchers_count,
    ownerUsername: randomItem.owner.login,
    ownerUrl: randomItem.owner.html_url,
  };
};
