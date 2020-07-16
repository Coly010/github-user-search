const fs = require('fs');

const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN;

const githubUserSearchConfig = {
  githubAccessToken,
};

fs.writeFileSync(
  'apps/github-user-search/src/config.json',
  JSON.stringify(githubUserSearchConfig)
);
