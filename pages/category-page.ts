import {Locator, Page} from '@playwright/test';
import {FilterSidebar} from "./components/filter-sidebar";
import {BasePage} from "./base-page";

export class CategoryPage extends BasePage {
  public readonly filters: FilterSidebar;
  private readonly subcategoryList: Locator;
  private readonly breadcrumbBox: Locator;

  constructor(page: Page) {
    super(page);
    this.filters = new FilterSidebar(page);
    this.subcategoryList = page.locator('.GroupList_list__4UNoe');
    this.breadcrumbBox = page.locator('.BreadcrumbBox_breadcrumbBox__XQ_RR');
  }

  async selectSubcategory(name: string) {
    await this.subcategoryList.getByLabel(name).first().click();
  }

  async getResultsCount(): Promise<number> {
    const text = await this.breadcrumbBox.getByText(/oglas/).innerText();
    return this.parseNumber(text);
  }
}