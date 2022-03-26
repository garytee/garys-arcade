import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http-service/http.service';
import { UiService } from './ui-service/ui.service';

/** providers can only be instantiated once */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HttpService,
    UiService
  ]
})
export class CoreModule { }
