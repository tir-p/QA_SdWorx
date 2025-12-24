import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-object-models/loginpage';
import { AddVacancy } from '../page-object-models/add_vacancy';
import { EditVacancy } from '../page-object-models/edit_vacancy';
import { DeleteVacancy } from '../page-object-models/delete_vacancy';

import data from '../data/testcase5.json';

test('Test Case 5 - Add, Edit and Delete Vacancy', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const addVacancy = new AddVacancy(page);

    // Step 1: Login to the application
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    // Step 2: Navigate to Recruitment -> Vacancies
    await addVacancy.openRecruitmentModule();
    await addVacancy.openVacancysTab();

    // Step 3: Add a new vacancy
    await addVacancy.clickAddButton();
    await addVacancy.fillVacancyDetails(
        data.vacancy.name,
        data.vacancy.jobTitle,
        data.vacancy.hiringManagerSearch,
        data.vacancy.hiringManagerFull
    );
    await addVacancy.saveVacancy();
    await addVacancy.saveVacancy();
    await addVacancy.openVacancysTab();

    // Verify success message after adding vacancy (soft)
    await expect.soft(addVacancy.thisSuccessMessage).toBeVisible();

    // Editing the vacancy
    await addVacancy.searchVacancy(data.vacancy.name);
    const editVacancy = new EditVacancy(page);
    await editVacancy.clickEditButton();
    await editVacancy.changeVacancyName(data.vacancy.updatedName);
    await editVacancy.saveVacancy();

    // Verify success message after editing (soft)
    await expect.soft(addVacancy.thisSuccessMessage).toBeVisible();

    // Deletion of vacancy
    await addVacancy.openVacancysTab();
    await addVacancy.searchVacancy(data.vacancy.updatedName);
    const deleteVacancy = new DeleteVacancy(page);
    await deleteVacancy.clickSelectCheckbox();
    await deleteVacancy.clickDeleteButton();
    await deleteVacancy.confirmDelete();

    // Soft-assert that no records are found
    await expect.soft(page.getByText('No Records Found')).toBeVisible();
});
