import {test, expect} from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CsvHelper'

test.beforeEach(async({ loginPage}) => {
    await loginPage.goToLoginPage()
    await loginPage.goToRegistrationPage()
})


let registrationData = CsvHelper.readCsv("src/data/registrationdata.csv")
for(let row of registrationData){
    test(`test all the registration data ${row.firstname} @regression`, async({ registrationPage }) => {

        const uniqueEmail = `tomjerry${Date.now()}@opencart.com`;

        expect(await registrationPage.isRegisterAccountHeaderExist()).toBeTruthy()
        let sucessMessage = await registrationPage.doRegister(
                    row.firstname,
                    row.lastname,
                    uniqueEmail,
                    row.telephone,
                    row.password)
        console.log(`Registered email: ${uniqueEmail}`);
        console.log(`success messsage to be: ${sucessMessage}`);
        expect(sucessMessage).toBe('Your Account Has Been Created!')
    })
}