import { Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export const appointmentRoutes: Routes = [
  {
    path: 'appointments',
    loadComponent: () => import('@pages/appointment/appointment.component'),
    title: _('appointments'),
    data: {
      breadcrumbs: [{ label: 'appointments' }],
    },
  },
  {
    path: 'appointments/:id',
    loadComponent: () => import('@pages/appointment/appointment.component'),
    title: _('appointments'),
    data: {
      breadcrumbs: [{ label: 'appointments' }],
    },
  },
];
