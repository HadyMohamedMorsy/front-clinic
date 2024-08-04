import { ComponentType } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  BaseIndexComponent,
  TableWrapperComponent,
  TimeZonePipe,
} from '@shared';
import { Appointments } from './services/service-type';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [AsyncPipe, TableWrapperComponent, TimeZonePipe],
  templateUrl: './appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppointmentComponent extends BaseIndexComponent<
  Appointments,
  ComponentType<any>
> {
  day = viewChild.required<TemplateRef<any>>('day');
  consultation = viewChild.required<TemplateRef<any>>('consultation');
  id = input<string>('');

  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      showById: this.id() ? this.id() : null,
      withAction: false,
      displayHeaderButton: false,
      provideFields: ['_id'],
      endpoints: {
        index: this.id() ? 'patient/show/reservations' : 'reservation',
      },
      indexTitle: 'Appointment',
      indexIcon: '',
      indexTableKey: 'APPOINTMENT_KEY',
      columns: [
        { title: 'name', name: 'name', searchable: true, orderable: false },
        {
          title: 'Day',
          name: 'day',
          searchable: false,
          orderable: true,
          render: this.day(),
        },
        {
          title: 'Day consultation',
          name: 'day_consultation',
          searchable: false,
          orderable: true,
          render: this.consultation(),
        },
        {
          title: 'status',
          name: 'status',
          searchable: false,
          orderable: false,
        },
        {
          title: 'created at',
          name: 'createdAt',
          searchable: false,
          orderable: true,
        },
        {
          title: 'created by',
          name: 'created_by',
          searchable: false,
          orderable: false,
        },
      ],
    };
  }
}
