import { test as base } from "@playwright/test";
import { CategoryTestOptions } from "../models/category-test.options";
import { expect } from "@playwright/test";

export const goToCategoryPage = base.extend<CategoryTestOptions>({
  categoryName: "Odeća | Ženska", // fallback vrednost, stavljena je ista jer nema opcija za Sve proizvode
  page: async ({ page, categoryName }, use) => {
    console.log(`Fixture setup for category: ${categoryName}`);

    await page.goto("https://kupujemprodajem.com")

    await page.getByRole("link", { name: categoryName }).click();

    console.log(`Currently on page: ${await page.title()}`)

    await use(page);
  }
});