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
import { IncidentsComponent } from './components/incidents/incidents.component';
import { ApplicationSummaryComponent } from './components/application-summary/application-summary.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { HealthGuageComponent } from './components/health-guage/health-guage.component';
import { TextSearchPipe } from './text-search.pipe';

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
    IncidentsComponent,
    ApplicationSummaryComponent,
    AreaChartComponent,
    HealthGuageComponent,
    TextSearchPipe
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
