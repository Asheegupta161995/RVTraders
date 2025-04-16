import { test } from '@playwright/test';
import { goToHomePage, fillSearchInput, validateSuggestionVisible } from '../utils/searchHelpers.spec';


test('Keyword autosuggestion in search bar on RVTrader header', async ({ page }) => {
  await goToHomePage(page);
  await fillSearchInput(page);
  await validateSuggestionVisible(page);
});

test('Keyword selection in search bar on RVTrader header', async ({ page }) => {
  await goToHomePage(page);
  await fillSearchInput(page);
  const suggestion = await validateSuggestionVisible(page);
  await suggestion.click();


  await page.waitForTimeout(3000);
});

