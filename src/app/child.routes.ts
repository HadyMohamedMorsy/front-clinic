import { Route } from '@angular/router';
import { appointmentRoutes } from '@pages/appointment/appointment.routes';
import { dashboredRoutes } from '@pages/dashbored/dashbored.routes';
import { invoicesRoutes } from '@pages/invoice/invoice.routes';
import { patientRoutes } from '@pages/patient/patient.routes';

export default [
  ...dashboredRoutes,
  ...patientRoutes,
  ...appointmentRoutes,
  ...invoicesRoutes,
] as Route[];
