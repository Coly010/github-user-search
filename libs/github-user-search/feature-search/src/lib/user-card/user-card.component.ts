import { GithubOrg } from './../+models/github-org.model';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { GitHubUser } from '../+models/github-user.model';

@Component({
  selector: 'cfe-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements OnChanges {
  @Input() user: GitHubUser & GithubOrg;

  isOrg: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.isOrg = !(this.user as GitHubUser).followers;
    }
  }
}
