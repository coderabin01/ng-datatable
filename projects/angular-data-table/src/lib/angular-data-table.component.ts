import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from './services/question-control.service';
import { QuestionBase } from 'projects/angular-data-table/src/lib/models/question-base';
import { DataTablePaginationService } from './services/data-table-pagination.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ang-data-table',
  templateUrl: './angular-data-table.component.html',
  styleUrls: ['./angular-data-table.component.css']
})
export class AngularDataTableComponent implements OnInit, OnChanges {

  @Input()
  dataSource: any;

  @Input()
  itemPerPage: any;

  @Input()
  color: any;

  @Input()
  showActionField: boolean;

  @Input()
  loading: boolean;

  @Output()
  delete: EventEmitter<any> = new EventEmitter<any>();

  @Input() tableColumns: QuestionBase<any>[] = [];

  @Output()
  update: EventEmitter<any> = new EventEmitter<any>();

  // table header properties name
  propName: any[];

  // pagination
  currentPage: any;
  totalItems: any;
  index: any = 1;
  sortOrder: boolean;
  bgColor: any = this.color ? this.color : 'Black';
  pager: any = {};   // pager object
  pagedItems: any[];

  // variables for editing & saving 
  showSaveOption: boolean;
  itemToEdit: any;

  // variables for filteration
  filteredData = [];
  originalData: any; 
  storedFilteredData: any;  // store filtered data for the next iteration  
  filter = {}; // filter object for storing single or multiple filter inputs

  constructor(
    private dataTablePaginationService: DataTablePaginationService,
    private qcs: QuestionControlService
  ) {
    this.currentPage = 1;
  }

  // inline datatable form
  form: FormGroup;
  ngOnInit() {
    // set table header color
    if (this.color) {
      this.bgColor = this.color;
    }
    this.form = this.qcs.toFormGroup(this.tableColumns);
    this.populateDataTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      this.populateDataTable();
    }
  }

  /**
   * This method initializes the data table with data
   */
  populateDataTable() {
    if (this.dataSource && this.dataSource.length > 0) {

      // copying data to reset it to the original state 
      this.originalData = this.dataSource;

      this.totalItems = this.dataSource.length;
      this.setPage(1);
    } else {
      this.propName = this.tableColumns;
    }
  }

  /**
   * This methods sorts the data
   * @param fieldName 
   * @param sortOrder 
   */
  sortDataByFieldName(fieldName: any, sortOrder: boolean) {
    if (sortOrder) {
      // for ascending order
      this.dataSource.sort((objectOne: any, objectTwo: any) => {
        if (objectOne[fieldName] < objectTwo[fieldName]) { return -1; }
        if (objectOne[fieldName] > objectTwo[fieldName]) { return 1; }
        return 0;
      });
    } else {
      // for descending order
      this.dataSource.sort((objectOne: any, objectTwo: any) => {
        if (objectOne[fieldName] > objectTwo[fieldName]) { return -1; }
        if (objectOne[fieldName] < objectTwo[fieldName]) { return 1; }
        return 0;
      });
    }
    this.setPage(this.currentPage);
  }


  filterDataByFieldName(event, fieldName) {
    this.filter[fieldName] = event.target.value;

    const filterParams = this.filter;

    // reseting storedFilteredData with original data
    this.storedFilteredData = this.originalData;

    // loop through the no of dirty search fields
    for (const key in filterParams) {
      if (filterParams.hasOwnProperty(key)) {

        // perform search only if the search field is not empty
        if (filterParams[key] != "") {
          this.filteredData = [];
          const filterText = filterParams[key].toString().toUpperCase().trim();
          this.pushToFilteredData(key, filterText);
          this.storeFilteredData();
        } else {
          delete this.filter[fieldName];
        }
      }
    }

    if (this.isEmpty(filterParams)) {
      this.dataSource = this.originalData;
      this.setPage(this.currentPage);
    }
  }

  // helper method
  isEmpty(object) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  pushToFilteredData(fieldName, filterText) {
    // performing filter on the particular field
    this.storedFilteredData.map((item) => {
      if (item[fieldName].toString().toUpperCase().indexOf(filterText) > -1) {
        this.filteredData.push(item);
      }
    });
  }

  storeFilteredData() {
    // storing filtered data for the next iteration by the next property / field in pushToFilteredData() method
    this.storedFilteredData = this.filteredData;

    // to render it on the table
    this.dataSource = this.filteredData;
    this.setPage(1);
  }


  setPage(page: number) {
    this.currentPage = page;

    this.index = 1;

    this.dataSource.forEach((element: { _index: number; }) => {
      element._index = this.index++;
    });
    // get pager object from service
    this.pager = this.dataTablePaginationService.getPager(this.dataSource.length, page, this.itemPerPage);

    // get current page of items
    this.pagedItems = this.dataSource.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // get object property name
    this.propName = this.tableColumns ? this.tableColumns : Object.getOwnPropertyNames(this.dataSource[0]);
  }

  nextPage() {
    if (this.currentPage < this.pager.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.setPage(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.setPage(this.currentPage);
    }
  }

  onEdit(item) {
    this.showSaveOption = true;
    this.itemToEdit = item;

    const obj = {};
    Object.keys(this.form.value).forEach(key => {
      obj[key] = item[key] ? item[key] : '';
    });

    this.form.setValue(obj);
  }

  onDelete(item) {
    this.delete.emit(item);
  }

  onSave(item) {
    if (this.form.valid) {
      this.showSaveOption = false;

      // it is not sure that every time we will have the id
      this.form.value.original_data = item;

      this.update.emit(this.form.value);
      console.log(this.form.value);
    }
  }

  onCancelEdit() {
    this.showSaveOption = false;
  }
}
