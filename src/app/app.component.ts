import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { QuestionBase } from '../../projects/angular-data-table/src/lib/models/question-base';
import { TextboxQuestion } from '../../projects/angular-data-table/src/lib/models/question-textbox';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularDataTableLibrary';

  constructor(
    private httpClient: HttpClient
  ) {}

  questions: any;
  ngOnInit() {
    this.questions = this.getQuestions();
    this.getEmployeeIncomeCode();
    this.getPayPeriod();    
  }


  getQuestions() {

    let questions: QuestionBase<any>[] = [

      // new DropdownQuestion({
      //   key: 'brave',
      //   label: 'brave',
      //   options: [
      //     {key: 'solid',  value: 'Solid'},
      //     {key: 'great',  value: 'Great'},
      //     {key: 'good',   value: 'Good'},
      //     {key: 'unproven', value: 'Unproven'}
      //   ],
      //   order: 4
      // }),

      new TextboxQuestion({
        sort: true,
        search: true,
        key: 'class1',
        label: 'Class One',
        required: true,
        order: 1,
        validators : [{type: 'emailPattern', regex: '/[/s]/', displayValue: 'Email'}],
      }),

      new TextboxQuestion({
        sort: false,
        search: false,
        key: 'Class2',
        label: 'Class Two',
        required: true,
        order: 3
      }),

      new TextboxQuestion({
        sort: false,
        search: false,
        key: 'Class3',
        label: 'Class Three',
        type: 'email',
        order: 3
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  employeeIncomeForm = [
    new TextboxQuestion({
      sort: true,
      search: true,
      key: 'income_code',
      label: 'Income Code',
      required: true,
      order: 1
    }),   
    new TextboxQuestion({
      sort: true,
      search: true,
      key: 'description',
      label: 'Description',
      required: true,
      order: 2
    }), 
  ]

  employeeDisplayColumns = [
    {
      displayHeader: "Income Code",    
      value: "income_code",
      sort: true,
      search: true
    },
    {
      displayHeader: "Description",    
      value: "description",
      sort: true,
      search: true
    }
  ]

  payPeriodForm = [
    new TextboxQuestion({
      key: 'pay_period',
      label: 'Pay Period',
      required: true,
      order: 1
    }),    
  ]

  payPeriodDisplayColumns = [
    {
      displayHeader: "Pay Period",    
      value: "pay_period",
      sort: true,
      search: true
    } 
  ]

  sampleData = [
    {id: 1, name: "a"},
    {id: 2, name: "b"},
    {id: 5, name: "c"},
    {id: 6, name: "f"},
    {id: 4, name: "e"},
    {id: 3, name: "d"},
    {id: 7, name: "g"},
    {id: 8, name: "h"}
  ];
  color: any = 'DarkRed';

  // employeeIncomeCode = [];
  // employeeIncomeCode = [{"id":8,"income_code":"Retirement Income","description":"Retirement Income"},{"id":9,"income_code":"401K","description":"401K Retirement Income"},{"id":10,"income_code":"Pension Benefit","description":"Pension Income"},{"id":11,"income_code":"Reimbursement","description":"Reimbursement Income"},{"id":12,"income_code":"Misc. Income","description":"Miscellaneous Income"},{"id":13,"income_code":"test1","description":"test1"},{"id":14,"income_code":"test2","description":"test2"}];

  data =
    [
      { class1: 'A', Class2: 1, Class3: 'Abin Nala', Class4: 1, Class5: 'ABC' },
      { class1: 'B', Class2: 2, Class3: 'Sabin Suwal', Class4: 1, Class5: 'ABC' },
      { class1: 'C', Class2: 3, Class3: 'Rabin Naga', Class4: 1, Class5: 'ABC' },
      { class1: 'D', Class2: 4, Class3: 'Kabin', Class4: 1, Class5: 'ABC' },
      { class1: 'E', Class2: 5, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 6, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 7, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 1, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 1, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 1, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 1, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 1, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 1, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 1, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 1, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 1, Class3: 'ABC', Class4: 1, Class5: 'ABC' },
      { class1: 'A', Class2: 1, Class3: 'Abin', Class4: 1, Class5: 'ABC' },
      { class1: 'B', Class2: 2, Class3: 'Sabin', Class4: 1, Class5: 'ABC' },
      { class1: 'C', Class2: 3, Class3: 'Rabin', Class4: 1, Class5: 'ABC' },
      { class1: 'D', Class2: 4, Class3: 'Kabin', Class4: 1, Class5: 'ABC' }
    ];
    // color = 'Black';
    dataPerPage = 5;  
    dataPerPage2 = 10;

    onDelete(event) {
      console.log('on delete from app', event);
    }

    onUpdate(event) {
      console.log('on update from app', event);
    }

    employeeLoading: boolean;
    employeeIncomeCode: any;
    getEmployeeIncomeCode() {
      this.employeeLoading = true;
      this.httpClient.get(`http://192.168.1.81:8080/simpliflysaas/api/web/v1/employee-income-code`)
      .subscribe((response: any) => {
        console.log(response);
        if (response && response.status) {
          this.employeeIncomeCode = response.data;
        }
      }, (error) => {
        console.log(error);
        this.employeeLoading = false;
      }, () => {
        this.employeeLoading = false;
      })
    }

    payPeriodLoading: boolean;
    payPeriod: any;
    getPayPeriod() {
      this.payPeriodLoading = true;
      this.httpClient.get(`http://192.168.1.81:8080/simpliflysaas/api/web/v1/pay-period`)
      .subscribe((response: any) => {
        console.log(response);
        if (response && response.status) {
          this.payPeriod = response.data;
        }
      }, (error) => {
        console.log(error);
        this.payPeriodLoading = false;
      }, () => {
        this.payPeriodLoading = false;
      })
    }    

    deleteEmployeeCode(id) {
      this.employeeLoading = true;
      this.httpClient.delete(`http://192.168.1.81:8080/simpliflysaas/api/web/v1/employee-income-code/${id}`)
      .subscribe((response: any) => {
        console.log(response);
        alert(response.data);        
      }, () => {

      }, () => {
        this.employeeLoading = false;
        this.getEmployeeIncomeCode();
      })
    }

    updateEmployeeCode(id, body) {
      this.employeeLoading = true;
      this.httpClient.put(`http://192.168.1.81:8080/simpliflysaas/api/web/v1/employee-income-code/${id}`, body)
      .subscribe((response: any) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      }, () => {
        this.employeeLoading = false;
        this.getEmployeeIncomeCode();
      })
    }

    onDeleteEmployeeCode(employeeIncomeCode) {
      console.log(employeeIncomeCode);
      this.deleteEmployeeCode(employeeIncomeCode.id);
    }

    onUpdateEmployeeCode(employeeIncomeCode) {
      console.log(employeeIncomeCode);
      const id = employeeIncomeCode.original_data.id;
      delete employeeIncomeCode.original_data;
      console.log(employeeIncomeCode);
      this.updateEmployeeCode(id, employeeIncomeCode);
    }
}


