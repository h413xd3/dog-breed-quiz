import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
    @Input() duration: number = 10;
    @Input() intervalDuration: number = 1000;
    @Output() finish = new EventEmitter<number>();
    intervalId: any;
    milliseconds: number = 0;
    animate: boolean = true;

    getDurationInMilliseconds(): number {
        return this.duration * 1000;
    }

    getSeconds(): number {
        return Math.ceil(this.milliseconds / 1000);
    }

    #startTimer(): void {
        this.milliseconds = 0;

        setTimeout(() => {
            this.milliseconds = 1;

            this.intervalId = setInterval(() => {
                this.milliseconds += this.intervalDuration;

                if (this.milliseconds >= this.getDurationInMilliseconds()) {
                    this.#stopTimer();
                    this.finish.emit(this.getSeconds());
                }
            }, this.intervalDuration);
        }, 300);
    }

    #stopTimer(): void {
        clearInterval(this.intervalId);
    }

    reset() {
        this.#stopTimer();
        this.#startTimer();
    }

    getProgress(): number {
        return this.milliseconds / this.getDurationInMilliseconds() * 100;
    }

    ngOnInit(): void {
        this.#startTimer();
    }

    ngOnDestroy(): void {
        this.#stopTimer();
    }
}
