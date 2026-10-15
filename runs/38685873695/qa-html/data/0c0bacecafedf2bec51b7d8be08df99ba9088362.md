# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/users.api.spec.ts >> get user test
- Location: tests/api/users.api.spec.ts:7:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test'
  2  | 
  3  | let AUTH_TOKEN = {
  4  |     Authorization: 'Bearer 0e652eb1e7c4e397edf8431cc58727be5cf8eb139f7b6f0a2162d0bbd365f5d5'
  5  | }
  6  | 
  7  | test('get user test', async({ request }) => {
  8  | 
  9  |     let response = await request.get("https://gorest.co.in/public/v2/users/8648253", {
  10 |         headers: AUTH_TOKEN
  11 |     })
  12 | 
> 13 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  14 | 
  15 |     const responseBody = await response.json();
  16 | 
  17 |     console.log(responseBody);
  18 | 
  19 | })
  20 | 
  21 | test('create a user test', async({ request }) => {
  22 | 
  23 |     let requestBody = {
  24 |         "name" : "david",
  25 |         "email" : `david_automation${Date.now()}@pw.com`,
  26 |         "gender" : "male",
  27 |         "status" : "active"
  28 |     }
  29 | 
  30 |     //JS Object to JSON: Serialization
  31 |     let response = await request.post("https://gorest.co.in/public/v2/users", {
  32 |         headers: AUTH_TOKEN,
  33 |         data: requestBody
  34 |     })
  35 | 
  36 |     expect(response.status()).toBe(201);
  37 |     expect(response.statusText()).toBe("Created")
  38 | 
  39 |     const responseBody = await response.json();
  40 |     console.log(responseBody);
  41 | 
  42 |     //validaton on response json
  43 |     expect(requestBody.name).toBe(requestBody.name)
  44 |     expect(requestBody.gender).toBe(requestBody.gender)
  45 |     expect(requestBody.status).toBe(requestBody.status)
  46 | 
  47 | })
  48 | 
  49 | // test('update a user test', async({ request }) => {
  50 | 
  51 | //     let requestBody = {
  52 | //         "name" : "david101",
  53 | //         "email" : `david_automation${Date.now()}@pw.com`,
  54 | //         "gender" : "male",
  55 | //         "status" : "inactive"
  56 | //     }
  57 | 
  58 | //     //JS Object to JSON: Serialization
  59 | //     let response = await request.put("https://gorest.co.in/public/v2/users/8648262", {
  60 | //         headers: AUTH_TOKEN,
  61 | //         data: requestBody
  62 | //     })
  63 | 
  64 | //     expect(response.status()).toBe(200);
  65 | //     expect(response.statusText()).toBe("OK")
  66 | 
  67 | //     const responseBody = await response.json();
  68 | //     console.log(responseBody);
  69 | 
  70 | //     // //validaton on response json
  71 | //     // expect(requestBody.name).toBe(requestBody.name)
  72 | //     // expect(requestBody.gender).toBe(requestBody.gender)
  73 | //     // expect(requestBody.status).toBe(requestBody.status)
  74 |     
  75 | // })
  76 | 
  77 | // test('delete a user test', async({ request }) => {
  78 | 
  79 | 
  80 | //     //JS Object to JSON: Serialization
  81 | //     let response = await request.delete("https://gorest.co.in/public/v2/users/8648263", {
  82 | //         headers: AUTH_TOKEN
  83 | //     })
  84 | 
  85 | //     expect(response.status()).toBe(204);
  86 | //     expect(response.statusText()).toBe("No Content")
  87 | 
  88 |     
  89 | // })
```