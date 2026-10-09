import { Locator, Page } from "@playwright/test"

export class RegistrationPage {

    private readonly page: Page
    private readonly registerAccountHeader: Locator
    private readonly firstName: Locator
    private readonly lastName: Locator
    private readonly email: Locator
    private readonly telePhone: Locator
    private readonly password: Locator
    private readonly confirmPassword: Locator
    private readonly privacyCheckbox: Locator
    private readonly continueBtn: Locator
    private readonly accountSuccessMessage: Locator
    
    constructor(page: Page){
        this.page = page
        this.registerAccountHeader = page.locator('#content').getByRole('heading', { name: 'Register Account' });
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-Mail' });
        this.telePhone = page.getByRole('textbox', { name: 'Telephone' });
        this.password = page.locator('#input-password')
        this.confirmPassword = page.locator('#input-confirm');
        this.privacyCheckbox = page.locator('[name="agree"]');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.accountSuccessMessage = page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 });
    }

    async isRegisterAccountHeaderExist(): Promise<boolean> {
        await this.registerAccountHeader.waitFor({ state: 'visible' });
        return await this.registerAccountHeader.isVisible() 
    }

    async doRegister(firstname: string, lastname: string, email: string, telePhone: string,
        password: string) : Promise<string> {
        
            await this.firstName.fill(firstname)
            await this.lastName.fill(lastname)
            await this.email.fill(email)
            await this.page.waitForTimeout(1000)
            await this.telePhone.fill(telePhone)
            await this.page.waitForTimeout(1000)
            await this.password.fill(password)
            await this.confirmPassword.fill(password)
            await this.page.waitForTimeout(1000)
            await this.privacyCheckbox.click()
            await this.continueBtn.click()
            await this.page.waitForTimeout(4000)
            return await this.accountSuccessMessage.innerText()
    }

}