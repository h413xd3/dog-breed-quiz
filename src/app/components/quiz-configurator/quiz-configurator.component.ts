import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-quiz-configurator',
    templateUrl: './quiz-configurator.component.html',
    styleUrls: ['./quiz-configurator.component.scss']
})
export class QuizConfiguratorComponent {
    form: FormGroup;

    constructor(
        private router: Router,
    ) {
        const config = JSON.parse(localStorage.getItem('quiz-config') || '');

        this.form = new FormGroup({
            questions: new FormControl(config?.questions || 5),
            seconds: new FormControl(config?.seconds || 30),
        });
    }

    onChange() {
        localStorage.setItem('quiz-config', JSON.stringify(this.form.value));
    }

    onSubmit() {
        this.router.navigate(['/quiz', this.form.value]);
    }
}
