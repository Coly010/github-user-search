import { Component } from '@angular/core';
import { MaterialCssVarsService } from 'angular-material-css-vars';

@Component({
  selector: 'cfe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'github-user-search';

  constructor(private readonly materialCssVarsService: MaterialCssVarsService) {
    this.materialCssVarsService.setPrimaryColor('#5b3475');
    this.materialCssVarsService.setAccentColor('#4e7534');
  }
}
