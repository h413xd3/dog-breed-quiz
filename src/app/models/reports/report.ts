import { ReportQuestion } from './report-question';

export interface Report<RQ> {
    id: string;
    score: number;
    questions: RQ[];
    date: Date;
}