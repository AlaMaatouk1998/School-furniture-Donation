import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {
  LayoutModule,
  AccordionModule,
  SearchModule,
  AvatarModule,
  BadgeModule,
  DropDownModule,
  FormModule,
  TabsModule,
  TextInputModule,
  ToggleModule,
  CheckBoxModule,
  ButtonModule,
  DrawerModule,
  DCommonModule,
  AlertModule,
  ToastModule,
  TooltipModule,
  RadioModule,
  CardModule,
  DataTableModule,
  BreadcrumbModule,
  TagsModule,
  SelectModule,
  LoadingModule,
  ModalModule,
} from 'ng-devui';
import { I18nModule } from 'ng-devui/i18n';
import { TranslateModule } from '@ngx-translate/core';
// ligne to separate plEASE
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/app/@core/state/auth/auth.effects';
import { authReducer } from 'src/app/@core/state/auth/auth.reducer';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { appReducer } from 'src/app/@core/state/app.state';
import { DaGridModule } from 'src/app/@shared/layouts/da-grid';
import { SharedModule } from 'src/app/@shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/@core/interceptors/token.interceptor';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent, RegisterComponent],
  providers: [],
})
export class AuthModule {}
