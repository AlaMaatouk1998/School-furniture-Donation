import { ModuleWithProviders, NgModule } from '@angular/core';
// ligne to separate plEASE
import { DialogService, BackTopModule } from 'ng-devui';
import { SharedModule } from '../@shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { DaLayoutModule } from '../@shared/layouts/da-layout';

import { AuthModule } from './public/auth/auth.module';

import { FurnitureModule } from './private/giver/furnitures/furniture.module';

const MODULES = [AuthModule, FurnitureModule];
@NgModule({
  imports: [FeaturesRoutingModule, SharedModule, BackTopModule, DaLayoutModule, ...MODULES],
  declarations: [FeaturesComponent],
  providers: [DialogService],
})
export class FeaturesModule {}
