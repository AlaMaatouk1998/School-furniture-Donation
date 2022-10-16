import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './abnormal/not-found/not-found.component';
import { FeaturesComponent } from './features.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'form',
        loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
      },
      {
        path: 'furniture',
        loadChildren: () => import('./private/giver/furnitures/furniture.module').then((m) => m.FurnitureModule),
      },
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then((m) => m.ListModule),
      },
      {
        path: 'abnormal',
        loadChildren: () => import('./abnormal/abnormal.module').then((m) => m.AbnormalModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./private/user/user.module').then((m) => m.UserModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
