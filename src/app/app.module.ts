import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './Pages/Login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './Shared/header.component';
import { FooterComponent } from './Shared/footer.component';
import { AdmCardComponent } from './Pages/CreditCard/adm-card.component';
import { RegisterComponent } from './Pages/Register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AdmCardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
