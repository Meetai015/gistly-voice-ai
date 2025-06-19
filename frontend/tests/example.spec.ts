import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Gistly Voice AI');
  await expect(page.getByRole('button', { name: 'Start Recording' })).toBeVisible();
});
