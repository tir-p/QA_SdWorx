import { Page } from "@playwright/test";

export class AddVacancy {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get recruitmentModule() { return this.page.getByRole('link', { name: 'Recruitment' }); }
    get VacancysTab() { return this.page.getByRole('link', { name: 'Vacancies' }); }
    get AddButton() { return this.page.getByRole('button', { name: 'Add' }); }
    get VacancyNameInput() { return this.page.getByRole('textbox').nth(1); }
    get JobTitleDropdown() { return this.page.getByText('-- Select --', { exact: true });; }
    get HiringManagerInput() { return this.page.getByRole('textbox', { name: 'Type for hints...' }).first(); }
    get SaveButton() { return this.page.getByRole('button', { name: 'Save' }); }
    get thisSuccessMessage() { return this.page.locator('div.oxd-toast.oxd-toast--success.oxd-toast-container--toast') }

    get VacancyDropdown() { return this.page.getByText('-- Select --').nth(1); }
    get HiringManagerDropdown() { return this.page.getByText('-- Select --').nth(2); }

    async openRecruitmentModule() {
        await this.recruitmentModule.click();
    }

    async openVacancysTab() {
        await this.VacancysTab.click();
    }

    async clickAddButton() {
        await this.AddButton.click();
    }

    async fillVacancyDetails(vacancyName: string, jobTitle: string, hiringManagerSearch: string, hiringManagerFull: string) {
        await this.VacancyNameInput.fill(vacancyName);
        await this.JobTitleDropdown.click();
        await this.page.getByRole('option', { name: jobTitle }).click();
        await this.HiringManagerInput.fill(hiringManagerSearch);
        await this.page.getByRole('option', { name: hiringManagerFull }).click();
    }

    async saveVacancy() {
        await this.SaveButton.click();
    }

    async searchVacancy(vacancyName: string) {
        await this.VacancyDropdown.click();
        await this.page.getByRole('option', { name: vacancyName }).click();

        await this.page.getByRole('button', { name: 'Search' }).click();
    }
}