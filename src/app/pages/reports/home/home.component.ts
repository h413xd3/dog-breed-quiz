import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteReportComponent } from '@components/dialogs/delete-report/delete-report.component';
import { AdvancedReportQuestion } from '@models/reports/advanced-report-question';
import { Report } from '@models/reports/report';
import { TranslateService } from '@ngx-translate/core';
import { ReportManagerService } from '@services/report-manager.service';
import { convertAdvancedReportToReport, convertReportToAdvancedReport } from 'src/app/shared/utils/advance-report';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    reports: Report<AdvancedReportQuestion>[] = [];

    constructor(
        private translate: TranslateService,
        private reportManager: ReportManagerService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) { }

    #loadReports(): void {
        const reports = this.reportManager.getReports();

        this.reports = reports
            .map(report => convertReportToAdvancedReport(report))
            .sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    ngOnInit(): void {
        this.#loadReports();
    }

    onDeleteReport(report: Report<AdvancedReportQuestion>): void {
        const dialogRef: MatDialogRef<DeleteReportComponent> = this.dialog.open(DeleteReportComponent, {
            width: '600px',
            data: {},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }

            this.reportManager.deleteReport(report.id);

            this.#loadReports();

            this.snackBar.open(
                this.translate.instant('pages.reports.home.snackbar.title'),
                this.translate.instant('global.cancel'),
                {
                    duration: 5000,
                },
            ).onAction().subscribe(() => {
                this.reportManager.saveReport(convertAdvancedReportToReport(report));
                this.#loadReports();
            });
        });
    }

}
