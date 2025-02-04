import { Route, Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { verifyTokenExpireGuard } from '@shared';

export const resetPasswordRoutes: Routes = [
  {
    path: 'reset-password/:token',
    loadComponent: () => import('./reset-password.component'),
    title: _('reset password'),
    canActivate: [verifyTokenExpireGuard],
  },
] as Route[];
