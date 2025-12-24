import { test, expect } from '@playwright/test';
import { PimPage } from '../page-object-models/pim/pimpage';
import { LoginPage } from '../page-object-models/loginpage';
import employees from '../data/testcase1.json';
import { AddEmployee } from '../page-object-models/pim/addemployee';

test('Add Employee Test', async ({ page }) => {

  // Login
  const login = new LoginPage(page);
  await login.goto();
  await login.login('Admin', 'admin123');

  const pimPage = new PimPage(page);
  const addEmployee = new AddEmployee(page);

  for (const emp of employees) {

    // Open Add Employee form
    await pimPage.openPimModule();
    await pimPage.openAddEmployeeForm();

    // Fill and save new employee
    await addEmployee.fillEmployeeNames(emp.firstName, emp.middleName, emp.lastName);
    await addEmployee.saveEmployee();

    // Wait for redirect to Personal Details after employee creation
    await page.waitForURL(/viewPersonalDetails/);

    // Navigate back to Add Employee form
    await pimPage.openAddEmployeeForm();

    // Verify names are correctly pre-filled
    await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue(emp.firstName);
    await expect(page.getByRole('textbox', { name: 'Middle Name' })).toHaveValue(emp.middleName);
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue(emp.lastName);

    // Navigate to Employee List
    await page.getByRole('link', { name: 'Add Employee' }).click(); // optional depending on your UI flow
    await page.getByText('Employee List' ).click();

    // Search for the newly added employee
    const fullName = `${emp.firstName} ${emp.middleName} ${emp.lastName}`;

    // Locate the Employee Name search input specifically
    const searchInput = page.getByRole('textbox', { name: 'Type for hints...' }).first()
    await searchInput.fill(fullName);

    // Click Search button
    await page.getByRole('button', { name: 'Search' }).click();

    
    // Validate search results
    await expect(page.locator('.orangehrm-container')).toContainText(`${emp.firstName} ${emp.middleName}`);
    await expect(page.locator('.orangehrm-container')).toContainText(emp.lastName);
  }
});
