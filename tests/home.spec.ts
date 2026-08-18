import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://obby.wiki/');

    await expect(page).toHaveTitle(/Obby Wiki/);
})

test('obby category link', async ({ page }) => {
    await page.goto('https://obby.wiki/');

    const link = page.getByRole('link').and(page.locator('[href="https://obby.wiki/Category:Obby"]'));

    await expect(link).toBeVisible();
})