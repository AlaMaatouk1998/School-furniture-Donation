import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { LANGUAGES } from 'src/config/language-config';
import { User, UserRole } from '../../../../@core/models/user.model';
import { I18nService } from 'ng-devui/i18n';
import { switchMap, tap, map, catchError } from 'rxjs/operators';

import { UserService } from 'src/app/@core/services/user/user.service';

@Component({
  selector: 'da-header-operation',
  templateUrl: './header-operation.component.html',
  styleUrls: ['./header-operation.component.scss'],
})
export class HeaderOperationComponent implements OnInit {
  name: string;
  user: User;
  languages = LANGUAGES;
  language: string;
  haveLoggedIn = false;
  noticeCount: number;

  constructor(
    private route: Router,
    private userService: UserService,
    private authService: AuthService,
    private translate: TranslateService,
    private i18n: I18nService
  ) {
    this.noticeCount = 0;
    this.language = '';
    this.name = '';
    this.user = {
      id: 0,
      name: '',
      username: '',
      email: '',
      password: '',
      role: UserRole.ADMIN,
      profileImage: '',
    };
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      const id = this.authService.getUserId();
      this.userService
        .findOne(id)
        .pipe(
          tap((u: User) => {
            this.user = u;
            if (u.name) this.name = u.name;
          })
        )
        .subscribe();
      this.haveLoggedIn = true;
    } else {
      this.authService.login('Admin', 'Devui.admin').subscribe((res) => {
        this.authService.setSession(res.token);
        this.user = JSON.parse(localStorage.getItem('userinfo')!);
        this.haveLoggedIn = true;
      });
    }
    this.language = this.translate.currentLang;
  }

  onSearch(event: any) {
    console.log(event);
  }

  onLanguageClick(language: string) {
    this.language = language;
    localStorage.setItem('lang', this.language);
    this.i18n.toggleLang(this.language);
    this.translate.use(this.language);
  }

  handleUserOps(operation: string) {
    switch (operation) {
      case 'logout': {
        this.haveLoggedIn = false;
        this.authService.logout();
        this.route.navigate(['/', 'login']);
        break;
      }
      default:
        break;
    }
  }

  handleNoticeCount(event: number) {
    this.noticeCount = event;
  }
}
