import { selectSearchTerm } from './../+state/selectors/search.selectors';
import { search } from './../+state/actions/search.actions';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'cfe-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchComponent implements OnInit {
  searchForm: FormGroup;
  formSubmitted = false;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectSearchTerm)).subscribe((searchTerm) => {
      this.searchForm.setValue({ searchTerm });
      this.formSubmitted = searchTerm !== '';
    });
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }

    const { searchTerm } = this.searchForm.value;

    this.store.dispatch(search({ searchTerm }));
  }
}
