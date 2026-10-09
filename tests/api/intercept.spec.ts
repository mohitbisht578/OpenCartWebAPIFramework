//web app -> intercept the network calls and log them\
import {test, expect} from '@playwright/test'

//intercept the network calls
test('intercept and log requests', async({ page }) => {

    await page.route('**/*', async(route) => {
        console.log(route.request().method(), route.request().url())
        await route.continue()
    })

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
})

//intercept the mocking
test('mock search data api', async({ page }) => {

    let fakeProducts = [
        {name: "Fake MacBook Pro", price: "$599"},
        {name: "Fake iPhone 20", price: "$299"}
    ]

    await page.route('**/index.php?route=product/search&search=macbook', async(route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts)
        })
    })

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook')

    await page.pause()

    let fakeJson = await page.evaluate(async() => {
        let fakeRes = await fetch('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook')
        return await fakeRes.json()
    })
})