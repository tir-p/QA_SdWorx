import { Page } from "@playwright/test";
import { AddVacancy } from "./add_vacancy";

export class EditVacancy extends AddVacancy {
    page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    get EditButton() { return this.page.getByRole('button').filter({ hasText: /^$/ }).nth(4); }


    async clickEditButton() {
        await this.EditButton.click();
    }

    async changeVacancyName(newName: string) {
        await this.VacancyNameInput.fill(newName);
    }

}