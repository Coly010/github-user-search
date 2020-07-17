import { selectSearchTerm } from './../+state/selectors/search.selectors';
import { search } from './../+state/actions/search.actions';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'cfe-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', Validators.required),
    });

    this.store
      .pipe(untilDestroyed(this), select(selectSearchTerm))
      .subscribe((searchTerm) => this.searchForm.setValue({ searchTerm }));
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }

    const { searchTerm } = this.searchForm.value;

    this.store.dispatch(search({ searchTerm }));
  }
}
