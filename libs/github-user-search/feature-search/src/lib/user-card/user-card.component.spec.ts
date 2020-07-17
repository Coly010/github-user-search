import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { getTranslocoModule } from '@cfe/shared/util/testing-utils';
import { UserCardComponent } from './user-card.component';
import { GitHubUser } from '../+models/github-user.model';

const mockUser: GitHubUser = {
  id: 'test',
  login: 'test',
  name: 'test',
  url: 'test',
  email: 'test',
  bio: 'test',
  avatarUrl: 'test',
  createdAt: 'test',
  followers: {
    totalCount: 0,
  },
  repositories: {
    totalCount: 0,
  },
  starredRepositories: {
    totalCount: 0,
  },
};

describe('UserCardComponent', () => {
  let spectator: Spectator<UserCardComponent>;
  const createComponent = createComponentFactory({
    component: UserCardComponent,
    imports: [getTranslocoModule()],
    shallow: true,
  });

  beforeEach(
    () => (spectator = createComponent({ props: { user: mockUser as any } }))
  );

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
