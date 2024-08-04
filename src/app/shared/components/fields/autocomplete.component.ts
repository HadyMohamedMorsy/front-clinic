import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'formly-autocomplete-field',
  template: `
    <div class="p-field">
      @if (props.description) {<p class="mb-3 text-xs">{{ props.description }}</p>}

      <span class="p-float-label">
        <p-autoComplete
          styleClass="w-full"
          [formControl]="formControl"
          [formlyAttributes]="field"
          [class.ng-dirty]="showError"
          [forceSelection]="true"
          [showEmptyMessage]="true"
          [virtualScroll]="props.virtualScroll"
          [virtualScrollItemSize]="35"
          [completeOnFocus]="false"
          [delay]="1000"
          appendTo="body"
          inputStyleClass="w-full text-sm"
          [dropdown]="props.dropdown ?? false"
          [multiple]="props.multiple"
          [field]="props.field ?? 'name'"
          [placeholder]="props.placeholder ?? ''"
          [required]="props.required ?? false"
          [suggestions]="props.suggestions ?? []"
          (completeMethod)="(props.onComplete($event, field))"></p-autoComplete>

          @if (props.label) {
            <label>
              {{ props.label }}
              @if (props.required && props.hideRequiredMarker !== true) {
                  <span class="text-red-500">*</span>
              }
            </label>
          }
      </span>

      @if (showError && formControl.errors) {
        <small class="p-error" role="alert">
          <formly-validation-message [field]="field"></formly-validation-message>
        </small>
      }
    </div>
  `,
  standalone: true,
  imports: [AutoCompleteModule, FormlyModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent extends FieldType<FieldTypeConfig> {
}
