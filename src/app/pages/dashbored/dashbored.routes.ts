import { Route, Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export const dashboredRoutes: Routes = [
  {
    path: 'dashbored',
    loadComponent: () => import('./dashbored.component'),
    title: _('dashbored'),
  },
] as Route[];
