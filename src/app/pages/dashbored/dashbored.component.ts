import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService, RangePipe } from '@shared';
import { SkeletonModule } from 'primeng/skeleton';
import { map } from 'rxjs';
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
  #api = inject(ApiService);
  analytics$ = this.#api
    .request('get', 'analytics')
    .pipe(map(({ data }) => data.data));
  
  cardStatistcs = toSignal(this.analytics$, {
    initialValue: [],
  });
}
