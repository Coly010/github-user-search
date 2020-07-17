import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { LocaleDropdownComponent } from './locale-dropdown/locale-dropdown.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslocoModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
  ],
  declarations: [LocaleDropdownComponent],
  exports: [LocaleDropdownComponent],
})
export class SharedFeatureLocaleUtilModule {}
