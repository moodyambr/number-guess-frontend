import { Page, expect } from '@playwright/test';


export async function createPlayer(page: Page, username: string): Promise<void> {
  await page.locator('#play-username').fill(username);
  await page.getByRole('button', { name: 'Skapa spelare' }).click();
  await expect(page.locator('#fb-player')).toContainText('skapad', { timeout: 10_000 });
  await expect(page.locator('#status-player')).toContainText(username);
}

export async function startGame(page: Page): Promise<void> {
  await page.locator('#btn-start-game').click();
  await expect(page.locator('#fb-game')).toContainText('Spel startat', { timeout: 10_000 });
  await expect(page.locator('#btn-guess')).toBeEnabled();
  await expect(page.locator('#btn-history')).toBeEnabled();
  await expect(page.locator('#status-game-status')).toContainText('ACTIVE');
}

export async function guessUntilCorrect(page: Page): Promise<void> {
  for (let guess = 1; guess <= 5; guess++) {
    await page.locator('#play-guess').fill(String(guess));

    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes('/guesses') && res.request().method() === 'POST',
      ),
      page.getByRole('button', { name: 'Gissa', exact: true }).click(),
    ]);

    const body = await response.json();
    if (body.result === 'CORRECT') {
      await expect(page.locator('#guess-result-box')).toHaveClass(/CORRECT/, { timeout: 10_000 });
      return;
    }
  }
  throw new Error('Spelet avslutades inte med CORRECT inom 5 gissningar (1-5).');
}
