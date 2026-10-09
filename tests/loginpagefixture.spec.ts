import {test, expect} from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CsvHelper'
import { JsonHelper } from '../src/utils/JsonHelper'

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage()
})

test('login page title test', async({ loginPage }) => {
    const pageTitle = await loginPage.getLoginPageTitle()
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login')
})

test('forgot pwd link exist test', async({ loginPage }) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy()
})

test('user is able to login to app test', async({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!)
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy()
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account')
})

//DD_1. with fixture - sequence mode - only 1 test is running with test data
//one by one using testdata from fixture
test('login to app using wrong credentials with data driven test', async({ loginPage, testData }) => {
    for(let row of testData){
        await loginPage.doLogin(row.username, row.password)
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy()
    }
})

//DD_2. without fixture, parallel mode - read csv directly and loop the test method row wise

let testData = CsvHelper.readCsv('src/data/logindata.csv')
for(let row of testData){
    test(`invalid login test directly from csv data driven - ${row.username}`, async({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password)
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy()
    })
}

//DD - reading from json
let loginJsonData = JsonHelper.readJson('src/data/logindata.json')
for(let row of loginJsonData){
    test.only(`invalid login test directly from json data driven - ${row.username}`, async({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password)
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy()
    })
}