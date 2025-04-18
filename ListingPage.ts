import { Page, Locator, expect } from '@playwright/test';
import appConfig from '../config.json';

export class ListingPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
      }

async goto() {
    await this.page.goto('https://qa.dev.rvtrader.com/Forest-River/rvs-for-sale?make=Forest%20River%7C440465&price=50000%3A56000&zip=90001&radius=150', { waitUntil: 'domcontentloaded' });
  }
  
  async selectSortOption(option: string) {
    //await this.page.locator('select.option.flex.axis2-center.padding-y-3\\/4.padding-x-1').selectOption({ label: option });
    //await this.page.waitForLoadState('networkidle'); // Optional wait
    //await this.page.locator('.option.flex.axis2-center.padding-y-3\\/4.padding-x-1').click();

    // Click the desired option from the dropdown list
    //await this.page.locator(`text=${option}`).click();  

    await this.page.pause(); // <-- run once for debugging

    // Try targeting based on visible text
    await this.page.getByText('Sort By').click(); // open dropdown
  
    // Click desired sort option
    await this.page.getByText(option).first().click();

}
  
async getAllPrices(): Promise<number[]> {
    const priceElements = await this.page.locator('.price-class').allTextContents();
  
    const prices = priceElements.map(price => {
      const cleanPrice = price.replace(/[^0-9]/g, '');
      return parseInt(cleanPrice, 10);
    });
  
    // Filter out any NaN values (invalid prices)
    return prices.filter(p => !isNaN(p));
  }
}
