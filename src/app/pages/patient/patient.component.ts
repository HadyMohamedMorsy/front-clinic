import { ComponentType } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AppointmentsDialogComponent } from '@pages/appointment/appointment-dialog.component';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PatientDialogComponent } from './patient-dialog.component';
import { Patient } from './services/service-type';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    AsyncPipe,
    TableWrapperComponent,
    RouterLink,
    TooltipModule,
    ButtonModule,
  ],
  templateUrl: './patient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PatientComponent extends BaseIndexComponent<
  Patient,
  ComponentType<PatientDialogComponent>
> {
  appointment = viewChild.required<TemplateRef<any>>('appointment');

  ngOnInit() {
    this.dialogComponent = PatientDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      provideFields: ['id', 'note', 'diseases'],
      endpoints: {
        index: 'patient',
        delete: 'patient/delete',
      },
      indexTitle: 'patient',
      indexIcon: '',
      createBtnLabel: 'Create patient',
      indexTableKey: 'PATIENT_KEY',
      columns: [
        {
          title: 'name patient',
          name: 'name',
          searchable: true,
          orderable: true,
          render: this.appointment()
        },
        { title: 'number', name: 'number', searchable: true, orderable: false },
        { title: 'age', name: 'age', searchable: false, orderable: true },
        {
          title: 'created by',
          name: 'created_by',
          searchable: true,
          orderable: false,
        },
      ],
    };
  }

  protected openApoointmentDialog(id: string) {
    const dialogConfigOptions = { ...this.dialogConfig, data: { id } };
    this.dialogRef = this.dialogService.open(
      AppointmentsDialogComponent,
      dialogConfigOptions
    );
    this.dialogRef.onClose
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
