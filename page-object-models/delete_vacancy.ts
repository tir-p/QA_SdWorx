import { Page } from "@playwright/test";
import { AddVacancy } from "./add_vacancy";

export class DeleteVacancy extends AddVacancy {
    page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    get SelectCheckbox() { return this.page.locator("//div[@class='oxd-table-card-cell-checkbox']//i[@class='oxd-icon bi-check oxd-checkbox-input-icon']"); }
    get DeleteButton() { return this.page.getByRole('button', { name: 'Delete Selected' }); }
    get ConfirmDeleteButton() { return this.page.getByRole('button', { name: 'Yes, Delete' }); }
    get NoRecordsFound() { return this.page.getByText('No Records Found'); }

    async clickSelectCheckbox() {
        await this.SelectCheckbox.click();
    }

    async clickDeleteButton() {
        await this.DeleteButton.click();
    }
    async confirmDelete() {
        await this.ConfirmDeleteButton.click();
    }
}