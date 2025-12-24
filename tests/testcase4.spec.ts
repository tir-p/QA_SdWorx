import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-object-models/loginpage';
import { TimePage } from '../page-object-models/timepage';
import testData from '../data/testcase4.json';


test('test case 4- adding time sheet', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(testData.login.username, testData.login.password);

  const time = new TimePage(page);
  await time.openTimeModule();
  await time.selectEmployee(testData.employee);
  if (await time.CreateTimeSheetButton.isVisible()) {
    await time.clickCreateTimeSheet();
  }
  await time.clickEdit();

  // First row (index 0 in JSON)
  const firstRow = testData.rows[0];
  await time.selectClientOnFirstRow(firstRow.clientSearch, firstRow.client);
  if (firstRow.project) await time.selectProjectOption(firstRow.project);
  await time.fillFirstRowNumbers(firstRow.hours);

  // Subsequent rows
  for (let i = 1; i < testData.rows.length; i++) {
    const r = testData.rows[i];
    await time.clickAddRow();
    // rowIndex in POM starts at 2 for the second row
    const rowIndex = i + 1;
    await time.setClientOnRow(rowIndex, r.clientSearch, r.client);
    if (r.activity) await time.selectActivityForRow(rowIndex, r.activity);
    await time.fillRowHours(rowIndex, r.hours);
  }

  // Save
  if (await time.saveButton.isEnabled()) {
    await time.save();
  }
  
  await time.checkSuccessMessage();
  await time.clickSubmit();

  // Assertion for submit
  await expect(page.getByText('Status: Submitted')).toBeVisible();

  // Assertion for hours total
  await page.pause();
  const totalHours = testData.rows.reduce((sum, r) => sum + r.hours.reduce((a, b) => a + b, 0), 0);
  const expectedText = `${totalHours}:00`;
  await expect(time.TotalHoursLabel).toHaveText(expectedText);

  /*
testData.rows.reduce(...) loops through each row.

For every row, r.hours.reduce((a, b) => a + b, 0) sums that row’s hours array.

Those row totals are then added together to get totalHours.

expectedText becomes something like "12:00".

The test checks that time.TotalHoursLabel displays that text.
  */

});