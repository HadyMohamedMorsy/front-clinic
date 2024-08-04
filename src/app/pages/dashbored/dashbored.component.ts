import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CachedListService, RangePipe } from '@shared';
import { SkeletonModule } from 'primeng/skeleton';
import { CardContentComponent } from './card-content/card-content.component';

@Component({
  selector: 'app-dashbored',
  standalone: true,
  imports: [CardContentComponent, SkeletonModule, RangePipe],
  templateUrl: './dashbored.component.html',
  styleUrl: './dashbored.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboredComponent {
  #cachedList = inject(CachedListService);
  analytics$ = this.#cachedList.getListData('analytics', 'GET');
  cardStatistcs = toSignal(this.analytics$, {
    initialValue: [],
  });
}
