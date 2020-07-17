import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { UserSearchComponent } from './user-search/user-search.component';

import * as fromSearch from './+state/reducers/search.reducers';
import { SearchEffects } from './+state/effects/search.effects';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserCardComponent } from './user-card/user-card.component';

const routes: Routes = [
  {
    path: '',
    component: UserSearchComponent,
    children: [
      {
        path: 'search/:searchTerm',
        component: SearchResultsComponent,
      },
    ],
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
    MatListModule,
    MatCardModule,
    StoreModule.forFeature(fromSearch.searchFeatureKey, fromSearch.reducer),
    EffectsModule.forFeature([SearchEffects]),
  ],
  declarations: [
    UserSearchComponent,
    SearchResultsComponent,
    UserCardComponent,
  ],
})
export class GithubUserSearchFeatureSearchModule {}
