import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

interface MenuButton {
    name: string;
    link: string;
}

interface LanguageButton {
    name: string;
    language: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    menuButtons: MenuButton[] = [
        {
            name: 'components.app.menu.home',
            link: '/',
        },
        {
            name: 'components.app.menu.reports',
            link: '/reports',
        },
    ];

    languageButtons: LanguageButton[] = [
        {
            name: 'Français',
            language: 'fr',
        },
        {
            name: 'English',
            language: 'en',
        },
    ];

    constructor(
        private titleService: Title,
        private translate: TranslateService,
    ) {
        this.translate.setDefaultLang('fr');
        this.translate.use(localStorage.getItem('language') || 'fr');
    }

    #updateTitle(): void {
        this.translate.getTranslation(this.translate.currentLang).subscribe(() => {
            this.titleService.setTitle(this.translate.instant('global.title'));
        });
    }

    changeLanguage(language: string): void {
        this.translate.use(language);
        localStorage.setItem('language', language);
    }

    ngOnInit(): void {
        this.#updateTitle();

        this.translate.onLangChange.subscribe(() => {
            this.#updateTitle();
        });
    }
}
