import { Page, Locator, expect } from '@playwright/test';
import appConfig from '../config.json';

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToSearchResults() {
    await this.page.goto(appConfig.HomePage.homeurl);
  }

  async selectModel(modelName: string) {
    const modelSection = this.page.getByRole('button', { name: /^Model(\s*\(\d+\))?$/i });
    await expect(modelSection).toBeVisible();
    await modelSection.click();

    const keywordInput = this.page.locator(`xpath-input[id="v-128"]`);
    if (await keywordInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await keywordInput.fill(modelName);
      await this.page.waitForTimeout(1000); // Wait for model list to update
    }

    const checkbox = this.page.getByRole('checkbox', { name: new RegExp(modelName, 'i') });
    await expect(checkbox).toBeVisible({ timeout: 5000 });
    await checkbox.check();

    await expect(checkbox).toBeVisible({ timeout: 5000 });

  }

}
