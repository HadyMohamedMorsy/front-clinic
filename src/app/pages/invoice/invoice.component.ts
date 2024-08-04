import { ComponentType } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { Invoices } from './services/service-type';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [AsyncPipe, TableWrapperComponent],
  templateUrl: './invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InvoicesComponent extends BaseIndexComponent<
  Invoices,
  ComponentType<any>
> {
  id = input<string>('');

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
