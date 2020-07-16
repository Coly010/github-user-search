import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let spectator: Spectator<SearchResultsComponent>;
  const createComponent = createComponentFactory({
    component: SearchResultsComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
