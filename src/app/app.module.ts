import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { PageNoteFoundComponent } from './page/page-note-found/page-note-found.component';
import { HomeComponent } from './page/home/home.component';
import { AppRoutingModule } from './app-routing';
import { AdminDashboardComponent } from './page/admin/admin-dashboard/admin-dashboard.component';
import { AdminPaperComponent } from './page/admin/admin-paper/admin-paper.component';
import { AdminPaperAddComponent } from './page/admin/admin-paper-add/admin-paper-add.component';
import { AdminPaperDetailComponent } from './page/admin/admin-paper-detail/admin-paper-detail.component';
import { AdminExamAddComponent } from './page/admin/admin-exam-add/admin-exam-add.component';
import { AdminExamComponent } from './page/admin/admin-exam/admin-exam.component';
import { AdminHomeComponent } from './page/admin/admin-home/admin-home.component';
import { RandomComponent } from './page/random/random.component';
import { PaperComponent } from './page/paper/paper.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    PageNoteFoundComponent,
    HomeComponent,
    AdminDashboardComponent,
    AdminPaperComponent,
    AdminPaperAddComponent,
    AdminPaperDetailComponent,
    AdminExamAddComponent,
    AdminExamComponent,
    AdminHomeComponent,
    RandomComponent,
    PaperComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // FroalaEditorModule
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
