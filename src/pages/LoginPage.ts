import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{

    //private Locators
    private readonly emailId: Locator
    private readonly password: Locator
    private readonly loginBtn: Locator
    private readonly forgottenPasswordLink: Locator
    private readonly appLogo: Locator
    private readonly loginErrorMessage: Locator
    private readonly registerLink: Locator

    //constructor of the class to init the locators
    constructor(page: Page){
        super(page)
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' })
        this.password = page.getByRole('textbox', { name: 'Password' })
        this.loginBtn = page.getByRole('button', { name: 'Login' })
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first()
        this.appLogo = page.getByAltText('naveenopencart')
        this.loginErrorMessage = page.locator(`#account-login > div.alert`)
        this.registerLink = page.getByRole('link', { name: 'Register' }).last()
    }

    //public page actions method
    async goToLoginPage(): Promise<void> {
        await this.page.goto("opencart/index.php?route=account/login")
    }

    async getLoginPageTitle(): Promise<string> {
        return await this.page.title()
    }

    async isForgotPwdLinkExist(): Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible()
    }

    async doLogin(username: string, password: string) {
        console.log(`user credentials ${username} : ${password}`)
        await this.emailId.fill(username)
        await this.password.fill(password)
        await this.loginBtn.click()
    }

    async isInvalidLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginErrorMessage.isVisible()
    }

    async goToRegistrationPage(){
        await this.registerLink.click()
    }


}