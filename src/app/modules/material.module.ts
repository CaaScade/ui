import { NgModule } from '@angular/core';

import {
  MatCheckboxModule,
  MatButtonModule,
  MatInputModule,
  MatRadioModule,
  MatTableModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBar,
  MatSnackBarModule,
  MatTabsModule,
  MatCardModule,
  MatSidenavModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatChipsModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatListModule
} from '@angular/material';

const moduleList = [
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatInputModule,
  MatRadioModule,
  MatDialogModule,
  MatCardModule,
  MatDialogModule,
  MatSelectModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTabsModule,
  MatSidenavModule,
  MatTabsModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatChipsModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatListModule
];


@NgModule({
  imports: moduleList,
  exports: moduleList,
  providers: [
    MatSnackBar
  ]

})
export class AppMaterialModule { }
