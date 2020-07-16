import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { MaterialCssVarsModule } from 'angular-material-css-vars';
import { TestBed, async } from '@angular/core/testing';
import { GithubUserSearchUiShellModule } from '@cfe/github-user-search/ui-shell';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      MaterialCssVarsModule.forRoot(),
      RouterTestingModule,
      GithubUserSearchUiShellModule,
    ],
  });
  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });
});
