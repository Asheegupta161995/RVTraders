import { Page, expect } from '@playwright/test';
import appConfig from '../config.json';

export const goToHomePage = async (page: Page) => {
  await page.goto(appConfig.baseUrl);
};

export const fillSearchInput = async (page: Page) => {
  const searchInput = page.locator('input[placeholder="Search"]');
  await expect(searchInput).toBeVisible();
  await searchInput.fill(appConfig.searchText);
};

export const getExpectedSuggestion = (page: Page) => {
  const suggestions = page.locator('//button[contains(@class, "autocomplete-item")]/div[2]');
  return suggestions.filter({ hasText: appConfig.matchedText });
};

export const validateSuggestionVisible = async (page: Page) => {
  const expected = getExpectedSuggestion(page);
  await expect(expected).toBeVisible();
  return expected;
};

