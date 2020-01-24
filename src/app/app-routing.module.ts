import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductsComponent} from "./dashboard/products/products.component";


const routes: Routes = [
  { path: ':token', redirectTo: '/dashboard/:token', pathMatch: 'full' },
  { path: 'dashboard/:token', component: DashboardComponent },
  { path: 'products/:token', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
