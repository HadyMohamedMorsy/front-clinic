import { AsyncPipe, DOCUMENT, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RangePipe } from '@shared';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    RouterLink,
    RangePipe,
    ButtonModule,
    SkeletonModule,
    PanelMenuModule,
    SidebarModule,
    StyleClassModule,
    RippleModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSidebarComponent {
  #document = inject(DOCUMENT);
  showLabel = signal(false);
  menuItems!: any[];
  #auth = inject(AuthService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  ngOnInit() {
    this.menuItems = [
      {
        title: 'Dashboard',
        icon: 'fa-solid fa-gauge',
        link: '/dashbored',
      },
      {
        title: 'patients',
        icon: 'pi pi-users',
        link: '/patients',
      },
      {
        title: 'appointments',
        icon: 'fas fa-calendar-check',
        link: '/appointments',
      },
      {
        title: 'invoices',
        icon: 'fas fa-file-invoice',
        link: '/invoices',
      },
      {
        title: 'signOut',
        icon: 'pi pi-sign-out',
        link: '#',
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
    this.showLabel.set(true);
    this.#document.documentElement.style.setProperty(
      '--sidebar-width',
      '250px'
    );
  }
  closeSidebar() {
    this.showLabel.set(false);
    this.#document.documentElement.style.setProperty('--sidebar-width', '4rem');
  }
}
