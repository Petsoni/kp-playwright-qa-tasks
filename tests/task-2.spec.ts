import {expect, test} from "../fixtures/page-objects";

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
// test("Task 2 with ad checking for 'Dodaj u adresar' button", async ({productPage, page}) => {
//       let adPostWithContactInformationFound = false;
//
//       for (let i = 0; i < 5; i++) {
//           const currentCard = page.locator(".AdItemCard_container__UcY89").nth(i);
//
//           await currentCard.click();
//
//           if (await productPage.isAddToContactVisible()) {
//               await productPage.addToContactList();
//               adPostWithContactInformationFound = true;
//               return;
//           } else {
//               console.log(`Ad ${i + 1} lacks the button 'Dodajte u adresar'. Going back...`);
//               await page.goBack();
//
//               await page.waitForURL('**/');
//               await page.locator(".AdItemCard_container__UcY89").first().waitFor({state: 'visible'});
//           }
//
//       }
//
//
//       if (adPostWithContactInformationFound) {
//           const loginModal = page.locator(".LoginModal_modal__FxuKf");
//           await expect(loginModal, {message: "Login modal should be visible when clicking add"}).toBeVisible();
//           await expect(loginModal).toContainText("Ulogujte se");
//       } else {
//           expect(adPostWithContactInformationFound, "None of the ad items had 'Dodajte u adresar' button").toBe(true);
//       }
//
//
//   }
// );
