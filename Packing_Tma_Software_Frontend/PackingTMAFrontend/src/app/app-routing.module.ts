import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AuthGuard } from './auth.guard';
import { Addha2partComponent } from './addha2part/addha2part.component';
import { AddLu01a1Component } from './add-lu01a1/add-lu01a1.component';

const routes: Routes = [
  { path: '', component: AddCustomerComponent },
  { path: 'add-customer', component: AddCustomerComponent},
  { path: 'add-customerHA2', component: Addha2partComponent},
  { path: 'add-customerlu01a1', component: AddLu01a1Component},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
