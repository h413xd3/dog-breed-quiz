import { Dog } from './dog';

export interface Question {
    id: number;
    options: Dog[];
    answer: Dog;
}
