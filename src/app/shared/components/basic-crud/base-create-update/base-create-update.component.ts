import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { serialize } from 'object-to-formdata';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, finalize } from 'rxjs';
import {
  ApiService,
  BaseCrudDialogMeta,
  FieldBuilderService,
  GlobalApiResponse,
} from '../../../services';
import { FormComponent } from '../../form.component';
import { SpinnerComponent } from '../../spinner.component';
@Component({
  selector: 'app-base-create-update',
  templateUrl: './base-create-update.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    TranslateModule,
    FormComponent,
    ButtonModule,
    SpinnerComponent,
  ],
  styleUrls: ['./base-create-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseCreateUpdateComponent<
  T extends { [key: string]: any }
> {
  public api = inject(ApiService);
  public translate = inject(TranslateService);
  public fieldBuilder = inject(FieldBuilderService);
  public dialogRef = inject(DynamicDialogRef);
  public dialogConfig = inject(DynamicDialogConfig);
  public editData = this.dialogConfig.data;
  public destroyRef = inject(DestroyRef); // Current "context" (this component)

  formData = new FormData();
  isLoading = signal(false);
  dialogMeta = new BaseCrudDialogMeta();

  model = {} as T;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  createUpdateForm = new FormGroup({});

  protected createUpdateRecord(endpoints: { [key: string]: string }) {
    this.formData = serialize<T>(this.model, {
      indices: true,
      allowEmptyArrays: false,
      nullsAsUndefineds: true,
    });

    const action = this.editData
      ? this.api.request('post', endpoints.update, this.formData)
      : this.api.request('post', endpoints.store, this.formData);

    this.manageRecord(action);
  }

  manageRecord(action: Observable<GlobalApiResponse>) {
    if (this.createUpdateForm.invalid) return;
    this.isLoading.set(true);
    action
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((response: GlobalApiResponse) =>
        this.closeDialog(response.data)
      );
  }

  closeDialog(data?: T) {
    this.dialogRef.close(data);
  }
}
