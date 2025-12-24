import { Page } from "@playwright/test";

export class ContactDetailsPage {
    readonly page;

    get AddressStreet1() {
        return this.page.locator(
            "//div[contains(@class,'orangehrm-horizontal-padding')]//label[text()='Street 1']/ancestor::div[contains(@class,'oxd-input-group')]//input"
        );
    }

    get AddressStreet2() {
        return this.page.locator(
            "//div[contains(@class,'orangehrm-horizontal-padding')]//label[text()='Street 2']/ancestor::div[contains(@class,'oxd-input-group')]//input"
        );
    }

    get City() {
        return this.page.locator(
            "//div[contains(@class,'orangehrm-horizontal-padding')]//label[text()='City']/ancestor::div[contains(@class,'oxd-input-group')]//input"
        );
    }

    get StateProvince() {
        return this.page.locator(
            "//div[contains(@class,'orangehrm-horizontal-padding')]//label[text()='State/Province']/ancestor::div[contains(@class,'oxd-input-group')]//input"
        );
    }

    get ZipPostalCode() {
        return this.page.locator(
            "//div[contains(@class,'orangehrm-horizontal-padding')]//label[text()='Zip/Postal Code']/ancestor::div[contains(@class,'oxd-input-group')]//input"
        );
    }

    get Country() {
        // Target the clickable element next to the Country label (the visible selection)
        return this.page.locator("//label[text()='Country']/ancestor::div[contains(@class,'oxd-input-group')]//div[@role='button' or contains(@class,'oxd-select-text')]").first();
    }

    get CountryDropdown() {
        // The listbox containing all country options (appears after clicking the dropdown)
        return this.page.locator("//div[@role='listbox' or @aria-haspopup='listbox']");
    }

    get Mobile() {
        return this.page.locator(
            "//div[contains(@class,'orangehrm-horizontal-padding')]//label[text()='Mobile']/ancestor::div[contains(@class,'oxd-input-group')]//input"
        );
    }

    get SuccessMessage() {
        return this.page.locator(
            "//div[contains(@class,'oxd-toast--success')]"
        );
    }

    get FileAttachmentInput() {
        this.page.locator("//button[normalize-space()='Add']").click();
        return this.page.locator('input.oxd-file-input[type="file"]');
    }

    constructor(page : Page) {
        this.page = page;
    }
    async fillContactDetails(address1 : string, address2: string, city: string, state:string, zip:string, country:string, mobile: string) {
        await this.AddressStreet1.fill(address1);
        await this.AddressStreet2.fill(address2);
        await this.City.fill(city);
        await this.StateProvince.fill(state);
        await this.ZipPostalCode.fill(zip);
        await this.selectCountry(country);
        await this.Mobile.fill(mobile);
    }
    async saveContactDetails() {
        await this.page.locator('form').filter({ hasText: 'AddressStreet 1Street' }).getByRole('button').click();
    }

    async selectCountry(country: string) {
        // Click the dropdown to open it
        await this.Country.click();

        // Wait for the listbox to appear
        const dropdown = this.CountryDropdown;
        await dropdown.waitFor({ state: 'visible', timeout: 5000 });

        // Click the option inside the dropdown
        const option = dropdown.getByText(country, { exact: true });
        await option.click();
    }

    async uploadAttachment(filePath: string) {
        await this.FileAttachmentInput.setInputFiles(filePath);
    }
}  