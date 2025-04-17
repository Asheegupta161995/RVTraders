import { Page, Locator, expect } from '@playwright/test';
import appConfig from '../config.json';

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToSearchResultsWithKeyword() {
    await this.page.goto(appConfig.HomePage.homeUrlWithKeyword);
  }

  async navigateToSearchResultsWithoutKeyword() {
    await this.page.goto(appConfig.HomePage.homeUrlWithoutKeyword);
  }

  async verifyModelInURL(make: string) {
    const url = this.page.url();
    expect(url).toContain(`make=${encodeURIComponent(make)}`);
  }

  async verifyModelNotInURL(make: string) {
    const url = this.page.url();
    expect(url).not.toContain(`make=${encodeURIComponent(make)}`);
  }
  
  async selectModel(modelName: string) {

    const modelSection = this.page.getByRole('button', { name: /^Model(\s*\(\d+\))?$/i });
    await expect(modelSection).toBeVisible({ timeout: 50000 });
    await modelSection.click();

    const keywordInput = this.page.locator('//input[placeholder="Find a model"]');
    if (await keywordInput.isVisible({ timeout: 50000 }).catch(() => false)) {
      await keywordInput.fill(modelName);
    }

    const checkbox = this.page.getByRole('checkbox', { name: new RegExp(modelName, 'i') });
    //await expect(checkbox).toBeVisible({ timeout: 5000 });
    await checkbox.check();
   // await expect(checkbox).toBeVisible({ timeout: 5000 });
}

async selectModelWithoutKeyword(makeName: string) {

  const makeSection = this.page.getByRole('button', { name: /^Make(\s*\(\d+\))?$/i });
  await expect(makeSection).toBeVisible();
  await makeSection.click();

  const keywordInputMake = this.page.locator('input[id="v-105"]');
  if (await keywordInputMake.isVisible({ timeout: 3000 }).catch(() => false)) {
    await keywordInputMake.fill(makeName);
  }

  const checkbox = this.page.getByRole('checkbox', { name: new RegExp(makeName, 'i') });
  await expect(checkbox).toBeVisible({ timeout: 50000 });
  await checkbox.check();

  await expect(checkbox).toBeVisible({ timeout: 50000 });
}

async selectPriceRange(minPrice: string, maxPrice: string) {
  const priceSection = this.page.getByRole('button', { name: /^Price(\s*\(\d+\))?$/i });
  await expect(priceSection).toBeVisible();
  await priceSection.click();

  const minPriceInput = this.page.locator('#v-19');
  const maxPriceInput = this.page.locator('#v-20');

  await expect(minPriceInput).toBeVisible({ timeout: 5000 });
  await expect(maxPriceInput).toBeVisible({ timeout: 5000 });

  await minPriceInput.fill(minPrice);
  await maxPriceInput.fill(maxPrice );

}

//async validatePriceRange(min: number, max: number) {
  //const results = this.page.locator('.search-results-grid');
  //const count = await results.count();

  //for (let i = 0; i < count; i++) {
    //const priceText = await results.nth(i).locator('span.tide-font-700').textContent();

    //const priceLocator = results.nth(i).locator('span.tide-font-700');
//await priceLocator.waitFor({ state: 'visible' });

//const priceText = await priceLocator.textContent();
//if (!priceText) {
 // throw new Error(`❌ No price found for result at index ${i}`);
//}

//console.log(`✅ Price text: ${priceText}`);

      //  const price = parseInt(priceText?.replace(/[^\d]/g, '') || '0', 10);

    //expect(price).toBeGreaterThanOrEqual(min);
    //expect(price).toBeLessThanOrEqual(max);
  //}

  //console.log(`✅ All ${count} listings are within the range $${min} - $${max}`);
//}

async setPriceRange(minPrice: number, maxPrice: number) {
  //const min = Number(minPrice);
  //const max = Number(maxPrice);

  // 🔍 Validation: Ensure both values are numbers and min is not greater than max
  if (typeof minPrice !== 'number' || isNaN(minPrice) || typeof maxPrice !== 'number' || isNaN(maxPrice)) {
    throw new Error('❌ Min or Max price is not a valid number.');
  }

  if (minPrice > maxPrice) {
    throw new Error(`❌ Min price ($${minPrice}) should not be greater than Max price ($${maxPrice}).`);
  }

  const minPriceInput = this.page.locator('#v-19');
  const maxPriceInput = this.page.locator('#v-20');

  await expect(minPriceInput).toBeVisible({ timeout: 5000 });
  await expect(maxPriceInput).toBeVisible({ timeout: 5000 });

  //await minPriceInput.fill(minPrice);
  //await maxPriceInput.fill(maxPrice);

  // Wait for the filter to be applied
  //await this.page.waitForLoadState('networkidle');
}

}
