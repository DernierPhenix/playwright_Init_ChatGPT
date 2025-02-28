import { test, expect } from '@playwright/test';

test('Commander des baskets sur Amazon.fr', async ({ page }) => {
    console.log('➡️  Ouvrir le site Amazon.fr');
    await page.goto('https://www.amazon.fr');

    // Accepter les cookies si la pop-up est présente
    console.log('➡️  Vérification de la bannière des cookies');
    const acceptCookies = await page.locator('input[name="accept"]').first();
    if (await acceptCookies.isVisible()) {
        await acceptCookies.click();
        console.log('✅  Cookies acceptés');
    }

    // Effectuer une recherche pour "baskets"
    console.log('➡️  Recherche des baskets');
    await page.fill('input[name="field-keywords"]', 'baskets');
    await page.press('input[name="field-keywords"]', 'Enter');

    // Attendre que les résultats s'affichent
    await page.waitForSelector('[data-component-type="s-search-result"]');
    console.log('✅  Résultats affichés');

    // Sélectionner le premier produit de la liste
    console.log('➡️  Sélection du premier produit');
    const firstProduct = await page.locator('[data-component-type="s-search-result"]').first();
    await firstProduct.click();

    // Attendre le chargement de la page produit
    await page.waitForSelector('#add-to-cart-button');

    // Vérifier si la sélection de taille est requise
    console.log('➡️  Vérification de la sélection de taille');
    const sizeOptions = await page.$$('select[name="dropdown_selected_size_name"]');
    if (sizeOptions.length > 0) {
        console.log('📌  Sélection d’une taille disponible');
        await page.selectOption('select[name="dropdown_selected_size_name"]', { index: 1 });
    }

    // Ajouter l'article au panier
    console.log('➡️  Ajout du produit au panier');
    await page.click('#add-to-cart-button');

    // Vérifier que l'article est bien ajouté au panier
    await page.waitForSelector('#hl-confirm-text');
    console.log('✅  Produit ajouté au panier avec succès');

    // Aller au panier
    console.log('➡️  Accès au panier');
    await page.goto('https://www.amazon.fr/gp/cart/view.html');

    // Vérifier que l'article est bien dans le panier
    console.log('➡️  Vérification du panier');
    const cartItemCount = await page.locator('#sc-subtotal-label-activecart').textContent();
    expect(cartItemCount).toContain('1 article');
    console.log('✅  Le panier contient bien 1 article');

    // (Optionnel) Se connecter pour finaliser la commande
    console.log('➡️  Vérification de la possibilité de finaliser la commande');
    const proceedToCheckout = await page.locator('[name="proceedToRetailCheckout"]').first();
    if (await proceedToCheckout.isVisible()) {
        console.log('📌  Un compte est nécessaire pour finaliser la commande');
        await proceedToCheckout.click();

        // Si un compte de test est disponible, se connecter
        // (Remplace ces valeurs avec des identifiants valides pour tester)
        await page.fill('#ap_email', 'test-email@example.com');
        await page.click('#continue');
        await page.fill('#ap_password', 'test-password');
        await page.click('#signInSubmit');

        console.log('✅  Connexion effectuée');
    } else {
        console.log('⚠️  Impossible d’aller plus loin sans compte');
    }

    console.log('🚀  Test terminé avec succès !');
});
