import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';
import { Observable, of } from 'rxjs';
import { I18N } from '../config/language-config';
import { FeaturesModule } from './features/features.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/app/@core/state/auth/auth.effects';
import { appReducer } from 'src/app/@core/state/app.state';
import { FurnituresEffects } from './@core/state/furniture/furniture.effects';
import { FurnitureCategoriesEffects } from './@core/state/furnitureCategory/furnitureCategory.effects';
import { StudyLevelsEffects } from './@core/state/studyLevel/studyLevel.effects';
import { FurnitureRequestsEffects } from './@core/state/furnitureRequest/furnitureRequest.effects';

class I18NLoader implements TranslateLoader {
  getTranslation(lang: 'zh-cn' | 'en-us'): Observable<Object> {
    return of(I18N[lang]);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, FurnituresEffects, FurnitureRequestsEffects, FurnitureCategoriesEffects, StudyLevelsEffects]),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: I18NLoader,
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
