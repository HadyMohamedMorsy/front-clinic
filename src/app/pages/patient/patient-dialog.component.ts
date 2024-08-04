import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  BaseCreateUpdateComponent,
  constants,
  FieldBuilderService,
  FormComponent,
  SpinnerComponent,
} from '@shared';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { PatientModel } from './services/service-type';

@Component({
  selector: 'app-patient-dialog',
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
export class PatientDialogComponent extends BaseCreateUpdateComponent<PatientModel> {
  #fieldBuilder = inject(FieldBuilderService);

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      endpoints: {
        store: 'patient/create',
        update: 'patient/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update Patient')),
        submitButtonLabel: this.translate.instant(_('Update Patient')),
      };
      this.model = new PatientModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create Patient')),
        submitButtonLabel: this.translate.instant(_('Create Patient')),
      };
      this.model = new PatientModel();
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
          key: 'name',
          type: 'floated-input-field',
          props: {
            label: _('name patient'),
            required: true,
          },
        },
        {
          key: 'number',
          type: 'floated-input-field',
          props: {
            label: _('number'),
            required: true,
            minLength: constants.NUMBER_PHONE,
          },
        },
        {
          key: 'age',
          type: 'floated-input-field',
          props: {
            type: 'number',
            label: _('age'),
            required: true,
            maxLength: 3,
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
      this.#fieldBuilder.fieldBuilder([
        {
          key: 'diseases',
          type: 'textarea-field',
          props: {
            label: _('diseases'),
            placeholder: 'Enter diseases',
          },
        },
      ]),
    ];
  }
}
