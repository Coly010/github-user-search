import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'cfe-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', Validators.required),
    });
  }

  search() {}
}
