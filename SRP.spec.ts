import { test, expect } from '@playwright/test';
import { SearchPage } from '../Pages/SearchPage';
import appConfig from '../config.json';

test('Model selection in search filter with keyword', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.navigateToSearchResultsWithKeyword();
  await searchPage.verifyModelInURL(appConfig.HomePage.searchKeyword);
  await searchPage.selectModel(appConfig.SRPPage.filterModel);
  await page.waitForTimeout(3000);
  //await searchPage.verifyModelLabel();
});

test('Model selection in search filter without keyword', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.navigateToSearchResultsWithoutKeyword();
  await searchPage.verifyModelNotInURL(appConfig.HomePage.searchKeyword);
  await searchPage.selectModelWithoutKeyword(appConfig.HomePage.searchKeyword);
  await searchPage.selectModel(appConfig.SRPPage.filterModel);
});

test('Min and Max Price selection in search filter', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.navigateToSearchResultsWithKeyword();
  await searchPage.selectPriceRange(appConfig.SRPPage.minPrice, appConfig.SRPPage.maxPrice); 
  const results = page.locator('.search-results-grid-container');
  await expect(results.first()).toBeVisible({ timeout: 10000 });
});

test('Min and Max Price Validation in Search Filter', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.navigateToSearchResultsWithKeyword();
  await searchPage.selectPriceRange(appConfig.SRPPage.minPrice, appConfig.SRPPage.maxPrice);
  await searchPage.setPriceRange(Number(appConfig.SRPPage.minPrice),Number(appConfig.SRPPage.maxPrice));
  //await searchPage.validatePriceRange(Number(appConfig.SRPPage.minPrice), Number(appConfig.SRPPage.maxPrice));
});
