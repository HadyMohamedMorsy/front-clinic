import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '@env';
import { TranslateModule } from '@ngx-translate/core';
import {
  AuthService,
  LangService,
  LangSwitcherComponent,
  ListSearchService,
  StaticDataService,
} from '@shared';
import { MenuItem } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StyleClassModule } from 'primeng/styleclass';
import { debounceTime } from 'rxjs';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MenuSidebarComponent,
    MenuModule,
    RouterLink,
    TranslateModule,
    FormsModule,
    ButtonModule,
    AvatarModule,
    SplitButtonModule,
    StyleClassModule,
    AutoCompleteModule,
    LangSwitcherComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  #document = inject(DOCUMENT);
  currentUser = inject(AuthService).currentUser;
  #auth = inject(AuthService);
  #langService = inject(LangService);
  currentLang = inject(LangService).currentLanguage;
  #listSearch = inject(ListSearchService);
  #router = inject(Router);
  #destroyRef = inject(DestroyRef); // Current "context" (this component)
  domain = environment.DOMAIN_URL;

  showBtnDisplayMenuSidebar = signal(false);

  selectLink!: { title: string; slug: any };
  blogList = signal<{ title: string; slug: any }[]>([]);

  items!: MenuItem[] | undefined;

  protected dialogConfig: DynamicDialogConfig = {
    showHeader: false,
    width: '800px',
    height: '100%',
    modal: true,
    focusOnShow: true,
    styleClass: 'm-0 max-h-full transform-none',
    position: this.#langService.currentLanguage() === 'en' ? 'right' : 'left',
    rtl: this.#langService.currentLanguage() !== 'en',
    closable: true,
    closeOnEscape: true,
    dismissableMask: true,
  };

  ngOnInit() {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.#auth
            .logout()
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(() => this.#router.navigateByUrl('auth/login'));
        },
      },
    ];
  }
  showSidebar() {
    this.#document.documentElement.style.setProperty(
      '--sidebar-width',
      '15rem'
    );
    this.showBtnDisplayMenuSidebar.set(false);
  }

  globalSearch({ query }: any) {
    const request = this.#listSearch
      .setfiltersData({ name: 'title', query })
      .sendRequest('blog/index', 'title', 'slug');

    request
      .pipe(debounceTime(1000), takeUntilDestroyed(this.#destroyRef))
      .subscribe((response) => {
        this.blogList.set(response);
      });
  }
}
