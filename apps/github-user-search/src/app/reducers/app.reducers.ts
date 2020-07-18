import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  if (environment.production) {
    return (state, action) => reducer(state, action);
  }

  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];
