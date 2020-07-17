export interface GitHubUser {
  id: string;
  login: string;
  name: string;
  url: string;
  email: string;
  bio: string;
  avatarUrl: string;
  createdAt: string;
  followers: {
    totalCount: number;
  };
  repositories: {
    totalCount: number;
  };
  starredRepositories: {
    totalCount: number;
  };
}
