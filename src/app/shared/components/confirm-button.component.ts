import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmService } from '../services';
import { input } from "@angular/core";

@Component({
  selector: 'app-confirm',

      template: `
    <!-- p-confirmPopup instance declared once in app.component.html -->
    <button
      pButton pRipple
      type="button"
      (click)="confirm($event)"
      [class]="buttonClass()"
      [disabled]="disabled()"
      [pTooltip]="tooltip()"
      [tooltipPosition]="tooltipPosition() || 'top'"
      [icon]="icon()"
      [label]="label()"></button>
  `,
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConfirmButtonComponent {
  #confirmService = inject(ConfirmService);

  icon = input<string>('');
  label = input<string>('');
  buttonClass = input<string | undefined>('');
  tooltip = input<string | undefined>('');
  tooltipPosition = input<string | undefined>('');
  disabled = input<boolean | undefined>();
  @Output() acceptAction = new EventEmitter();

  confirm(event: MouseEvent) {
    this.#confirmService.confirmDelete({
      target: event.target,
      acceptCallback: () => this.acceptAction.emit()
    });
  }
}
