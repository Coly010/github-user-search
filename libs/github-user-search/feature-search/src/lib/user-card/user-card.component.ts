import { GithubOrg } from './../+models/github-org.model';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { GitHubUser } from '../+models/github-user.model';

@Component({
  selector: 'cfe-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements OnInit {
  @Input() user: GitHubUser & GithubOrg;

  isOrg: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isOrg = !(this.user as GitHubUser).followers;
  }
}
