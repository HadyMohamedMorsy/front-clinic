import { Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export const invoicesRoutes: Routes = [
  {
    path: 'invoices',
    loadComponent: () => import('@pages/invoice/invoice.component'),
    title: _('invoices'),
    data: {
      breadcrumbs: [{ label: 'invoices' }],
    },
  },
  {
    path: 'invoices/:id',
    loadComponent: () => import('@pages/invoice/invoice.component'),
    title: _('invoices'),
    data: {
      breadcrumbs: [{ label: 'invoices' }],
    },
  },
];
