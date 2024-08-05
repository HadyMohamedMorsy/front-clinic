import { ComponentType } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AppointmentsDialogComponent } from '@pages/appointment/appointment-dialog.component';
import { CardContentComponent } from '@pages/dashbored/card-content/card-content.component';
import { BaseIndexComponent, RangePipe, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { filter, map, tap } from 'rxjs';
import { PatientDialogComponent } from './patient-dialog.component';
import { Patient } from './services/service-type';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    AsyncPipe,
    TableWrapperComponent,
    RouterLink,
    RangePipe,
    CardContentComponent,
    SkeletonModule,
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
  cardStatistcs = signal<any[]>([]);

  analytics$ = this.api.request('get', 'analytics/patients').pipe(
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
          render: this.appointment(),
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
