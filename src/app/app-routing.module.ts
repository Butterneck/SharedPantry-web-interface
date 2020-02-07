import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductsComponent} from "./dashboard/products/products.component";
import {UsersComponent} from "./dashboard/users/users.component";
import {StatisticsComponent} from "./dashboard/statistics/statistics.component";
import {ProductsResolver} from "./dashboard/products/products.resolver";
import {UsersResolver} from "./dashboard/users/users.resolver";


const routes: Routes = [
  {
    path: ':token',
    redirectTo: '/dashboard/:token',
    pathMatch: 'full'
  },
  {
    path: 'dashboard/:token',
    component: DashboardComponent
  },
  {
    path: 'products/:token',
    component: ProductsComponent,
    resolve: {
      data: ProductsResolver
    }
  },
  {
    path: 'users/:token',
    component: UsersComponent,
    resolve: {
      data: UsersResolver
    }
  },
  {
    path: 'statistics/:token',
    component: StatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
