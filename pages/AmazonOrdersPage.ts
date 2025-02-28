import { Page, Locator } from '@playwright/test';

export class AmazonOrdersPage {
    readonly page: Page;
    readonly ordersLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersLink = page.locator('a[href*="your-orders"]');
    }

    async navigateToOrders() {
        console.log('➡️ Accès aux commandes');
        await this.ordersLink.click();
    }
}
