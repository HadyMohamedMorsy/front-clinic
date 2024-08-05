import { ComponentType } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CardContentComponent } from '@pages/dashbored/card-content/card-content.component';
import {
  BaseIndexComponent,
  RangePipe,
  TableWrapperComponent,
  TimeZonePipe,
} from '@shared';
import { SkeletonModule } from 'primeng/skeleton';
import { filter, map, tap } from 'rxjs';
import { Appointments } from './services/service-type';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    AsyncPipe,
    TableWrapperComponent,
    TimeZonePipe,
    RangePipe,
    CardContentComponent,
    SkeletonModule,
  ],
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
  cardStatistcs = signal<any[]>([]);

  analytics$ = this.api.request('get', 'analytics/reservations').pipe(
    map(({ data }) => data.data),
    tap((data) => this.cardStatistcs.set(data))
  );

  actionIncrement$ = toObservable(this.actionCrement).pipe(
    filter((e) => e > 0 || e < 0),
    tap((num) => {
      this.cardStatistcs.update((statitcs) => {
        return statitcs.map((item) => ({
          ...item,
          count: item.count ? item.count + num : item.count,
        }));
      });
    })
  );

  cardStatistcsReadOnly = toSignal(this.analytics$, {
    initialValue: [],
  });

  actionIncrementReadOnly = toSignal(this.actionIncrement$, {
    initialValue: 0,
  });

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
