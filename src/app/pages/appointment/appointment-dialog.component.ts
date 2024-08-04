import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  BaseCreateUpdateComponent,
  FieldBuilderService,
  FormComponent,
  SpinnerComponent,
} from '@shared';
import { serialize } from 'object-to-formdata';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';
import { AppointmentsModel } from './services/service-type';

@Component({
  selector: 'app-appointments-dialog',
  standalone: true,
  templateUrl:
    '/src/app/shared/components/basic-crud/base-create-update/base-create-update.component.html',
  imports: [
    AsyncPipe,
    TranslateModule,
    DropdownModule,
    ButtonModule,
    SpinnerComponent,
    FormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsDialogComponent extends BaseCreateUpdateComponent<AppointmentsModel> {
  #fieldBuilder = inject(FieldBuilderService);

  ngOnInit() {
    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('create Appointment')),
        submitButtonLabel: this.translate.instant(_('create Appointment')),
      };
      this.model = new AppointmentsModel(this.editData);
    }
    this.#updateFields();
  }

  #updateFields() {
    this.fields = this.configureFields();
  }

  configureFields(): FormlyFieldConfig[] {
    return [
      this.#fieldBuilder.fieldBuilder([
        {
          key: 'day',
          type: 'date-field',
          props: {
            label: 'day',
            minDate: new Date(),
          },
        },
        {
          key: 'day_consultation',
          type: 'date-field',
          props: {
            label: 'day consultation',
            minDate: new Date(),
          },
        },
      ]),
      this.#fieldBuilder.fieldBuilder([
        {
          key: 'price',
          type: 'floated-input-field',
          props: {
            type: 'number',
            label: _('price appointment'),
            placeholder: 'Enter price',
          },
        },
        {
          key: 'paid',
          type: 'floated-input-field',
          props: {
            type: 'number',
            label: _('paid from patient'),
            placeholder: 'Enter paid',
          },
          hooks: {
            onInit: (field) => {
              const price = field.form?.get?.('price');
              return price?.valueChanges.pipe(
                distinctUntilChanged(),
                tap((price) => {
                  if (!field.props) return;
                  field.props.max = price;
                })
              );
            },
          },
        },
      ]),
      this.#fieldBuilder.fieldBuilder([
        {
          key: 'note',
          type: 'textarea-field',
          props: {
            label: _('note'),
            placeholder: 'Enter note',
          },
        },
      ]),
    ];
  }

  override createUpdateRecord(endpoints: { [key: string]: string }) {
    this.formData = serialize<AppointmentsModel>(this.model, {
      indices: true,
      allowEmptyArrays: false,
      nullsAsUndefineds: true,
    });
    const reservationFrom = {
      patient: this.formData.get('patient'),
      day_consultation: this.formData.get('day_consultation'),
      day: this.formData.get('day'),
      note: this.formData.get('note'),
    };

    const invoiceFrom = {
      patient: this.formData.get('patient'),
      paid: this.formData.get('paid'),
      price: this.formData.get('price'),
    };

    const action = this.api
      .request('post', 'reservation/create', reservationFrom)
      .pipe(
        switchMap(() => this.api.request('post', 'invoice/create', invoiceFrom))
      );

    this.manageRecord(action);
  }
}
