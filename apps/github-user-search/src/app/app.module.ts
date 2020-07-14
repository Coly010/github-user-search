import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialCssVarsModule } from 'angular-material-css-vars';

import { GithubUserSearchUiShellModule } from '@cfe/github-user-search/ui-shell';

import { TranslocoRootModule } from './transloco-root.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslocoRootModule,
    BrowserAnimationsModule,
    MaterialCssVarsModule.forRoot({
      isAutoContrast: true,
      darkThemeClass: 'isDarkTheme',
      lightThemeClass: 'isLightTheme',
    }),
    GithubUserSearchUiShellModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
