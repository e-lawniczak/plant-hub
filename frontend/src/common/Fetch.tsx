import { store } from "./Redux/Store"

export interface IApiProps {
    url: string,
    method?: string,
    body?: string,
}

export const callGet = async (url: string, auth:boolean=false, isBlob = false) => {

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

    let response = await callApi(url, requestBody, auth, isBlob)
    return response


}

export const callPost = async (url: string, body: any = null, auth: boolean = true, isBlob = false) => {

    let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }

    let requestBody = {
        method: "POST",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    }


    let response = await callApi(url, requestBody, auth, isBlob)

    return response

}
export const callPostFiles = async (url: string, body: any[] = [], auth: boolean = true, isBlob = false) => {

    const files = new FormData()

    body.forEach(e => {
        files.append("files", e)
    });


    let requestBody = {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Disposition': 'form-data; name="files",'
        },
        body: files
    }


    let response = await callApi(url, requestBody, auth, isBlob)

    return response

}

export const callDelete = async (url: string, body: any, auth: boolean = true) => {

    
    let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    

    let requestBody = {
        method: "DELETE",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    }


    let response = await callApi(url, requestBody, auth)

    return response

}

export const callPatch = async (url: string, body: any, auth: boolean = true) => {

    let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

    let requestBody = {
        method: "PATCH",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    }


    let response = await callApi(url, requestBody, auth)

    return response

}
export const callPut = async (url: string, body: any, auth: boolean = true) => {

    let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

    let requestBody = {
        method: "PUT",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    }


    let response = await callApi(url, requestBody, auth)

    return response

}

const callApi = async (url: any, requestBody: any, isAuth:boolean = false, isBlob = false) => {
    let authorizationToken = (store.getState().user as any)?.accessToken;
    if (isAuth) {
        requestBody.headers["Authorization"] = `Bearer ${authorizationToken}`;
        console.log(requestBody)
    }
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