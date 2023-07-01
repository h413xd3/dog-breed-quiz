import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizConfiguratorComponent } from './quiz-configurator.component';

describe('QuizConfiguratorComponent', () => {
    let component: QuizConfiguratorComponent;
    let fixture: ComponentFixture<QuizConfiguratorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [QuizConfiguratorComponent]
        });
        fixture = TestBed.createComponent(QuizConfiguratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
