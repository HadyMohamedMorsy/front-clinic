import { ComponentType } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CardContentComponent } from '@pages/dashbored/card-content/card-content.component';
import { BaseIndexComponent, RangePipe, TableWrapperComponent } from '@shared';
import { SkeletonModule } from 'primeng/skeleton';
import { filter, map, tap } from 'rxjs';
import { Invoices } from './services/service-type';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    AsyncPipe,
    TableWrapperComponent,
    RangePipe,
    CardContentComponent,
    SkeletonModule,
  ],
  templateUrl: './invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InvoicesComponent extends BaseIndexComponent<
  Invoices,
  ComponentType<any>
> {
  id = input<string>('');
  cardStatistcs = signal<any[]>([]);

  analytics$ = this.api.request('get', 'analytics/invoices').pipe(
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
      withAction: false,
      showById: this.id() ? this.id() : null,
      displayHeaderButton: false,
      provideFields: ['_id'],
      endpoints: {
        index: this.id() ? 'patient/show/invoices' : 'invoice',
      },
      indexTitle: 'Invoice',
      indexIcon: '',
      indexTableKey: 'INVOICES_KEY',
      columns: [
        {
          title: 'name',
          name: 'name',
          searchable: true,
          orderable: true,
        },
        { title: 'paid', name: 'paid', searchable: false, orderable: true },
        { title: 'price', name: 'price', searchable: false, orderable: true },
        {
          title: 'created by',
          name: 'created_by',
          searchable: false,
          orderable: false,
        },
        {
          title: 'created at',
          name: 'createdAt',
          searchable: false,
          orderable: true,
        },
      ],
    };
  }
}
