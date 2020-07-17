import { TranslocoService } from '@ngneat/transloco';
import { MatPaginatorIntl } from '@angular/material/paginator';
export const matPaginatorIntlFactory = (translocoService: TranslocoService) => {
  const intl = new MatPaginatorIntl();
  intl.firstPageLabel = translocoService.translate('paginator.firstPageLabel');
  intl.itemsPerPageLabel = translocoService.translate(
    'paginator.itemsPerPageLabel'
  );
  intl.lastPageLabel = translocoService.translate('paginator.lastPageLabel');
  intl.nextPageLabel = translocoService.translate('paginator.nextPageLabel');
  intl.previousPageLabel = translocoService.translate(
    'paginator.previousPageLabel'
  );
  intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return translocoService.translate('paginator.rangeLabelNoPages', {
        length,
      });
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return translocoService.translate('paginator.rangeLabelPages', {
      startIndex: startIndex + 1,
      endIndex,
      length,
    });
  };

  return intl;
};
