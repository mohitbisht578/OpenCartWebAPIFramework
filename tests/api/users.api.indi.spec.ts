import {test, expect} from '../../src/fixtures/apifixture'
import { ApiHelper } from '../../src/utils/APIHelper'

const TOKEN = process.env.API_TOKEN
let AUTH_HEADER = {Authorization: `Bearer ${TOKEN}`}
let userId: number

//helper
async function createUser(apiHelper: any){
    let requestBody = {
            "name" : "david API",
            "email" : `david_automation${Date.now()}@pw.com`,
            "gender" : "male",
            "status" : "active"
        }
    let response = await apiHelper.post('/public/v2/users', requestBody, AUTH_HEADER)
    expect(response.status).toBe(201)
    return response.body
}

test('POST API -- create a user', async({ apiHelper }) => {

    //create a user
    let userResponse = await createUser(apiHelper)

    //get the user
    let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("david API")
    })

test('PUT API -- update a user', async({ apiHelper }) => {
        
        //create a user
    let userResponse = await createUser(apiHelper)
    let userUpdatedData = {
            "name" : "david API Updated",
            "status" : "inactive"
        }

    //update the user
    let response = await apiHelper.put(`/public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe(userUpdatedData.name)
    expect(response.body.status).toBe(userUpdatedData.status)

    //get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
    expect(getResponse.status).toBe(200)
    expect(getResponse.body.name).toBe(userUpdatedData.name)
    expect(getResponse.body.status).toBe(userUpdatedData.status)

})

test('DELETE API -- delete a user', async({ apiHelper }) => {
        
    //create a user
    let userResponse = await createUser(apiHelper)

    let response = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
    expect(response.status).toBe(204)
    
    //get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
    expect(getResponse.status).toBe(404)
    expect(getResponse.body.message).toBe("Resource not found")

})
