import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCallbackComponent } from './auth-callback.component';
import { AuthCallBackRoutingModule } from './auth-callback-routing.module';



@NgModule({
  declarations: [
    AuthCallbackComponent
  ],
  imports: [
    CommonModule,
    AuthCallBackRoutingModule
  ]
})
export class AuthCallbackModule { }
