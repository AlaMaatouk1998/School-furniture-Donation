import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthService } from './services/auth/auth.service';
import { CourseData } from './data/course';
import { CourseService } from './mock/course.service';
import { MockDataModule } from './mock/mock-data.module';
import { GanttData } from './data/gantt';
import { GanttDataService } from './mock/gantt-data.service';
import { ListData } from './data/listData';
import { ListDataService } from './mock/list-data.service';
import { PersonalizeService } from './services/personalize.service';
import { WorkItemData } from './data/workItem';
import { WorkItemService } from './mock/work-item.service';
import { WorkGroupData } from './data/work-group';
import { WorkGroupService } from './mock/work-group.service';
import { AuthGuardService } from './services/auth-guard-service.guard';
import { CustomThemeService } from './services/custom-theme.service';
import { NoticeData } from './data/noticeData';
import { NoticeDataService } from './mock/notice-data.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FurnitureService } from './services/furniture/furniture.service';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { MessagingService } from './services/messaging.service';
import { environment } from 'src/environments/environment';
import { AsyncPipe } from '../../..//node_modules/@angular/common';
const DATA_SERVICES = [
  { provide: CourseData, useClass: CourseService },
  { provide: GanttData, useClass: GanttDataService },
  { provide: ListData, useClass: ListDataService },
  { provide: WorkItemData, useClass: WorkItemService },
  { provide: WorkGroupData, useClass: WorkGroupService },
  { provide: NoticeData, useClass: NoticeDataService },
];

export const DEVUI_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers!,
  ...DATA_SERVICES,
  AuthService,
  PersonalizeService,
  AuthGuardService,
  CustomThemeService,
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...DEVUI_CORE_PROVIDERS, MessagingService, AsyncPipe],
    };
  }
}
