import {expect, test} from "../fixtures/page-objects";

/**
 * @description
 * Pretraga po sledećim kriterijumima (kategorija “Odeća | Ženska”, grupa “Bluze”, cena od
 * 100 din, samo sa cenom, stanje “Novo” i “Kao novo (ne korišćeno)”) treba ustanoviti da
 * imamo više od 1000 rezultata za ovakvu pretragu.
 */
test("Task 1", async ({categoryPage, page}) => {
    await page.getByLabel("Odeća | Ženska").click();

    await categoryPage.selectSubcategory("Bluze")

    await categoryPage.filters.setPriceFrom(100)
    await categoryPage.filters.selectCurrencyRSD();
    await categoryPage.filters.selectCondition("Novo")
    await categoryPage.filters.selectCondition("Nekorišćeno (polovno)")
    await categoryPage.filters.applyFilters();

    const numberOfPosts = await categoryPage.getResultsCount();
    expect(numberOfPosts).toBeGreaterThanOrEqual(1000);
  }
);
