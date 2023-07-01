import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from '@pages/home/home.component';
import { QuizComponent } from '@pages/quiz/quiz.component';
import { ReportComponent } from '@pages/reports/report/report.component';
import { HomeComponent as HomeReportComponent } from '@pages/reports/home/home.component';

import { QuizConfiguratorComponent } from '@components/quiz-configurator/quiz-configurator.component';
import { TimerComponent } from '@components/timer/timer.component';
import { DeleteReportComponent } from '@components/dialogs/delete-report/delete-report.component';

import { QuestionGeneratorService } from '@services/question-generator.service';
import { ReportManagerService } from '@services/report-manager.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { createTranslateLoader } from '@utils/translate';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        QuizComponent,
        ReportComponent,
        QuizConfiguratorComponent,
        TimerComponent,
        HomeReportComponent,
        DeleteReportComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            defaultLanguage: 'fr',
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        MatCardModule,
        MatFormFieldModule,
        MatSliderModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatIconModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatTooltipModule,
        MatMenuModule,
        MatSnackBarModule,
    ],
    providers: [
        QuestionGeneratorService,
        ReportManagerService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
