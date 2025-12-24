import {test , expect} from '@playwright/test'
import { LoginPage } from '../page-object-models/loginpage'

test.skip('to login', async ({page}) => {
    let login = new LoginPage(page);
    await login.login("Admin","admin123");
});

