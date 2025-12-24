import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private url = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
    private UsernameTextboxLocator: Locator;
    private PasswordTextboxLocator: Locator;
    private LoginButtonLocator: Locator;

    constructor(private page: Page) {
        this.UsernameTextboxLocator  = page.getByRole('textbox', {name: 'Username'});
        this.PasswordTextboxLocator  = page.getByRole('textbox', {name: 'Password'});
        this.LoginButtonLocator  = page.getByRole('button', {name: 'Login'});
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async login(username: string, password: string) {
        await this.UsernameTextboxLocator.fill(username);
        await this.PasswordTextboxLocator.fill(password);
        await this.LoginButtonLocator.click();
    }

    async clickLoginButton() {
        await this.LoginButtonLocator.click();
    }

    async tohaveURL(expectedURL: string) {
        await this.page.waitForURL(expectedURL);
    }

}
