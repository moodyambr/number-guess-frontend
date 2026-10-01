import { test, expect } from '@playwright/test';
import { createPlayer } from './helpers';

test.describe('Spelare-flik CRUD', () => {
  test('hämta, uppdatera och ta bort en spelare', async ({ page }) => {
    const username = `e2e-crud-player-${Date.now()}`;
    const updatedUsername = `${username}-uppdaterad`;

    await page.goto('/');
    await createPlayer(page, username);

    // Läs ut spelarens ID från statusfältet, som är det enda stället i UI:t där ID:t visas.
    const statusText = await page.locator('#status-player').textContent();
    const playerId = statusText?.match(/ID:\s*(\d+)/)?.[1];
    expect(playerId).toBeTruthy();

    await page.getByRole('button', { name: '👤 Spelare' }).click();
    await expect(page.locator('#tab-players')).not.toHaveClass(/hidden/);

    // GET
    await page.locator('#p-get-id').fill(playerId!);
    await page.getByRole('button', { name: 'Hämta' }).click();
    await expect(page.locator('#p-get-output')).toContainText(username);

    // PUT
    await page.locator('#p-update-id').fill(playerId!);
    await page.locator('#p-update-username').fill(updatedUsername);
    await page.getByRole('button', { name: 'Uppdatera' }).click();
    await expect(page.locator('#p-update-output')).toContainText(updatedUsername);

    // DELETE
    await page.locator('#p-delete-id').fill(playerId!);
    await page.getByRole('button', { name: 'Ta bort' }).click();
    await expect(page.locator('#p-delete-output')).toContainText('borttagen');

    // Edge: hämta samma ID igen ska ge ett läsbart felmeddelande
    await page.locator('#p-get-id').fill(playerId!);
    await page.getByRole('button', { name: 'Hämta' }).click();
    await expect(page.locator('#p-get-output')).toContainText('Fel');
  });
});
