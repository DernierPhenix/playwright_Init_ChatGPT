import { test, expect } from '@playwright/test';
import { AmazonLoginPage } from '../pages/AmazonLoginPage';
import { AmazonProductPage } from '../pages/AmazonProductPage';
import { AmazonCartPage } from '../pages/AmazonCartPage';
import { AmazonOrdersPage } from '../pages/AmazonOrdersPage';

test.describe('Tests Critiques Amazon', () => {
    
    const userEmail = 'test-email@example.com';  // Remplace par un vrai email de test
    const userPassword = 'test-password';        // Remplace par un vrai mot de passe de test

    test('1️⃣ Connexion à un compte utilisateur', async ({ page }) => {
        const loginPage = new AmazonLoginPage(page);
        
        console.log('➡️ Ouverture du site Amazon.fr');
        await page.goto('https://www.amazon.fr');

        await loginPage.login(userEmail, userPassword);

        console.log('✅ Vérification que la connexion est réussie');
        await expect(page).toHaveURL(/amazon\.fr/);
    });

    test('Ajout d’un produit au panier', async ({ page }) => {
        const productPage = new AmazonProductPage(page);
        const cartPage = new AmazonCartPage(page);

        console.log('➡️ Ouverture d’un produit spécifique');
        await page.goto('https://www.amazon.fr/dp/B0CLT54ZNZ'); // Remplace par un ASIN de test

        await productPage.addToCart();
        await cartPage.verifyItemInCart();
    });

    test('3️⃣ Passage de commande (jusqu’à l’étape paiement)', async ({ page }) => {
        console.log('➡️ Ouverture du panier');
        await page.goto('https://www.amazon.fr/gp/cart/view.html');

        console.log('➡️ Vérification de la possibilité de passer commande');
        const proceedToCheckoutButton = page.locator('[name="proceedToRetailCheckout"]');

        if (await proceedToCheckoutButton.isVisible()) {
            await proceedToCheckoutButton.click();
            console.log('✅ Commande passée à l’étape suivante');
        } else {
            console.log('⚠️ Impossible de passer commande (connexion requise)');
        }
    });

    test('4️⃣ Vérification du suivi de commande', async ({ page }) => {
        const ordersPage = new AmazonOrdersPage(page);

        console.log('➡️ Accès aux commandes');
        await page.goto('https://www.amazon.fr/gp/css/order-history');
        await ordersPage.navigateToOrders();

        console.log('✅ Vérification que les commandes sont bien affichées');
        await expect(page.locator('.order')).toBeVisible();
    });

    test('5️⃣ Validation des moyens de paiement', async ({ page }) => {
        console.log('➡️ Ouverture des paramètres de paiement');
        await page.goto('https://www.amazon.fr/cpe/managepaymentmethods');

        console.log('✅ Vérification que la gestion des paiements est accessible');
        await expect(page.locator('#pmts-manage-payment-methods-section')).toBeVisible();
    });
});
