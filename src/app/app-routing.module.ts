import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@pages/home/home.component';
import { QuizComponent } from '@pages/quiz/quiz.component';
import { HomeComponent as HomeReportComponent } from '@pages/reports/home/home.component';
import { ReportComponent } from '@pages/reports/report/report.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'quiz',
        component: QuizComponent,
    },
    {
        path: 'reports',
        component: HomeReportComponent,
    },
    {
        path: 'reports/:id',
        component: ReportComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
