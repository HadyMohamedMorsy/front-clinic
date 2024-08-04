import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'formly-select-field',
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, TooltipModule, FormlyModule, DropdownModule, MultiSelectModule, AsyncPipe, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends FieldType<FieldTypeConfig> {

  get options$(): Observable<any[]> {
    return Array.isArray(this.props.options)
      ? of(this.props.options)
      : this.props.options ?? of([]);
  };
}