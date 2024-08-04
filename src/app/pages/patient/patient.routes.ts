import { Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export const patientRoutes: Routes = [
  {
    path: 'patients',
    loadComponent: () => import('@pages/patient/patient.component'),
    title: _('patients'),
    data: {
      breadcrumbs: [{ label: 'patients' }],
    },
  },
];
