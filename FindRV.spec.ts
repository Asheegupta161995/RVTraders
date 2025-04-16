
import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import appConfig from '../config.json';

test('Search for RV using full form under "Find your next RV"', async ({ page }) => {
    const home = new HomePage(page);
    await home.navigate();
    await home.searchRV(
      appConfig.HomePage.selectType,
      appConfig.HomePage.searchKeyword,
      appConfig.HomePage.searchZipCode,
      appConfig.HomePage.searchMiles
    );
  });
