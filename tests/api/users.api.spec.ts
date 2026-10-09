import {test, expect} from '@playwright/test'

let AUTH_TOKEN = {
    Authorization: 'Bearer 0e652eb1e7c4e397edf8431cc58727be5cf8eb139f7b6f0a2162d0bbd365f5d5'
}

test('get user test', async({ request }) => {

    let response = await request.get("https://gorest.co.in/public/v2/users/8648253", {
        headers: AUTH_TOKEN
    })

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

})

test('create a user test', async({ request }) => {

    let requestBody = {
        "name" : "david",
        "email" : `david_automation${Date.now()}@pw.com`,
        "gender" : "male",
        "status" : "active"
    }

    //JS Object to JSON: Serialization
    let response = await request.post("https://gorest.co.in/public/v2/users", {
        headers: AUTH_TOKEN,
        data: requestBody
    })

    expect(response.status()).toBe(201);
    expect(response.statusText()).toBe("Created")

    const responseBody = await response.json();
    console.log(responseBody);

    //validaton on response json
    expect(requestBody.name).toBe(requestBody.name)
    expect(requestBody.gender).toBe(requestBody.gender)
    expect(requestBody.status).toBe(requestBody.status)

})

// test('update a user test', async({ request }) => {

//     let requestBody = {
//         "name" : "david101",
//         "email" : `david_automation${Date.now()}@pw.com`,
//         "gender" : "male",
//         "status" : "inactive"
//     }

//     //JS Object to JSON: Serialization
//     let response = await request.put("https://gorest.co.in/public/v2/users/8648262", {
//         headers: AUTH_TOKEN,
//         data: requestBody
//     })

//     expect(response.status()).toBe(200);
//     expect(response.statusText()).toBe("OK")

//     const responseBody = await response.json();
//     console.log(responseBody);

//     // //validaton on response json
//     // expect(requestBody.name).toBe(requestBody.name)
//     // expect(requestBody.gender).toBe(requestBody.gender)
//     // expect(requestBody.status).toBe(requestBody.status)
    
// })

// test('delete a user test', async({ request }) => {


//     //JS Object to JSON: Serialization
//     let response = await request.delete("https://gorest.co.in/public/v2/users/8648263", {
//         headers: AUTH_TOKEN
//     })

//     expect(response.status()).toBe(204);
//     expect(response.statusText()).toBe("No Content")

    
// })