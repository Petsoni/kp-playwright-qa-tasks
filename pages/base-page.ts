import {Locator, Page} from "@playwright/test";

export class BasePage {
  private readonly page: Page;
  private readonly acceptCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.getByRole('button', {name: 'Prihvatam'});
  }

  async goToPath(path: string = "/") {
    await this.page.goto(path);
  }

  async goToProduct(productSelector: string) {
    await this.page.locator(productSelector).first().click();
  }

  async acceptCookies() {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
  }

  protected parseNumber(text: string): number {
    return parseInt(text.replace(/\D/g, '')) || 0;
  }
}