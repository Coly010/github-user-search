import { search } from './../+state/actions/search.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cfe-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', Validators.required),
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
