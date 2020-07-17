import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  if (environment.production) {
    return () => null;
  }

  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    console.log(environment.production);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];
