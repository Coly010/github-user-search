import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';
import { StoreModule } from '@ngrx/store';
import { UserSearchComponent } from './user-search/user-search.component';

import * as fromSearch from './+state/reducers/search.reducers';

const routes: Routes = [
  {
    path: '',
    component: UserSearchComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TranslocoModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(fromSearch.searchFeatureKey, fromSearch.reducer),
  ],
  declarations: [UserSearchComponent],
})
export class GithubUserSearchFeatureSearchModule {}
