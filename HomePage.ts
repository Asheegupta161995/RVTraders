import { expect, Locator, Page } from '@playwright/test';
import appConfig from '../config.json';

export class HomePage {
  readonly page: Page;
  readonly rvTypeDropdown: Locator;
  readonly keywordInput: Locator;
  readonly zipInput: Locator;
  readonly radiusDropdown: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rvTypeDropdown = page.locator('select[id="popular-type-home-input"]');
    this.keywordInput = page.locator('input[id="keyword-home-input"]');
    this.zipInput = page.locator('input[id="location-home-input"]');
    this.radiusDropdown = page.locator('select[id="radius-home-input"]');
    this.searchButton = page.locator('//button[@data-track="Search Button"]');
  }

  async navigate() {
    await this.page.goto(appConfig.baseUrl);
    await expect(this.page.getByRole('heading', { name: 'Find your next RV' })).toBeVisible();
  }

  async searchRV(type: string, keyword: string, zip: string, radius: string) {
    await this.rvTypeDropdown.selectOption({ label: type });
    await this.keywordInput.fill(keyword);
    await this.zipInput.fill(zip);
    await this.radiusDropdown.selectOption({ label: radius });
    await expect(this.searchButton).toBeEnabled();
    await this.searchButton.click();
    //await this.page.waitForTimeout(3000);
  }
}
