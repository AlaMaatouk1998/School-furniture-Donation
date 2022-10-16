// ligne to separate plEASE
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/app/@core/state/auth/auth.effects';
import { authReducer } from 'src/app/@core/state/auth/auth.reducer';
import { appReducer } from 'src/app/@core/state/app.state';
import { DaGridModule } from 'src/app/@shared/layouts/da-grid';
import { SharedModule } from 'src/app/@shared/shared.module';
import { NgModule } from '@angular/core';
import { AllFurnitureComponent } from './all-furnitures/AllFurnitures.component';
import { DatepickerModule, InputNumberModule, PaginationModule, TagsInputModule, ToastModule, TooltipModule } from 'ng-devui';
import { AdminFormModule } from 'src/app/@shared/components/admin-form';
import { ListDataService } from './service/data-service';
import { DynamicFormsModule } from 'src/app/@shared/components/dynamic-forms';
import { FormRoutingModule } from 'src/app/features/form/form-routing.module';
import { ListRoutingModule } from 'src/app/features/list/list-routing.module';
import { FormsModule } from '@angular/forms';
import { UpdateFurnitureFormComponent } from './update-furniture/updateFurniture-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/@core/interceptors/token.interceptor';
import { FurnitureRoutingModule } from './furnitures-routing.module';
import { MyFurnitureComponent } from './my-furnitures/MyFurnitures.component';
import { AddFurnitureFormComponent } from './add-furniture/addFurniture-form.component';
import { TakerFurnitureComponent } from './taker-furnitures/TakerFurnitures.component';
import { AllDemandComponent } from '../demands/all-demands/allDemands.component';
@NgModule({
  imports: [
    FurnitureRoutingModule,
    SharedModule,
    FormRoutingModule,
    TagsInputModule,
    DynamicFormsModule,
    ToastModule,
    ListRoutingModule,
    FormsModule,
    PaginationModule,
    AdminFormModule,
    InputNumberModule,
    DatepickerModule,
    TooltipModule,
  ],
  declarations: [
    AllFurnitureComponent,
    AddFurnitureFormComponent,
    MyFurnitureComponent,
    UpdateFurnitureFormComponent,
    AllDemandComponent,
    TakerFurnitureComponent,
  ],
  providers: [ListDataService],
})
export class FurnitureModule {}
