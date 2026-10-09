
import {test, expect} from '../../src/fixtures/apifixture'
import { ApiHelper } from '../../src/utils/APIHelper'

const TOKEN = process.env.API_TOKEN
let AUTH_HEADER = {Authorization: `Bearer ${TOKEN}`}
let userId: number

test.describe.serial('running e2e go rest crud api tests', () => {

    test('GET API -- get all users', async({ apiHelper }) => {
        let response = await apiHelper.get('/public/v2/users', AUTH_HEADER)
        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    })

    test('POST API -- create a user', async({ apiHelper }) => {
        let requestBody = {
            "name" : "david",
            "email" : `david_automation${Date.now()}@pw.com`,
            "gender" : "male",
            "status" : "active"
        }
        let response = await apiHelper.post('/public/v2/users', requestBody, AUTH_HEADER)
        expect(response.status).toBe(201)
        expect(response.body.name).toBe(requestBody.name)
        expect(response.body.gender).toBe(requestBody.gender)
        userId = response.body.id
        console.log('Created user id: ', userId);

    })

    test('PUT API -- update a user', async({ apiHelper }) => {
        let requestBody = {
            "name" : "david updated",
            "status" : "inactive"
        }
        let response = await apiHelper.put(`/public/v2/users/${userId}`, requestBody, AUTH_HEADER)
        expect(response.status).toBe(200)
        expect(response.body.name).toBe(requestBody.name)
        expect(response.body.status).toBe(requestBody.status)

    })

    test('DELETE API -- update a user', async({ apiHelper }) => {
    
        let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER)
        expect(response.status).toBe(204)
    })
})