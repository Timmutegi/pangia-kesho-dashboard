import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ExportType } from 'mat-table-exporter';

export interface Data {
  createdAt: Date;
}

const ELEMENT_DATA: Data[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  exportType: ExportType.XLSX;
  isLoading = true;
  minDate: Date;
  maxDate: Date;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = [
    'index',
    'church',
    'firstName',
    'lastName',
    'mobileNumber',
    'idNumber',
    'mpesaTransactionCode',
    'dateOfBirth',
    'kraPinNo',
    'gender',
    'createdAt',
    'email',
    'idPhotoFront',
    'idPhotoBack',
    'passportPhoto',
    'nextofkin',
    'spouse',
    'children'
  ];
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() {
    const fromDate = new Date(this.filterForm.get('fromDate').value);
    return fromDate;
  }
  get toDate() {
    const toDate = new Date(this.filterForm.get('toDate').value);
    toDate.setDate(toDate.getDate() + 1);
    return toDate;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getPolicyHolders();
    this.maxDate = new Date();
    this.minDate = new Date(2020, 1, 7);
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return data.createdAt >= this.fromDate && data.createdAt <= this.toDate;
      }
      return true;
    };
  }

  getPolicyHolders() {
    this.api.get('/PolicyHolders').subscribe(
      res => {
        res.forEach((element: { createdAt: string | number | Date; }) => {
          element.createdAt = new Date(element.createdAt);
        });
        console.log(res);
        this.isLoading = false;
        this.dataSource.data = res;
      }
    );
  }

  applyFilter1() {
    this.dataSource.filter = '' + Math.random();
  }

  reset() {
    this.filterForm.reset();
    this.dataSource.filter = '';
  }

  getRecord(ID: string) {
    console.log(ID);
    this.router.navigate([`details/${ID}`]);
  }
}
