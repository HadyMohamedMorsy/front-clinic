import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CardModule],
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent {
  title = input.required<string>();
  typeTime = input.required<string>();
  count = input.required<number>();
  shortDiscription = input<string>('this is reservation from this period');
  iconClass = input.required<string>();
}
