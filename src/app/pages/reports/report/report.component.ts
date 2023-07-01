import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvancedReportQuestion } from '@models/reports/advanced-report-question';
import { Report } from '@models/reports/report';
import { ReportManagerService } from '@services/report-manager.service';
import { convertReportToAdvancedReport } from 'src/app/shared/utils/advance-report';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    report: Report<AdvancedReportQuestion> | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private reportManager: ReportManagerService,
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];

        const report = this.reportManager.getReport(id);

        if (!report) {
            return
        }

        this.report = convertReportToAdvancedReport(report);
    }

    onLeave() {
        this.router.navigate(['/']);
    }
}
