import * as en from './data/en.json';

import { TranslocoTestingModule, TranslocoConfig } from '@ngneat/transloco';

export function getTranslocoModule(config: Partial<TranslocoConfig> = {}) {
  return TranslocoTestingModule.withLangs(
    { en },
    {
      availableLangs: ['en'],
      defaultLang: 'en',
      ...config,
    }
  );
}
