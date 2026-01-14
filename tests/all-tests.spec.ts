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
    console.log(`Current number of posts: ${numberOfPosts}`);
    expect(numberOfPosts).toBeGreaterThanOrEqual(1000);
  }
);

/**
 * @description
 * Iz otvorenog oglasa kada probamo da dodamo u Adresar da nam se traži forma za login.
 */
test("Task 2", async ({productPage, page}) => {
    await productPage.goToProduct(".AdItemCard_container__UcY89");

    await productPage.addToContactList();

    const loginModal = page.locator(".LoginModal_modal__FxuKf");
    await expect(loginModal, {message: "Login modal should be visible when clicking add"}).toBeVisible();
    await expect(loginModal).toContainText("Ulogujte se");
  }
);

/**
 * @description
 * Iz otvorenog oglasa kada probamo da dodamo u Adresar da nam se traži forma za login.
 * Ako za određeni oglas ne postoji dugme za dodavanje u adresar, naći sledeći oglas koji ima to dugme
 */
test("Task 2 with ad checking for 'Dodaj u adresar' button", async ({productPage, page}) => {
    let adPostWithContactInformationFound = false;

    for (let i = 0; i < 5; i++) {
      const currentCard = page.locator(".AdItemCard_container__UcY89").nth(i);

      await currentCard.click();

      if (await productPage.isAddToContactVisible()) {
        await productPage.addToContactList();
        adPostWithContactInformationFound = true;
        return;
      } else {
        console.log(`Ad ${i + 1} lacks the button 'Dodajte u adresar'. Going back...`);
        await page.goBack();

        await page.waitForURL('**/');
        await page.locator(".AdItemCard_container__UcY89").first().waitFor({state: 'visible'});
      }

    }


    if (adPostWithContactInformationFound) {
      const loginModal = page.locator(".LoginModal_modal__FxuKf");
      await expect(loginModal, {message: "Login modal should be visible when clicking add"}).toBeVisible();
      await expect(loginModal).toContainText("Ulogujte se");
    } else {
      expect(adPostWithContactInformationFound, "None of the ad items had 'Dodajte u adresar' button").toBe(true);
    }


  }
);
