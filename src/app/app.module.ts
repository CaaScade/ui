import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SidebaarComponent } from './components/sidebaar/sidebaar.component';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppMaterialModule } from './modules/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingComponent } from './components/setting/setting.component';
import { ClusterComponent } from './components/cluster/cluster.component';
import { AppStoreComponent } from './components/app-store/app-store.component';
import { ApplicationSummaryComponent } from './components/application-summary/application-summary.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { HealthGuageComponent } from './components/health-guage/health-guage.component';
import { TextSearchPipe } from './text-search.pipe';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { MultiLineChartComponent } from './components/multi-line-chart/multi-line-chart.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';
import { AppLaunchDialogComponent } from './components/common_components/app-launch-dialog/app-launch-dialog.component';
import {DialogsService} from './services/dialog-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidebaarComponent,
    DashboardComponent,
    SettingComponent,
    ClusterComponent,
    AppStoreComponent,
    ApplicationSummaryComponent,
    AreaChartComponent,
    HealthGuageComponent,
    TextSearchPipe,
    PieChartComponent,
    MultiLineChartComponent,
    DashboardChartComponent,
    AppLaunchDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [AppLaunchDialogComponent],
  providers: [DialogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
