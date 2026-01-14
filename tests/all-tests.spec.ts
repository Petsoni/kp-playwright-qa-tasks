import {expect, test} from "@playwright/test";

const categoryForTesting = "Odeća | Ženska";

// test.describe(`Testing for category ${categoryForTesting}`, () => {
//
//   test.use({categoryName: categoryForTesting});
//
//   test("Go to desired category page", async ({page, categoryName}) => {
//     console.log(`Currently on page ${category}`);
//   })
// })

test('Pretraga ženskih bluza sa specifičnim filterima treba da vrati preko 1000 rezultata', async ({page}) => {
    await page.goto('https://www.kupujemprodajem.com/');

    const acceptCookies = page.getByRole('button', {name: 'Prihvatam'});
    if (await acceptCookies.isVisible()) {
      await acceptCookies.click();
    }

    // Click the category in sidebar
    const categoryLink = page.getByLabel(categoryForTesting);
    await categoryLink.waitFor({state: 'visible', timeout: 5000});
    await categoryLink.click({force: true});

    await page.getByLabel('Bluze').first().click();

    await page.locator('input[name="priceFrom"]').fill('100');
    await page.getByRole("radio", {name: "rsd"}).check();

    await page.locator('label').filter({hasText: 'Novo'}).click();
    await page.locator('label').filter({hasText: 'Nekorišćeno (polovno)'}).click();

    await page.locator('label').filter({hasText: 'Samo sa cenom'}).click();

    await page.getByRole('button', {name: 'Pretraži', exact: true}).click();

  }
);