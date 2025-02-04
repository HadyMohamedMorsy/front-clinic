import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'formly-switch-field',
  template: `
    <div class="p-field">
      <div class="flex gap-2 align-items-center">
        <p-inputSwitch [formControl]="formControl"
          [formlyAttributes]="field"
          [trueValue]="props.trueValue"
          [falseValue]="props.falseValue"
          (onChange)="props.change && props.change(field, $event)">
        </p-inputSwitch>

        @if (props.label) {
          <legend>
            {{ props.label }}
            @if (props.required && props.hideRequiredMarker !== true) {
              <span class="text-red-500">*</span>
            }
          </legend>
        }
      </div>

      @if (props.description) {<p class="mt-2 text-xs">{{ props.description }}</p>}

      @if (showError && formControl.errors) {
        <small class="p-error" role="alert">
          <formly-validation-message [field]="field"></formly-validation-message>
        </small>
      }
    </div>
  `,
  standalone: true,
  styles: [`::ng-deep { p-inputSwitch { font-size: 0 } }`],
  imports: [FormlyModule, InputSwitchModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent extends FieldType<FieldTypeConfig> { }
