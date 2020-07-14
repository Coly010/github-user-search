import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@ngneat/transloco';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [CommonModule, TranslocoModule, MatToolbarModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class GithubUserSearchUiShellModule {}
