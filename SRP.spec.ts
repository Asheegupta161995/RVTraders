import { test } from '@playwright/test';
import { SearchPage } from '../Pages/SearchPage';
import appConfig from '../config.json';

test('Model selection in search filter with keyword', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.navigateToSearchResults();
  await searchPage.selectModel(appConfig.SRPPage.filterModel);
});
