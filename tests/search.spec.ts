import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

//Data Provider
const productData = CsvHelper.readCsv('src/data/product.csv');
for (const row of productData) {
    test(`verify search results count @regression  - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage }) => {
        await homePage.doSearch(row.searchkey);
        expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
    });

};

for (const row of productData) {
    test(`verify user is able to land on the product page @regression - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, page }) => {
        await homePage.doSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        expect(await page.title()).toBe(row.productname);
    });
};


// common tests:
test('@smoke comp logo exists on product page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke footers exist on product page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});