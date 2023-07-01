import { Dog } from './dog';
import { Question } from './question';

export interface Answer {
    id: number;
    question: Question;
    answer: Dog | null;
    duration: number;
}
