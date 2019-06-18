import { NgModule } from '@angular/core';
import { AngularDataTableComponent } from './angular-data-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionControlService } from './services/question-control.service';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
@NgModule({
  declarations: [AngularDataTableComponent, DynamicFormQuestionComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AngularDataTableComponent],
  providers: [QuestionControlService]
})
export class AngularDataTableModule { }
