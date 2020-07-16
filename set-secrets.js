import fs from 'fs';
const githubAccessToken = process.env.GithubAccessToken;

const githubUserSearchConfig = {
  githubAccessToken,
};

fs.writeFileSync(
  'apps/github-user-search/src/config.json',
  JSON.stringify(githubUserSearchConfig)
);
