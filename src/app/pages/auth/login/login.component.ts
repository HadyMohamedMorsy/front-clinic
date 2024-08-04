import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  AlertService,
  AuthService,
  FormComponent,
  LoginModel,
  SectionTitleComponent,
  constants,
} from '@shared';
import { MessageModule } from 'primeng/message';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MessageModule,
    TranslateModule,
    RouterLink,
    FormComponent,
    SectionTitleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  #activatedRoute = inject(ActivatedRoute);
  #authService = inject(AuthService);
  #alert = inject(AlertService);
  #router = inject(Router);
  #translate = inject(TranslateService);
  #destroyRef = inject(DestroyRef); // Current "context" (this component)

  returnUrl!: string;
  loading = signal(false);
  model: LoginModel = {} as LoginModel;
  loginForm = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        required: true,
        placeholder: this.#translate.instant(_('example@gmail.com')),
      },
    },
    {
      key: 'password',
      type: 'password-field',
      props: {
        required: true,
        placeholder: '********',
        toggleMask: true,
        minLength: constants.MIN_LENGTH_TEXT_INPUT,
      },
    },
  ];

  ngOnInit(): void {
    // the queryParams observable is used to get the value of the returnUrl and state parameters from the AuthGuard.
    this.#activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((params) => {
        this.returnUrl =
          params['returnUrl'] || constants.LOGIN_SUCCESS_REDIRECT_URL;
        this.#alert.showMsg('error', params['message'] ?? '');
      });
  }

  login(): void {
    if (this.loginForm.invalid) return; // return early
    this.loading.set(true);
    this.#authService
      .login(this.model)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.#router.navigateByUrl(this.returnUrl);
        },
      });
  }
}
