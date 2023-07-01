import { Report } from '@models/reports/report';
import { AdvancedReportQuestion } from '@models/reports/advanced-report-question';
import { BasicReport } from '@models/reports/basic-report';
import { ReportQuestion } from '@models/reports/report-question';
import { findDogById } from './dogs';
import { Dog } from '@models/dog';

function convertReportQuestionToAdvanced(
    question: ReportQuestion
): AdvancedReportQuestion {
    return {
        id: question.id,
        question: findDogById(question.question) as Dog,
        options: question.options.map(option => findDogById(option) as Dog),
        answer: question.answer >= 0 ? findDogById(question.answer) as Dog : null,
        duration: question.duration,
    };
}

export function convertReportToAdvancedReport(
    report: BasicReport,
): Report<AdvancedReportQuestion> {
    return {
        id: report.id,
        score: report.score,
        questions: report.questions.map(
            question => convertReportQuestionToAdvanced(question),
        ),
        date: report.date,
    };
}

function convertAdvancedReportQuestionToReportQuestion(
    question: AdvancedReportQuestion,
): ReportQuestion {
    return {
        id: question.id,
        question: question.question.id,
        options: question.options.map(option => option.id),
        answer: question.answer ? question.answer.id : -1,
        duration: question.duration,
    };
}

export function convertAdvancedReportToReport(
    report: Report<AdvancedReportQuestion>,
): BasicReport {
    return {
        id: report.id,
        score: report.score,
        questions: report.questions.map(
            question => convertAdvancedReportQuestionToReportQuestion(question),
        ),
        date: report.date,
    };
}