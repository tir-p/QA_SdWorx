import { test } from '@playwright/test';
import { LoginPage } from '../page-object-models/loginpage';
import { PimPage } from '../page-object-models/pim/pimpage';
import { ContactDetailsPage } from '../page-object-models/pim/contactdetails';
import contactData from '../data/testcase2.json';
import path from 'path';

test('Add contact details', async ({ page }) => {
    // Login
    const login = new LoginPage(page);
    await login.goto();
    await login.login('Admin', 'admin123');

    const pimPage = new PimPage(page);

    await pimPage.openPimModule();

    await pimPage.EmployeeNameInput.fill('Bryan Tetsadong Marceau Mbeumo');
    await pimPage.SearchButton.click();

    await pimPage.editOnEmployee('Bryan Tetsadong Marceau Mbeumo');

    // Open Contact Details tab
    await page.getByRole('tab', { name: 'Contact Details' }).click();

    const contactDetailsPage = new ContactDetailsPage(page);

    // Ensure contact details form is visible before filling
    await contactDetailsPage.AddressStreet1.waitFor({ state: 'visible' });

    await contactDetailsPage.fillContactDetails(
        contactData.address1,
        contactData.address2,
        contactData.city,
        contactData.state,
        contactData.zip,
        contactData.country,
        contactData.mobile
    );

    // Upload attachment
    const filePath = path.resolve(__dirname, '../data/bryan.jpg'); // put your test file here
    await contactDetailsPage.uploadAttachment(filePath);

    await page.locator('form').filter({ hasText: 'AddressStreet 1Street' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Save' }).nth(1).click();    


    // Assert success
    await contactDetailsPage.SuccessMessage.waitFor({ state: 'visible' });
});
