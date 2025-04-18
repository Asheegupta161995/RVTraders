import { test, expect } from '@playwright/test';
import { SearchPage } from '../Pages/SearchPage';
import { ListingPage } from '../Pages/ListingPage';
import appConfig from '../config.json';

test.skip('Model selection in search filter with keyword', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.navigateToSearchResultsWithKeyword();
  await searchPage.verifyModelInURL(appConfig.HomePage.searchKeyword);
  await searchPage.selectModel(appConfig.SRPPage.filterModel);
  await page.waitForTimeout(3000);
  //await searchPage.verifyModelLabel();
});

test.skip('Model selection in search filter without keyword', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.navigateToSearchResultsWithoutKeyword();
  await searchPage.verifyModelNotInURL(appConfig.HomePage.searchKeyword);
  await searchPage.selectModelWithoutKeyword(appConfig.HomePage.searchKeyword);
  await searchPage.selectModel(appConfig.SRPPage.filterModel);
});

test.skip('Min and Max Price selection in search filter', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.navigateToSearchResultsWithKeyword();
  await searchPage.selectPriceRange(appConfig.SRPPage.minPrice, appConfig.SRPPage.maxPrice); 
  const results = page.locator('.search-results-grid-container');
  await expect(results.first()).toBeVisible({ timeout: 10000 });
});

test.skip('Min and Max Price Validation in Search Filter', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.navigateToSearchResultsWithKeyword();
  await searchPage.selectPriceRange(appConfig.SRPPage.minPrice, appConfig.SRPPage.maxPrice);
  await searchPage.setPriceRange(Number(appConfig.SRPPage.minPrice),Number(appConfig.SRPPage.maxPrice));
  //await searchPage.validatePriceRange(Number(appConfig.SRPPage.minPrice), Number(appConfig.SRPPage.maxPrice));
});

test.skip('Sort by Lowest Price', async ({ page }) => {
  const listingPage = new ListingPage(page);
  // Navigate to URL
  await listingPage.goto();
  // Select "Lowest Price" from sort dropdown
  await listingPage.selectSortOption('Lowest Price');
  // Get all prices from the result list
  const prices = await listingPage.getAllPrices();
  // Assert the prices are sorted in ascending order
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);

  await page.waitForTimeout(50000);
});

test('Sort by Highest Price', async ({ page }) => {
  const listingPage = new ListingPage(page);
  // Navigate to URL
  await listingPage.goto();
  // Select "Highest Price" from sort dropdown
  await listingPage.selectSortOption('Highest Price');
  // Get all prices from the result list
  const prices = await listingPage.getAllPrices();
  // Assert the prices are sorted in descending order
  const sortedPrices = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sortedPrices);
  await page.waitForTimeout(50000);
});
