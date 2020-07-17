import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { LocaleDropdownComponent } from './locale-dropdown/locale-dropdown.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslocoModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
  ],
  declarations: [LocaleDropdownComponent],
  exports: [LocaleDropdownComponent],
})
export class SharedFeatureLocaleUtilModule {}
