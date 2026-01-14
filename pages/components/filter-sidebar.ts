import {Locator, Page} from "@playwright/test";

export class FilterSidebar {
  private readonly searchFormContainer: Locator;
  private readonly priceFromInput: Locator;
  private readonly priceToInput: Locator;
  private readonly rsdCurrencyRadio: Locator;
  private readonly eurCurrencyRadio: Locator;
  private readonly filterButton: Locator;

  constructor(page: Page) {
    this.searchFormContainer = page.locator('.Box_box__I64b_');
    this.priceFromInput = this.searchFormContainer.locator('input[name="priceFrom"]');
    this.priceToInput = this.searchFormContainer.locator('input[name="priceTo"]');
    this.rsdCurrencyRadio = this.searchFormContainer.locator('input[value="rsd"]');
    this.eurCurrencyRadio = this.searchFormContainer.locator('input[value="eur"]');
    this.filterButton = this.searchFormContainer.locator('button', {hasText: 'Filtrirajte rezultate'});
  }

  async setPriceFrom(price: number) {
    await this.priceFromInput.fill(String(price));
  }

  async setPriceTo(price: number) {
    await this.priceToInput.fill(String(price));
  }

  async selectCurrencyRSD() {
    await this.rsdCurrencyRadio.check();
  }

  async selectCurrencyEUR() {
    await this.eurCurrencyRadio.check();
  }

  async selectCondition(conditionName: string) {
    await this.searchFormContainer.locator('label').filter({hasText: conditionName}).click();
  }

  async applyFilters() {
    await this.filterButton.click();
    await this.filterButton.waitFor({state: 'visible'});
  }
}