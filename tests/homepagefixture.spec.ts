import {test, expect} from '../src/fixtures/pagefixtures'

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage()
    await loginPage.doLogin('pwtestbatch@open.com', 'pw123')
})

test('home page title test @smoke', async({ homePage }) => {
    const pageTitle = await homePage.getHomePageTitle()
    console.log('home page title', pageTitle);
    expect(pageTitle).toBe('My Account')
})

test('logout link exist test @smoke', async({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy()
})

test('home page headers exist test @regression', async({ homePage }) => {
    let allHeaders = await homePage.getHomePageHeaders()
    console.log("home page headers", allHeaders);
    expect.soft(allHeaders).toHaveLength(4)
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
})

//common features test:
test('@smoke App logo exists on Login Page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke Search Box exists on Login Page', async ({ basePage }) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('@smoke Cart exists on Login Page', async ({ basePage }) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test('@smoke Footers exists on Login Page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});