import { Page, Locator } from '@playwright/test';

export class AmazonProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: 'Ajouter au panier', exact: true });
        
    }

    async addToCart() {
        console.log('➡️ Ajout du produit au panier');
        await this.addToCartButton.click();
    }
    
}
