import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form',

  template: `
    @if(fields().length) {
      <form class="px-3 pt-4" [formGroup]="form()" (ngSubmit)="onSubmit.emit(model())">
        <formly-form [model]="model()" [fields]="fields()" [form]="form()" [options]="options()" />

        @if (showFormActions()) {
          <div [ngClass]="'form-footer flex flex-wrap justify-content-end gap-2 ' + footerFormClass()">
            @if (showCancelButton()) {
              <button pButton type="button"
                class="p-button-sm p-button-outlined p-button-secondary"
                [ngClass]="cancelButtonClass()"
                [label]="cancelButtonLabel()"
                (click)="onCancel.emit()"></button>
            }
            @if (showResetButton()) {
              <button pButton pRipple
                type="button"
                class="p-button-sm p-button-secondary p-button-outlined"
                [ngClass]="resetButtonClass()"
                (click)="options().resetModel?.()"
                label="Clear"></button>
                <!--In case we rely on "form().reset()" instead of "options().resetModel()", please note that if we call "reset" without an explicit value, its value reverts to its default value instead of "null".-->
            }

            @if (showSubmitButton()) {
              <button pButton pRipple class="p-button-sm  p-button-success"
                type="submit"
                [disabled]="form().invalid"
                [ngClass]="submitButtonClass()"
                [loading]="submitBtnLoading()"
                [label]="buttonLabel()"></button>
            }
          </div>
        }
      </form>
    }
  `,
  styles: [`
    .form-footer {
      border-top: 1px solid #ced4da;
      padding-block: 1rem;
      padding-inline : 1.5rem;
    }
  `],
  standalone: true,
  imports: [NgClass, ButtonModule, FormlyModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent<T> {
  fields = input<FormlyFieldConfig[]>([]);
  form = input<FormGroup>({} as FormGroup);
  model = input<T>({} as T);
  options = input<FormlyFormOptions>({});
  buttonLabel = input<string>("");
  cancelButtonClass = input<string>("");
  cancelButtonLabel = input("Cancel");
  submitButtonClass = input<string>("");
  resetButtonClass = input<string>("");
  submitBtnLoading = input(false);
  showFormActions = input(true);
  showSubmitButton = input(true);
  showResetButton = input(false);
  showCancelButton = input(false);
  withFormPadding = input(false);
  footerFormClass = input("");

  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter();
}
