import { store } from "./Redux/Store"

export interface IApiProps {
    url: string,
    method?: string,
    body?: string,
}

export const callGet = async (url: string) => {

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }

    let requestBody = {
        method: "GET",
        headers: headers,
        mode: 'cors',

    }

    let response = await callApi(url, requestBody)
    return response


}

export const callPost = async (url: string, body:any = null, authorizationToken = null, isBlob = false) => {

    let headers
    if (isBlob && authorizationToken !== null) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${authorizationToken}`
        }
    }
    else if(authorizationToken !== null) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${authorizationToken}`
        }
    }
    else {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }

    let requestBody = {
        method: "POST",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    }


    let response = await callApi(url, requestBody, isBlob)

    return response

}
export const callPostFiles = async (url: string, body:any[] = [], authorizationToken = null, isBlob = false) => {

    const files = new FormData()

    body.forEach(e => {
        files.append(e.name, e)
    });
    
    
    let requestBody = {
        method: "POST",
        mode: 'cors',
        headers:{
            'Content-Disposition': 'form-data; name="files",'
        },
        body: files
    }


    let response = await callApi(url, requestBody, isBlob)

    return response

}

export const callDelete = async (url: string, body: any, authorizationToken = null) => {

    let headers;

    if(authorizationToken !== null) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${authorizationToken}`
        }
    }
    else {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let requestBody = {
        method: "DELETE",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    }


    let response = await callApi(url, requestBody)

    return response

}

export const callPatch = async (url: string, body: any, authorizationToken = null) => {

    let headers;

    if(authorizationToken !== null) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${authorizationToken}`
        }
    }
    else {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let requestBody = {
        method: "PATCH",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    }


    let response = await callApi(url, requestBody)

    return response

}
export const callPut = async (url: string, body: any, authorizationToken = null) => {

    let headers;

    if(authorizationToken !== null) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${authorizationToken}`
        }
    }
    else {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let requestBody = {
        method: "PUT",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    }


    let response = await callApi(url, requestBody)

    return response

}

const callApi = async (url:any, requestBody:any, isBlob = false) => {
    console.log((store.getState().user as any)?.accessToken, "xdddd")
    const response = await fetch(url, requestBody)
    let responseObject = {
        response: null as any,
        body: null,
        ok: response.ok,
        status: response.status
    }
    responseObject.response = response
    let body;
    if (!isBlob) {
        body = await (await response?.blob())?.text()
        try {
            body = JSON.parse(body)
        } catch (error) {
        }
    } else {
        body = await (await response?.blob() || null)
    }
    responseObject.body = body

    return responseObject;
}