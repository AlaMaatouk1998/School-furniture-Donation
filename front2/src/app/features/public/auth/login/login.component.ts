import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DValidateRules } from 'ng-devui';
import { FormLayout } from 'ng-devui';
import { I18nService } from 'ng-devui/i18n';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { PersonalizeService } from 'src/app/@core/services/personalize.service';
import { LANGUAGES } from 'src/config/language-config';
import { environment } from 'src/environments/environment';
import { ThemeType } from 'src/app/@core/models/theme';
import { AppState } from 'src/app/@core/state/app.state';
import { selectLoginError, selectRole, selectToken } from 'src/app/@core/state/auth/auth.selector';
import { selectUser } from 'src/app/@core/state/auth/auth.selector';
import { Store } from '@ngrx/store';
import * as AuthActions from 'src/app/@core/state/auth/auth.actions';
import { User, UserRole } from 'src/app/@core/models/user.model';
import { MessagingService } from 'src/app/@core/services/messaging.service';
@Component({
  selector: 'da-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private destroy$ = new Subject();

  horizontalLayout: FormLayout = FormLayout.Horizontal;
  message: BehaviorSubject<null> | undefined;
  tabActiveId: string | number = 'tab1';
  showPassword = false;
  errorMessage: any;
  x: string;
  tabItems: any;
  language: string;
  i18nValues: any;
  toastMessage: any;
  languages = LANGUAGES;

  formData = {
    userAccount: 'Admin',
    userAccountPassword: 'DevUI.admin',
    userEmail: 'admin@devui.com',
    userEmailPassword: 'devuiadmin',
  };

  formRules: { [key: string]: DValidateRules } = {
    usernameRules: {
      validators: [
        { required: true },
        { minlength: 3 },
        { maxlength: 20 },
        {
          pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/,
          message: 'The user name cannot contain characters except uppercase and lowercase letters.',
        },
      ],
    },
    emailRules: {
      validators: [{ required: true }, { email: true }],
    },
    passwordRules: {
      validators: [{ required: true }, { minlength: 6 }, { maxlength: 15 }, { pattern: /^[a-zA-Z0-9\d@$!%*?&.]+(\s+[a-zA-Z0-9]+)*$/ }],
      message: 'Enter a password that contains 6 to 15 digits and letters.',
    },
  };

  @HostListener('window:keydown.enter')
  onEnter() {
    this.onClick(this.tabActiveId);
  }

  constructor(
    private messagingService: MessagingService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private translate: TranslateService,
    private i18n: I18nService,
    private personalizeService: PersonalizeService
  ) {
    this.language = this.translate.currentLang;
    this.x = 'rr';
  }

  ngOnInit(): void {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    this.store.select(selectLoginError).subscribe((v) => {
      this.errorMessage = v;
    });
    this.translate
      .get('loginPage')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.i18nValues = this.translate.instant('loginPage');
        this.updateTabItems(res);
      });

    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: TranslationChangeEvent) => {
      this.i18nValues = this.translate.instant('loginPage');
      this.updateTabItems(this.i18nValues);
    });
    this.personalizeService.setRefTheme(ThemeType.Default);

    // oauth认证回调
    this.route.queryParams.pipe(map((param) => param.code)).subscribe((code) => {
      if (code && code.length > 0) {
        setTimeout(() => {
          this.toastMessage = [
            {
              severity: 'success',
              content: this.i18nValues['callbackMessage'],
            },
          ];
        });
      }
    });
  }
  // onClick(tabId: string | number) {
  //   switch (tabId) {
  //     case 'tab1':
  //       console.log(this.errorMessage);
  //       this.authService.login(this.formData.userAccount, this.formData.userAccountPassword).subscribe(
  //         (res) => {
  //           this.authService.setSession(res);
  //           this.router.navigate(['/']);
  //         },
  //         (error) => {
  //           this.toastMessage = [this.errorMessage];
  //         }
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  // }
  onClick(tabId: string | number) {
    switch (tabId) {
      // case 'tab1':
      //   this.store.dispatch(AuthActions.loginRequest({ email: this.formData.userEmail, password: this.formData.userEmailPassword }));
      //   this.store.select(selectLoginError).subscribe((msgError) => {
      //     this.toastMessage = msgError;
      //   });
      //   this.store.select(selectToken).subscribe((v) => {
      //     this.authService.setSession(v);
      //   });

      //   break;
      case 'tab2':
        this.store.dispatch(AuthActions.loginRequest({ email: this.formData.userEmail, password: this.formData.userEmailPassword }));
        this.store.select(selectLoginError).subscribe((msgError) => {
          this.toastMessage = msgError;
          console.log(this.toastMessage);
        });
        this.store.select(selectToken).subscribe((v) => {
          this.authService.setSession(v);
        });
        this.store.select(selectRole).subscribe((v) => {
          console.log(v);
        });
        break;
      default:
        break;
    }
  }
  onLanguageClick(language: string) {
    this.language = language;
    localStorage.setItem('lang', this.language);
    this.i18n.toggleLang(this.language);
    this.translate.use(this.language);
  }

  updateTabItems(values: any) {
    this.tabItems = [
      {
        id: 'tab1',
        title: values['loginWays']['account'],
      },
      {
        id: 'tab2',
        title: values['loginWays']['email'],
      },
    ];
  }

  onKeyUp(e: KeyboardEvent, tabId: string | number) {
    if (e.keyCode === 13) {
      this.onClick(tabId);
    }
  }

  handleAuth(type: string) {
    console.log(type);
    //github oauth配置
    const config = {
      oauth_uri: 'https://github.com/login/oauth/authorize',
      redirect_uri: 'https://devui.design/admin/login',
      client_id: 'ef3ce924fcf915c50910',
    };
    if (!environment.production) {
      config.redirect_uri = 'http://localhost:8001/login';
      config.client_id = 'ecf5e43d804e8e003196';
    }
    window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`;
  }
}
