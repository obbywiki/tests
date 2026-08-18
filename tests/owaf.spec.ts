import { test, expect } from '@playwright/test';

// test('open the OWAF modal', async({ page }) => {
//     await page.goto('https://obby.wiki/');

//     await page.locator('.citizen-header').locator('.owaf-new-article-trigger').click();

//     await expect(page.getByRole('heading', { name: 'Create a new article' })).toBeVisible();
// })

test.describe('OWAF modal basic flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://obby.wiki/');
    });

    test('modal opens', async({ page }) => {
        await page.locator('.citizen-header').locator('.owaf-new-article-trigger').click();

        await expect(page.getByRole('heading', { name: 'Create a new article' })).toBeVisible();
    });

    test('click first suggestion', async({ page }) => {
        await page.locator('.citizen-header').locator('.owaf-new-article-trigger').click();

        // wait for the suggestions to load
        const wanted_api_promise = page.waitForResponse('https://obby.wiki/api.php?action=query&format=json&list=querypage&qppage=Wantedpages&qplimit=50');
        await wanted_api_promise;

        const first_suggestion = page.locator('.owaf-modal__suggestions-list').getByRole('listitem').first();

        await expect(first_suggestion).toBeVisible({ timeout: 5000 });
        
        const suggestion_inner = first_suggestion.locator('.owaf-modal__suggestion')

        await suggestion_inner.click();

        expect(suggestion_inner).toHaveText(/\S/);

        const suggestion_text = await suggestion_inner.innerText()

        await expect(page.locator('#owaf-modal-title-input')).toHaveValue(suggestion_text, { timeout: 100 });
    });
})