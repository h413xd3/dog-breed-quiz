import { Injectable } from '@angular/core';
import { Question } from '@models/question';
import { dogs } from '@data/dogs';
import { Dog } from '@models/dog';

@Injectable({
    providedIn: 'root'
})
export class QuestionGeneratorService {
    getRandomDog(): Dog {
        return dogs[Math.floor(Math.random() * dogs.length)];
    }

    generateQuestions(length: number): Question[] {
        const questions: Question[] = [];

        let id = 0;

        while (questions.length < length) {
            const dog = this.getRandomDog();

            if (questions.find(question => question.answer.id === dog.id)) {
                continue;
            }

            const options: Dog[] = [dog];

            while (options.length < 4) {
                const randomDog = this.getRandomDog();

                if (!options.find(dog => dog.id === randomDog.id)) {
                    options.push(randomDog);
                }
            }

            questions.push({
                id: ++id,
                answer: dog,
                options: options.sort(() => Math.random() - 0.5),
            });
        }

        return questions;
    }
}
