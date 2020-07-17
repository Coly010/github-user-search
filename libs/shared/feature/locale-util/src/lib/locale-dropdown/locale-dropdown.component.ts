import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'cfe-locale-dropdown',
  templateUrl: './locale-dropdown.component.html',
  styleUrls: ['./locale-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleDropdownComponent implements OnInit {
  activeLang: string;
  constructor(private readonly translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.activeLang = this.translocoService.getActiveLang();
  }

  setActiveLang(lang: string) {
    this.activeLang = lang;
    this.translocoService.setActiveLang(lang);
  }
}
