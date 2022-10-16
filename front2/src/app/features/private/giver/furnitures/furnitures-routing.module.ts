import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyFurnitureComponent } from './my-furnitures/MyFurnitures.component';
import { AddFurnitureFormComponent } from './add-furniture/addFurniture-form.component';
import { UpdateFurnitureFormComponent } from './update-furniture/updateFurniture-form.component';
import { TakerFurnitureComponent } from './taker-furnitures/TakerFurnitures.component';
import { AllDemandComponent } from '../demands/all-demands/allDemands.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'myfurnitures', component: MyFurnitureComponent },
      { path: 'addfurniture', component: AddFurnitureFormComponent },
      { path: 'updatefurniture/:id', component: UpdateFurnitureFormComponent },
      { path: 'takerfurnitures', component: TakerFurnitureComponent },
      { path: 'request', component: AllDemandComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FurnitureRoutingModule {}
