import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchComponent } from './user-search/user-search.component';

const routes: Routes = [
  {
    path: '',
    component: UserSearchComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [UserSearchComponent],
})
export class GithubUserSearchFeatureSearchModule {}
