import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmCardComponent } from './Pages/CreditCard/adm-card.component';
import { LoginComponent } from './Pages/Login/login.component';
import { RegisterComponent } from './Pages/Register/register.component';

const routes: Routes = [
  { path: 'home', component: LoginComponent },
  { path: 'admcard', component: AdmCardComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
