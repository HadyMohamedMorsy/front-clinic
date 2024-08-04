import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  template: `
    <div class="text-right p-3 bg-white">
      <p class="text-sm">
        &copy;
        {{ getDate }}
        <a
          href="https://pro-branding.com/"
          target="_blank"
          class="text-primary font-semibold"
          >pro branding.</a
        >
        {{ 'FOOTER.RIGHTS' | translate }}
      </p>
    </div>
  `,
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  get getDate() {
    return new Date().getFullYear();
  }
}
