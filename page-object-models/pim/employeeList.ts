import { Page, Locator, expect } from '@playwright/test';

export class EmployeeListPage {
    constructor(private page: Page) {}

    get EmployeeNameInput() { return this.page.getByRole('textbox', { name: 'Type for hints...' }).first(); }
    get SearchButton() { return this.page.getByRole('button', { name: 'Search' }); }
    get ResultsContainer() { return this.page.locator('.orangehrm-container'); }

    async searchByName(fullName: string) {
        await this.EmployeeNameInput.fill(fullName);
        await this.SearchButton.click();
    }

    async expectEmployeeInResults(firstAndMiddle: string, lastName: string) {
        await expect(this.ResultsContainer).toContainText(firstAndMiddle);
        await expect(this.ResultsContainer).toContainText(lastName);
    }
}
