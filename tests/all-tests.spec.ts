import {expect, test} from "@playwright/test";
import {CategoryPage} from "../pages/category-page";
import {ProductPage} from "../pages/product-page";

const categoryForTesting = "Odeća | Ženska";
const BASE_URL = "https://kupujemprodajem.com/" as const;

/**
 * @description
 * Pretraga po sledećim kriterijumima (kategorija “Odeća | Ženska”, grupa “Bluze”, cena od
 * 100 din, samo sa cenom, stanje “Novo” i “Kao novo (ne korišćeno)”) treba ustanoviti da
 * imamo više od 1000 rezultata za ovakvu pretragu.
 */
test("Task 1", async ({page}) => {
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

/**
 * @description
 * Iz otvorenog oglasa kada probamo da dodamo u Adresar da nam se traži forma za login.
 */
test("Task 2", async ({page}) => {
    const productPage = new ProductPage(page);

    await productPage.goToPath(BASE_URL)
    await productPage.acceptCookies();

    await productPage.goToProduct('.AdItemCard_container__UcY89');

    await productPage.addToContactList();

    const loginModal = page.locator("div[class*='LoginModal_modal']");
    await expect(loginModal).toContainText("Ulogujte se");
    await expect(loginModal, {message: "Login modal should be visible when clicking add"}).toBeVisible();
  }
);
