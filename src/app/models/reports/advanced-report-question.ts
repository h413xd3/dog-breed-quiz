import { Dog } from '@models/dog';

export interface AdvancedReportQuestion {
    id: number;
    question: Dog;
    options: Dog[];
    answer: Dog | null;
    duration: number;
}
