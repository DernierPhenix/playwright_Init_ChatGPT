import { Page, Locator, expect } from '@playwright/test';

export class AmazonCartPage {
    readonly page: Page;
    readonly cartItemCount: Locator;
    readonly clickToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItemCount = page.locator('#sw-gtc').getByRole('link', { name: 'Aller au panier' })
        // this.clickToCartButton = page.getByRole('link', { name: 'article dans le panier' });
    }

    async verifyItemInCart() {
        console.log('➡️ Vérification de l’article dans le panier');
        await this.clickToCartButton.click();
        // const itemCount = await this.cartItemCount.textContent();
        // expect(itemCount).toContain('Aller au panier');
    }
    //     async clickToCart() {
    //         console.log('➡️ Cliquez sur le panier');
    //         await this.clickToCartButton.click();
    //     }
    // }
}