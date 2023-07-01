import { Injectable } from '@angular/core';
import { AdvancedReportQuestion } from '@models/reports/advanced-report-question';
import { BasicReport } from '@models/reports/basic-report';
import { ReportQuestion } from '@models/reports/report-question';
import { ShortReport } from '@models/reports/short-report';
import { ShortReportQuestion } from '@models/reports/short-report-question';

@Injectable({
    providedIn: 'root'
})
export class ReportManagerService {
    #storage = localStorage;
    #storageKey: string = 'quiz-reports';

    #convertReportQuestionToShortReportQuestion(
        reportQuestion: ReportQuestion,
    ): ShortReportQuestion {
        return [
            reportQuestion.id,
            reportQuestion.question,
            reportQuestion.options,
            reportQuestion.answer,
            reportQuestion.duration,
        ];
    }

    #convertShortReportQuestionToReportQuestion(
        question: ShortReportQuestion,
    ): ReportQuestion {
        question = [...question];

        return {
            id: question.shift() as number,
            question: question.shift() as number,
            options: question.shift() as number[],
            answer: question.shift() as number,
            duration: question.shift() as number,
        };
    }

    #convertReportToShortReport(report: BasicReport): ShortReport {
        return [
            report.id,
            report.score,
            report.questions.map(
                question => this.#convertReportQuestionToShortReportQuestion(question),
            ),
            report.date,
        ];
    }

    #convertShortReportToReport(report: ShortReport): BasicReport {
        report = [...report];

        return {
            id: report.shift() as string,
            score: report.shift() as number,
            questions: (report.shift() as ShortReportQuestion[]).map(
                question => this.#convertShortReportQuestionToReportQuestion(question),
            ),
            date: new Date(report.shift() as string),
        };
    }

    #loadReportsData(): string {
        return this.#storage.getItem(this.#storageKey) || '';
    }

    #saveReportsData(data: string) {
        this.#storage.setItem(this.#storageKey, data);
    }

    getReports(): BasicReport[] {
        const reportsData = this.#loadReportsData();

        if (reportsData === '') {
            return [];
        }

        const shortReports: ShortReport[] = JSON.parse(reportsData);

        return shortReports.map(
            report => this.#convertShortReportToReport(report),
        );
    }

    #saveReports(reports: BasicReport[]) {
        const shortReports = reports.map(
            report => this.#convertReportToShortReport(report),
        );

        this.#saveReportsData(JSON.stringify(shortReports));
    }

    saveReport(report: BasicReport) {
        const reports = this.getReports();

        reports.push(report);

        this.#saveReports(reports);
    }

    getReport(id: string): BasicReport | undefined {
        const reports = this.getReports();

        return reports.find(report => report.id === id);
    }

    deleteReport(id: string) {
        const reports = this.getReports();

        const index = reports.findIndex(report => report.id === id);

        if (index === -1) {
            return;
        }

        reports.splice(index, 1);

        this.#saveReports(reports);
    }
}
