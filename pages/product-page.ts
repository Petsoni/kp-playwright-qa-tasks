import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class ProductPage extends BasePage {
  private readonly userSummarySection: Locator;
  private readonly addToContactListButton: Locator;

  constructor(page: Page) {
    super(page);
    this.userSummarySection = page.locator(".UserSummary_userSummary__FPJwA");
    this.addToContactListButton = this.userSummarySection.locator("button", {hasText: "Dodajte u adresar"});
  }

  async addToContactList() {
    await this.addToContactListButton.click();
  }

  async isAddToContactVisible() {
    return await this.addToContactListButton.isVisible({ timeout: 2000 }).catch(() => false);
  }
}