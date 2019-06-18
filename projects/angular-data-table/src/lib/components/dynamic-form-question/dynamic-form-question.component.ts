import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from 'projects/angular-data-table/src/lib/models/question-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
  
  constructor() { }

  ngOnInit() {
  }

}
