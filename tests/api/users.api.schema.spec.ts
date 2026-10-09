import {test, expect} from '../../src/fixtures/apifixture'
import { Ajv } from 'ajv'
import { ApiHelper } from '../../src/utils/APIHelper'

const TOKEN = process.env.API_TOKEN
let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
}

let ajv = new Ajv()

//define JSON Schema
let userSchema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
}

let userArraySchema = {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "number"
      },
      "name": {
        "type": "string"
      },
      "email": {
        "type": "string"
      },
      "gender": {
        "type": "string"
      },
      "status": {
        "type": "string"
      }
    },
    "required": [
      "id",
      "name",
      "email",
      "gender",
      "status"
    ]
  }
}
test('GET a user', async({ apiHelper }) => {

    let userData = {
        name: 'schema test',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    }

    let createResponse = await apiHelper.post("/public/v2/users", userData, AUTH_HEADER)
    let userId = createResponse.body.id

    //get a user
    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER)
    expect(getUserResponse.status).toBe(200)

    //schema
    let validate = ajv.compile(userSchema)
    let isSchemaValid = validate(getUserResponse.body)

    if(!isSchemaValid){
        console.log("Schema Errors: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy()

})

test('GET all users', async({ apiHelper }) => {


    //get all user
    let getUserResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER)
    expect(getUserResponse.status).toBe(200)

    //schema
    let validate = ajv.compile(userArraySchema)
    let isSchemaValid = validate(getUserResponse.body)

    if(!isSchemaValid){
        console.log("Schema Errors: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy()

})