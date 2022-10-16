import { Component, OnInit, Renderer2 } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { DrawerService, IDrawerOpenResult } from 'ng-devui/drawer';
import { Subject } from 'rxjs';
import { SideSettingsComponent } from '../@shared/components/side-settings/side-settings.component';
import { PersonalizeComponent } from '../@shared/components/personalize/personalize.component';
import { PersonalizeService } from '../@core/services/personalize.service';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { DaLayoutConfig, DaLayoutService } from '../@shared/layouts/da-layout';
import getMenu from './menu';
import { DaScreenMediaQueryService } from '../@shared/layouts/da-grid';
import { takeUntil } from 'rxjs/operators';
import { SideMenuComponent } from '../@shared/components/side-menu/side-menu.component';
import { Theme } from 'ng-devui/theme';
import { Store } from '@ngrx/store';
import { AppState } from '../@core/state/app.state';
import { selectRole } from '../@core/state/auth/auth.selector';
import { AuthService } from '../@core/services/auth/auth.service';

@Component({
  selector: 'da-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  private destroy$ = new Subject();

  menu: any;
  role: string;

  layoutConfig: DaLayoutConfig = { id: 'sidebar', sidebar: {} };
  isSidebarShrink: boolean = false;
  isSidebarFold: boolean = false;

  settingDrawer: any;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private drawerService: DrawerService,
    private dialogService: DialogService,
    private personalizeService: PersonalizeService,
    private layoutService: DaLayoutService,
    private translate: TranslateService,
    private mediaQueryService: DaScreenMediaQueryService,
    private render2: Renderer2
  ) {
    this.role = '';
    this.personalizeService.initTheme();
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: DaLayoutConfig) => {
        this.layoutConfig = config;
        this.isSidebarShrink = !!this.layoutConfig.sidebar.shrink;
      });

    this.mediaQueryService
      .getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint, change, compare }) => {
        /* ml：sidebar shrink breakpoint */
        if (change <= 0 && compare['ml'] <= 0) {
          this.sidebarShrink(true);
        } else if (change >= 0 && compare['ml'] > 0) {
          this.sidebarShrink(false);
        }

        /* mm：sidebar hidden breakpoint */
        if (change <= 0 && compare['mm'] <= 0) {
          this.sidebarFold(true);
        } else if (change >= 0 && compare['mm'] > 0) {
          this.sidebarFold(false);
        }
      });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) this.role = this.authService.getUserIdFromToken(token);

    this.translate
      .get('page')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.updateMenu(res);
      });

    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: TranslationChangeEvent) => {
      const values = this.translate.instant('page');
      this.updateMenu(values);
    });
    this.personalizeService.getUiTheme()!.subscribe((theme) => {
      const currentTheme = Object.values((window as { [key: string]: any })['devuiThemes']).find((i: Theme | unknown) => {
        return (i as Theme).id === theme;
      });
      if (currentTheme && (<any>currentTheme).isDark) {
        this.render2.addClass(document.body, 'is-dark');
      } else {
        this.render2.removeClass(document.body, 'is-dark');
      }
    });
  }

  updateMenu(values: any) {
    if (this.role === 'giver') {
      this.menu = [
        {
          title: values['dashboard']['title'],
          children: [
            {
              title: values['dashboard']['analysis'],
              link: '/pages/dashboard/',
            },
            {
              title: values['dashboard']['monitor'],
              link: '/pages/dashboard/monitor',
            },
            {
              title: values['dashboard']['workspace'],
              link: '/pages/dashboard/workspace',
            },
          ],
          link: '/pages/dashboard',
          menuIcon: 'icon icon-console',
        },
        {
          title: 'My furniture',

          link: '/pages/furniture/myfurnitures',
          menuIcon: 'icon icon-modify',
        },
        {
          title: 'Furniture Request',

          link: '/pages/furniture/request',
          menuIcon: 'icon icon-modify',
        },
        {
          title: 'Add furniture +',

          link: '/pages/furniture/addfurniture',
          menuIcon: 'icon icon-modify',
        },
      ];
    } else if (this.role === 'taker') {
      this.menu = [
        {
          title: 'Consult furniture',

          link: '/pages/furniture/takerfurnitures',
          menuIcon: 'icon icon-modify',
        },
      ];
    } else if (this.role === 'admin') {
      console.log('its admin');
      this.menu = [
        {
          title: values['dashboard']['title'],
          children: [
            {
              title: values['dashboard']['analysis'],
              link: '/pages/dashboard/',
            },
            {
              title: values['dashboard']['monitor'],
              link: '/pages/dashboard/monitor',
            },
            {
              title: values['dashboard']['workspace'],
              link: '/pages/dashboard/workspace',
            },
          ],
          link: '/pages/dashboard',
          menuIcon: 'icon icon-console',
        },
        {
          title: values['form']['title'],
          children: [
            {
              title: values['form']['basicForm'],
              link: '/pages/form/basic-form',
            },
            {
              title: values['form']['formLayout'],
              link: '/pages/form/form-layout',
            },
            {
              title: values['form']['advancedForm'],
              link: '/pages/form/advanced-form',
            },
            {
              title: values['form']['dynamicForm'],
              link: '/pages/form/dynamic-form',
            },
          ],
          link: '/pages/form',
          menuIcon: 'icon icon-modify',
        },
        {
          title: values['list']['title'],
          children: [
            { title: values['list']['basicList'], link: '/pages/list/basic' },
            { title: values['list']['cardList'], link: '/pages/list/card' },
            {
              title: values['list']['editableList'],
              link: '/pages/list/editable',
            },
            { title: values['list']['advanceList'], link: '/pages/list/advance' },
            { title: values['list']['treeList'], link: '/pages/list/tree' },
          ],
          link: '/pages/list',
          menuIcon: 'icon icon-table',
        },
        {
          title: values['abnormal']['title'],
          children: [
            { title: '403', link: '/pages/abnormal/abnormal403' },
            { title: '404', link: '/pages/abnormal/abnormal404' },
            { title: '500', link: '/pages/abnormal/abnormal500' },
          ],
          link: '/pages/abnormal',
          menuIcon: 'icon icon-unload',
        },
        {
          title: values['user']['title'],
          children: [
            { title: values['user']['center'], link: '/pages/user/center' },
            { title: values['user']['settings'], link: '/pages/user/settings' },
          ],
          link: '/pages/user',
          menuIcon: 'icon icon-mine',
        },
      ];
    }
  }

  openSideMenuDrawer() {
    this.drawerService.open({
      drawerContentComponent: SideMenuComponent,
      width: '240px',
      position: 'left' /* TODO: if destroyOnHide is false, there has some problem, waiting ng-devui bug fix*/,
      // destroyOnHide: false,
      data: {
        data: this.menu,
      },
    });
  }

  openSettingDrawer() {
    if (this.settingDrawer) {
      this.settingDrawer.drawerInstance.show();
    } else {
      this.settingDrawer = this.drawerService.open({
        drawerContentComponent: SideSettingsComponent,
        width: '350px',
        destroyOnHide: false,
        data: {
          close: () => {
            this.settingDrawer.drawerInstance.hide();
          },
        },
      });
    }
  }

  personalizeConfig() {
    this.dialogService.open({
      id: 'theme',
      width: '800px',
      maxHeight: '800px',
      title: '',
      content: PersonalizeComponent,
      backdropCloseable: true,
      draggable: false,
      onClose: () => {},
      buttons: [],
    });
  }

  sidebarShrink(isShrink: boolean) {
    this.isSidebarShrink = isShrink;

    if (this.layoutConfig.sidebar.firSidebar) {
      this.layoutConfig.sidebar.firSidebar.width = this.isSidebarShrink ? 54 : 240;
    }
    this.layoutConfig.sidebar.shrink = this.isSidebarShrink;
    this.layoutService.updateLayoutConfig(this.layoutConfig);
  }

  sidebarFold(isFold: boolean) {
    this.isSidebarFold = isFold;

    if (this.layoutConfig.sidebar.firSidebar) {
      this.layoutConfig.sidebar.firSidebar.hidden = isFold;
      this.layoutService.updateLayoutConfig(this.layoutConfig);
    }
  }

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.settingDrawer.drawerInstance.destroy();
    this.settingDrawer = null;
  }
}
