import { test, expect } from '@playwright/test';
import { createPlayer, startGame } from './helpers';

test.describe('Gissningshistorik', () => {
  test('', async ({ page }) => {
    const username = `e2e-history-${Date.now()}`;

    await page.goto('/');
    await createPlayer(page, username);
    await startGame(page);

    const guessedNumber = 1;
    await page.locator('#play-guess').fill(String(guessedNumber));
    await page.getByRole('button', { name: 'Gissa', exact: true }).click();
    await expect(page.locator('#guess-result-box')).not.toHaveClass(/hidden/, { timeout: 10_000 });

    await page.locator('#btn-history').click();
    await expect(page.locator('#history-table')).not.toHaveClass(/hidden/, { timeout: 10_000 });

    const rows = page.locator('#history-body tr');
    await expect(rows).toHaveCount(1);

    const firstRow = rows.first();
    await expect(firstRow.locator('td').nth(0)).toHaveText('1');
    await expect(firstRow.locator('td').nth(1)).toHaveText(String(guessedNumber));
    await expect(firstRow.locator('td').nth(2)).toHaveText(/LOW|HIGH|CORRECT/);
  });
});
