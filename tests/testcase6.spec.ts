import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-object-models/loginpage';
import data from '../data/testcase6.json';

test('Test Case 6 - Negative Login Scenarios', async ({ page }) => {
    const loginPage = new LoginPage(page);

    //testing with empty username and password
    // Step 1: Navigate to the login page
    await loginPage.goto();
    await loginPage.clickLoginButton();

    //assertion for empty username and password
    await expect(page.getByText('Required').first()).toBeVisible();
    await expect(page.getByText('Required').nth(1)).toBeVisible();
    await loginPage.tohaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //testing with empty username and valid password
    await loginPage.login(data.scenarios[0].input.username, data.scenarios[0].input.password);
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await loginPage.tohaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //testing with valid username and empty password
    await loginPage.login(data.scenarios[1].input.username, data.scenarios[1].input.password);
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await loginPage.tohaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

});

