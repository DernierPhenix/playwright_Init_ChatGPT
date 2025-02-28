import { test } from '@playwright/test';
import { AmazonHomePage } from '../pages/AmazonHomePage';
import { AmazonSearchResultsPage } from '../pages/AmazonSearchResultsPage';
import { AmazonProductPage } from '../pages/AmazonProductPage';
import { AmazonCartPage } from '../pages/AmazonCartPage';
import { AmazonCaptchaPage } from '../pages/AmazonCaptchaPage';

test('Commander des baskets sur Amazon.fr avec gestion du CAPTCHA', async ({ page }) => {
    // Initialisation des pages
    const captchaPage = new AmazonCaptchaPage(page);
    const homePage = new AmazonHomePage(page);
    const searchResultsPage = new AmazonSearchResultsPage(page);
    const productPage = new AmazonProductPage(page);
    const cartPage = new AmazonCartPage(page);

    console.log('➡️ Ouverture du site Amazon.fr');
    await homePage.navigate();

    // Vérifier si la page CAPTCHA apparaît
    if (await captchaPage.isCaptchaPage()) {
        const solved = await captchaPage.solveCaptcha();
        if (!solved) {
            console.log('❌ CAPTCHA non résolu, test interrompu.');
            return;
        }
    }

    await homePage.acceptCookies();

    console.log('➡️ Recherche du produit "baskets"');
    await homePage.searchForProduct('baskets');

    console.log('➡️ Sélection du premier produit');
    await searchResultsPage.selectFirstProduct();

    console.log('➡️ Vérification de la sélection de taille');
    await productPage.selectSizeIfRequired();

    console.log('➡️ Ajout du produit au panier');
    await productPage.addToCart();

    console.log('➡️ Vérification de la présence de l’article dans le panier');
    await cartPage.navigateToCart();
    await cartPage.verifyItemInCart();

    console.log('➡️ Tentative de finalisation de la commande');
    const canProceed = await cartPage.proceedToCheckout();

    if (canProceed) {
        console.log('✅ Passage à la commande possible (connexion requise)');
    } else {
        console.log('⚠️ Impossible de finaliser la commande sans compte');
    }

    console.log('🏁 Test terminé avec succès !');
});
