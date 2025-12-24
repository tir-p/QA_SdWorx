import {expect, test} from '@playwright/test';
import { PimPage } from '../page-object-models/pim/pimpage';
import { LoginPage } from '../page-object-models/loginpage';

test('deletion ', async ({page}) => {    
    // Login
    const login = new LoginPage(page);
    await login.goto();
    await login.login('Admin', 'admin123');

    const pimPage = new PimPage(page);

    await pimPage.openPimModule();

    await pimPage.EmployeeNameInput.fill('Bryan Tetsadong Marceau Mbeumo');
    await pimPage.SearchButton.click();
    
    await pimPage.deleteOnEmployee('Bryan Tetsadong Marceau Mbeumo');

    // Confirm deletion in the dialog
    await page.getByRole('button', { name: 'Yes, Delete' }).click();

    await pimPage.SuccessMessage.waitFor({ state: 'visible' });

    // Validate that the employee is deleted
    await pimPage.EmployeeNameInput.fill('Bryan Tetsadong Marceau Mbeumo');
    await pimPage.SearchButton.click();
    await pimPage.NoRecordsFoundMessage.waitFor({ state: 'visible' });
});