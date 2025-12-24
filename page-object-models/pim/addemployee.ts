import { Page, Locator } from "@playwright/test";
import { LoginPage } from "../loginpage";

export class AddEmployee {

    constructor(private page: Page) {}

    get FirstName() { return this.page.getByPlaceholder('First Name'); }
    get MiddleName() { return this.page.getByPlaceholder('Middle Name'); }
    get LastName() { return this.page.getByPlaceholder('Last Name'); }
    get SaveButton() { return this.page.getByRole('button', { name: 'Save' }); }


    async fillEmployeeNames(first: string, mid: string, last: string) {
        await this.FirstName.fill(first);
        await this.MiddleName.fill(mid);
        await this.LastName.fill(last);
    }

    async saveEmployee() {
        await this.SaveButton.click();
    }

}
