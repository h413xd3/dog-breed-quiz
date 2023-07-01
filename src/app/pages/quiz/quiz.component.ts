import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { TimerComponent } from '@components/timer/timer.component';
import { Answer } from '@models/answer';
import { Dog } from '@models/dog';
import { Question } from '@models/question';
import { QuizConfiguration } from '@models/quiz-configuration';
import { QuestionGeneratorService } from '@services/question-generator.service';
import { ReportManagerService } from '@services/report-manager.service';

enum QuizState {
    INIT,
    STARTED,
    FINISHED,
}

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
    @ViewChild(TimerComponent) timer!: TimerComponent;
    QuizState = QuizState;
    state: QuizState = QuizState.INIT;
    questions: Question[] = [];
    answers: Answer[] = [];
    currentQuestionIndex: number = 0;
    score: number = 0;
    canAnswer: boolean = true;
    badAnswer: number = -1;
    goodAnswer: number = -1;
    reportId: string | undefined = undefined;
    duration: number = 0;
    showQuizz: boolean = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private questionGenerator: QuestionGeneratorService,
        private reportManager: ReportManagerService,
    ) { }

    ngOnInit() {
        this.onInit();
    }

    resetGodAndBadAnswer() {
        this.badAnswer = -1;
        this.goodAnswer = -1;
    }

    onInit() {
        const config = this.route.snapshot.params as QuizConfiguration;

        this.duration = config.seconds;

        this.questions = this.questionGenerator.generateQuestions(config.questions);

        this.state = QuizState.STARTED;
    }

    getCurrentQuestion(): Question {
        return this.questions[this.currentQuestionIndex];
    }

    onFinished() {
        this.state = QuizState.FINISHED;

        this.score = this.answers.filter(
            answer => (
                answer.answer !== null
                && answer.question.answer.id === answer.answer.id
            )
        ).length;

        const report = {
            id: uuidv4(),
            score: this.score,
            questions: this.answers.map(answer => ({
                id: answer.id,
                question: answer.question.answer.id,
                options: answer.question.options.map(dog => dog.id),
                answer: answer.answer !== null ? answer.answer.id : -1,
                duration: answer.duration,
            })),
            date: new Date(),
        };

        this.reportManager.saveReport(report);

        this.reportId = report.id;
    }

    onAnswer(dog: Dog) {
        if (!this.canAnswer) {
            return;
        }

        this.canAnswer = false;

        const question = this.getCurrentQuestion();

        if (question.answer.id === dog.id) {
            this.goodAnswer = dog.id;
        } else {
            this.badAnswer = dog.id;
            this.goodAnswer = question.answer.id;
        }

        this.answers.push({
            id: this.answers.length + 1,
            question,
            answer: dog,
            duration: this.timer.getSeconds(),
        });

        this.#nextQuestion();
    }

    #nextQuestion(): void {
        setTimeout(() => {
            this.showQuizz = false;

            this.resetGodAndBadAnswer();

            this.currentQuestionIndex++;

            if (this.currentQuestionIndex >= this.questions.length) {
                this.onFinished();
            } else {
                setTimeout(() => {
                    this.canAnswer = true;
                    this.showQuizz = true;
                }, 0);
            }
        }, 1000);
    }

    onRestart() {
        this.state = QuizState.INIT;
        this.answers = [];
        this.currentQuestionIndex = 0;
        this.score = 0;

        this.onInit();
    }

    onLeave() {
        this.router.navigate(['/']);
    }

    onShowReport() {
        this.router.navigate([`/reports/${this.reportId}`]);
    }

    onTimerFinished(seconds: number) {
        this.canAnswer = false;

        const question = this.getCurrentQuestion();

        this.answers.push({
            id: this.answers.length + 1,
            question,
            answer: null,
            duration: seconds,
        });

        this.goodAnswer = question.answer.id;

        this.#nextQuestion();
    }
}
