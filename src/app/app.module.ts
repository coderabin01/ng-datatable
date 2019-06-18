import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DatatableComponent } from './datatable/datatable.component';
import { AngularDataTableModule } from 'projects/angular-data-table/src/public_api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularDataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
