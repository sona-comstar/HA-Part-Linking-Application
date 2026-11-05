import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponentComponent } from './login-component/login-component.component';
import { FormsModule } from '@angular/forms';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Addha2partComponent } from './addha2part/addha2part.component';
import { AddLu01a1Component } from './add-lu01a1/add-lu01a1.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    AddCustomerComponent,
    Addha2partComponent,
    AddLu01a1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    QRCodeModule,
    TableModule,
    DialogModule,
    HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropdownModule,
    ToolbarModule,
    ToastModule,
    InputNumberModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService,{ provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
