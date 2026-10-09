import {test, expect} from '@playwright/test'

let OAUTH_CONFIG = {
    tokenURL: "https://accounts.spotify.com/api/token",
    client_id: process.env.OAUTH_CLIENT_ID!,
    client_secret: process.env.OAUTH_CLIENT_SECRET!,
    grant_type: process.env.GRANT_TYPE!
}

let accessToken: string

test.beforeEach('POST - Generate the access token', async({ request }) => {

    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form:{
            client_id: OAUTH_CONFIG.client_id,
            client_secret: OAUTH_CONFIG.client_secret,
            grant_type: OAUTH_CONFIG.grant_type
        }
    })

    expect(response.status()).toBe(200)
    let jsonResponse = await response.json()
    console.log(jsonResponse);
    accessToken = jsonResponse.access_token

})

test("POST - Create & Get a Playlist", async({ request }) => {

    let requestBody = {
        "name": "New Playlist",
        "description": "New playlist description",
        "public": false
    }

    let response = await request.post("https://api.spotify.com/v1/me/playlists", {
        headers: {
            "Authorization" : "Bearer " + accessToken,
            "Content-Type" : "application/json"
        },
        data: requestBody
    })


    console.log("Status:", response.status());
    console.log("Status Text:", response.statusText());

    const responseBody = await response.json();
    console.log("Response:", responseBody);

    expect(response.status()).toBe(201)
    
    expect(responseBody.name).toBe(requestBody.name);
    expect(responseBody.description).toBe(requestBody.description);
    expect(responseBody.public).toBe(requestBody.public);

    //GET A Playlist
    let getResponse = await request.get("https://api.spotify.com/v1/me/playlists/${playlistID}", {
        headers: {
            "Authorization" : `Bearer ${accessToken}`
        },
    })
    
    expect(response.status()).toBe(200);
    const getResponseBody = await response.json();
    console.log(getResponseBody);
   // expect(getResponseBody.id).toBe(playlistId);

})