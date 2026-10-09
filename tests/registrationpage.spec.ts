import {test, expect} from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CsvHelper'

test.beforeEach(async({ loginPage}) => {
    await loginPage.goToLoginPage()
    await loginPage.goToRegistrationPage()
})


let registrationData = CsvHelper.readCsv("src/data/registrationdata.csv")
for(let row of registrationData){
    test(`test all the registration data ${row.firstname}`, async({ registrationPage }) => {
        expect(await registrationPage.isRegisterAccountHeaderExist()).toBeTruthy()
        let sucessMessage = await registrationPage.doRegister(row.firstname,
                    row.lastname,
                    row.email,
                    row.telephone,
                    row.password)
        console.log(`success messsage to be: ${sucessMessage}`);
        expect(sucessMessage).toBe('Your Account Has Been Created!')
    })
}