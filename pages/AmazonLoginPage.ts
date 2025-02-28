import { Page, Locator } from '@playwright/test';

export class AmazonLoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#ap_email');
        this.passwordInput = page.locator('#ap_password');
        this.signInButton = page.locator('#signInSubmit');
    }

    async login(email: string, password: string) {
        console.log('➡️ Connexion à Amazon');
        await this.emailInput.fill(email);
        await this.page.click('#continue');
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}
