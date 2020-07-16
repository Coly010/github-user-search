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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialCssVarsModule],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
