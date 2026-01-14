import {expect, test} from "@playwright/test";
import {CategoryPage} from "../pages/category-page";

const categoryForTesting = "Odeća | Ženska";
const BASE_URL = "https://kupujemprodajem.com/" as const;

/**
 * @description
 * Pretraga po sledećim kriterijumima (kategorija “Odeća | Ženska”, grupa “Bluze”, cena od
 * 100 din, samo sa cenom, stanje “Novo” i “Kao novo (ne korišćeno)”) treba ustanoviti da
 * imamo više od 1000 rezultata za ovakvu pretragu.
 */
test("", async ({page}) => {
    const categoryPage = new CategoryPage(page);

    await categoryPage.goToPath(BASE_URL)

    await categoryPage.acceptCookies();
    await page.getByLabel(categoryForTesting).click();

    await categoryPage.selectSubcategory("Bluze")

    await categoryPage.filters.setPriceFrom(100)
    await categoryPage.filters.selectCurrencyRSD();
    await categoryPage.filters.selectCondition("Novo")
    await categoryPage.filters.selectCondition("Nekorišćeno (polovno)")
    await categoryPage.filters.applyFilters();

    const numberOfPosts = await categoryPage.getResultsCount();
    console.log(`Current number of posts: ${numberOfPosts}`);
    expect(numberOfPosts).toBeGreaterThanOrEqual(1000);
  }
);