import { Page, Locator } from "@playwright/test";
import { LoginPage } from "../loginpage";

export class PimPage {

    constructor(private page: Page) {
        
    }

    get PimModule() { return this.page.getByRole('link', { name: 'PIM' }); }
    get AddButton() { return this.page.getByRole('button', { name: 'Add' }); }
    get EmployeeNameInput() { return this.page.getByRole('textbox', { name: 'Type for hints...' }).first(); }
    get SearchButton() { return this.page.getByRole('button', { name: 'Search' }); }

    async openPimModule() {
        await this.PimModule.click();
    }

    async openAddEmployeeForm() {
        await this.AddButton.click();
    }

    async editOnEmployee(name: string) {
        await this.page.locator("//div[@role='table']//div[1]//div[1]//div[9]//div[1]//button[1]//i[1]").click();
    }   

    async deleteOnEmployee(name: string) {
        await this.page.locator("//div[@role='table']//div[1]//div[1]//div[9]//div[1]//button[2]//i[1]").click();
    }

    get SuccessMessage() {
        return this.page.locator(
            "//div[contains(@class,'oxd-toast--success')]"
        );
    }

    get NoRecordsFoundMessage() {
        return this.page.getByText('InfoNo Records Found×')
    };
}
