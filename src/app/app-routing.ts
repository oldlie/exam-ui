import { NgModule } from '@angular/core';
import { RouterModule, } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { PageNoteFoundComponent } from './page/page-note-found/page-note-found.component';
import { AdminDashboardComponent } from './page/admin/admin-dashboard/admin-dashboard.component';
import { AdminPaperDetailComponent } from './page/admin/admin-paper-detail/admin-paper-detail.component';
import { AdminHomeComponent } from './page/admin/admin-home/admin-home.component';
import { RandomComponent } from './page/random/random.component';
import { PaperComponent } from './page/paper/paper.component';

const appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'admin/paper/preview', component: AdminPaperDetailComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent },
    { path: 'admin', component: AdminHomeComponent },
    { path: 'paper', component: PaperComponent},
    { path: 'random', component: RandomComponent },
    { path: '**', component: PageNoteFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
