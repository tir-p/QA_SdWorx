import { Page } from "@playwright/test";

export class TimePage {
    constructor(private page: Page) {}

    get TimeModule() { return this.page.getByRole('link', { name: 'Time' }); }
    get EmployeeNameInput() { return this.page.getByRole('textbox', { name: 'Type for hints...' }).first(); }
    get ViewButton() { return this.page.locator('form').getByRole('button', { name: 'View' }); }
    get CreateTimeSheetButton() { return this.page.getByRole('button', { name: 'Create Timesheet' }); }
    get EditButton() { return this.page.getByRole('button', { name: 'Edit' }); }
    get AddRowButton() { return this.page.getByRole('cell', { name: ' Add Row' }).getByRole('button'); }
    get SubmitButton() { return this.page.getByRole('button', { name: 'Submit' }); }
    get TotalHoursLabel() { return this.page.locator("//td[@class='orangehrm-timesheet-table-body-cell --center --freeze-right --highlight-2']"); }
    get saveButton() { return this.page.getByRole('button', { name: 'Save' }); }
    
    async openTimeModule() {
        // Ensure the Time module link is visible, then click it
        await this.TimeModule.waitFor({ state: 'visible', timeout: 5000 });
        await this.TimeModule.click();
    }

    async selectEmployee(name: string) {
        await this.EmployeeNameInput.fill(name);
        await this.page.getByRole('option', { name: name }).click();
        await this.page.locator('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').click();
    }

    async clickEdit() {
        await this.EditButton.click();
    }

    async selectClientOnFirstRow(search: string, clientFullName: string) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).click();
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(search);
        await this.page.getByRole('option', { name: clientFullName }).click();
    }

    async selectProjectOption(projectName: string) {
        await this.page.getByText('-- Select --').click();
        await this.page.getByRole('option', { name: projectName }).click();
    }

    async fillFirstRowNumbers(values: number[]) {
        if (values.length >= 1) await this.page.getByRole('textbox').nth(2).fill(values[0].toString());
        if (values.length >= 2) await this.page.getByRole('textbox').nth(3).fill(values[1].toString());
        if (values.length >= 3) await this.page.getByRole('textbox').nth(4).fill(values[2].toString());
        if (values.length >= 4) await this.page.getByRole('textbox').nth(5).fill(values[3].toString());
        if (values.length >= 5) {
            await this.page.locator('td:nth-child(7) > .oxd-input-group > div:nth-child(2) > .oxd-input').click();
            await this.page.locator('.oxd-input.oxd-input--focus').fill(values[4].toString());
        }
    }

    async clickAddRow() {
        await this.AddRowButton.click();
    }

    async setClientOnRow(rowIndex: number, clientSearch: string, clientFullName: string) {
        const row = this.page.locator(`tr:nth-child(${rowIndex})`);
        await row.getByPlaceholder('Type for hints...').first().fill(clientSearch);
        await this.page.getByText(clientFullName).click();
    }

    async selectActivityForRow(rowIndex: number, activity: string) {
        const selectIcon = this.page.locator(`tr:nth-child(${rowIndex}) td:nth-child(2) .oxd-icon`);
        await selectIcon.click();
        await this.page.getByRole('option', { name: activity }).click();
    }

    async fillRowHours(rowIndex: number, values: number[]) {
        for (let i = 0; i < values.length; i++) {
            const col = 3 + i; // hours start at column 3
            const input = this.page.locator(`tr:nth-child(${rowIndex}) td:nth-child(${col}) .oxd-input`);
            await input.click();
            await this.page.locator('.oxd-input.oxd-input--focus').fill(values[i].toString());
        }
    }

    async save() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCreateTimeSheet() {
        await this.CreateTimeSheetButton.click();
    }   

    async checkSuccessMessage() {
        await this.page.locator("//div[contains(@class,'oxd-toast--success')]").waitFor({ state: 'visible', timeout: 5000 });
    }

    async clickSubmit() {
        await this.SubmitButton.click();
    }
}
