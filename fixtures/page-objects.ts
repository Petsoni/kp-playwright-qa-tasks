import { test as base } from "@playwright/test";
import { ProductPage } from "../pages/product-page";
import { CategoryPage } from "../pages/category-page";
import { BasePage } from "../pages/base-page";
import {PageFixtures} from "../models/page-fixtures.model";

const BASE_URL = "https://kupujemprodajem.com/";


export const test = base.extend<PageFixtures>({
  basePage: async ({ page }, use) => {
    const bp = new BasePage(page);
    await page.goto(BASE_URL);
    await bp.acceptCookies();
    await use(bp);
  },

  productPage: async ({ page, basePage }, use) => {
    const pp = new ProductPage(page);
    await use(pp);
  },

  categoryPage: async ({ page, basePage }, use) => {
    const cp = new CategoryPage(page);
    await use(cp);
  },
});

export { expect } from "@playwright/test";