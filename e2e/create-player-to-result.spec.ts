import { test, expect } from '@playwright/test';
import { createPlayer, startGame, guessUntilCorrect } from './helpers';

test.describe('Huvudflöde: skapa spelare, skapa spel, gissa, visa resultat', () => {
  test('spelaren kan genomföra hela flödet och se ett vinstresultat', async ({ page }) => {
    const username = `e2e-player-${Date.now()}`;

    await page.goto('/');
    await expect(page.locator('#tab-play')).not.toHaveClass(/hidden/);

    await createPlayer(page, username);
    await startGame(page);
    await guessUntilCorrect(page);

    await expect(page.locator('#guess-result-box')).toHaveClass(/CORRECT/);
    await expect(page.locator('#status-game-status')).toContainText('FINISHED');
    await expect(page.locator('#btn-guess')).toBeDisabled();
    await expect(page.locator('#fb-guess')).toContainText('Grattis');
  });
});
