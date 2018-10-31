import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';

export interface AppAddons {
  name: string;
  details: string;
  price: number;
}

const ELEMENT_DATA: AppAddons[] = [
  {name: 'Bookkeeper', price: 9.99, details: 'Some description'},
  {name: 'Pulser', price: 9.00, details: 'Some description'},
  {name: 'RocksDB', price: 5.00, details: 'Some description'},{name: 'Bookkeeper', price: 9.99, details: 'Some description'},
  {name: 'Pulser', price: 9.00, details: 'Some description'},
  {name: 'RocksDB', price: 5.00, details: 'Some description'},{name: 'Bookkeeper', price: 9.99, details: 'Some description'},
  {name: 'Pulser', price: 9.00, details: 'Some description'},
  {name: 'RocksDB', price: 5.00, details: 'Some description'}
];

@Component({
  selector: 'app-app-launch-dialog',
  templateUrl: './app-launch-dialog.component.html',
  styleUrls: ['./app-launch-dialog.component.scss']
})

export class AppLaunchDialogComponent implements OnInit {

  appData: any;
  isInstalled: Boolean;
  totalPrice = 0;
  selected = 0;


  displayedColumns: string[] = ['select', 'name', 'details', 'price'];
  dataSource = new MatTableDataSource<AppAddons>(ELEMENT_DATA);
  selection = new SelectionModel<AppAddons>(true, []);

  constructor(public dialogRef: MatDialogRef<AppLaunchDialogComponent>) {
  }

  ngOnInit() {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    this.totalPrice = 0;
    for ( let i = 0; i < this.selection.selected.length; i++) {
      this.totalPrice += this.selection.selected[i].price;
    }
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.totalPrice = 0;
    } else {
      this.dataSource.data.forEach(row => {
        this.totalPrice += row.price;
        this.selection.select(row);
      });
    }
  }

  showNextTab(index: number) {
    this.selected = index;
  }

  submitConfig(data) {
    console.log(data);
  }

}
