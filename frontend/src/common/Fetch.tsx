
import Cookies from 'js-cookie'
export interface IApiProps {
    url: string,
    method?: string,
    body?: string,
}

export const callGet = async (url: string, isCsrf = true) => {

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }

    if (isCsrf) {
        let csrf = Cookies.get('XSRF-TOKEN')
        //headers['X-XSRF-TOKEN'] = csrf
    }

    let requestBody = {
        method: "GET",
        headers: headers,
        mode: 'cors',

    }

    let response = await callApi(url, requestBody)
    return response


}

export const callPost = async (url: string, body:any = null, isCsrf = true, isFormData = false, isBlob = false) => {


    let headers
    if (isFormData) {
        headers = {
            'Access-Control-Allow-Origin': '*',
        }
    }
    else if (isBlob) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }
    else {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }

    if (isCsrf) {
        const csrf = Cookies.get('XSRF-TOKEN')
        const x = Cookies.get()
        //headers['X-XSRF-TOKEN'] = csrf
    }

    let requestBody = {
        method: "POST",
        headers: headers,
        mode: 'cors',
        body: isFormData ? body : JSON.stringify(body)
        // body: body
    }


    let response = await callApi(url, requestBody, isBlob)

    return response

}

export const callDelete = async (url: string, body: any, isCsrf = true) => {


    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }

    if (isCsrf) {
        const csrf = Cookies.get('XSRF-TOKEN')
        const x = Cookies.get()
        //headers['X-XSRF-TOKEN'] = csrf
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

export const callPatch = async (url: string, body: any, isCsrf = true) => {


    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }

    if (isCsrf) {
        const csrf = Cookies.get('XSRF-TOKEN')
        const x = Cookies.get()
        //headers['X-XSRF-TOKEN'] = csrf
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
export const callPut = async (url: string, isCsrf = true) => {


    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }

    if (isCsrf) {
        const csrf = Cookies.get('XSRF-TOKEN')
        const x = Cookies.get()
        // //headers['X-XSRF-TOKEN'] = csrf
    }

    let requestBody = {
        method: "PUT",
        headers: headers,
        mode: 'cors',
    }


    let response = await callApi(url, requestBody)

    return response

}

const callApi = async (url:any, requestBody:any, isBlob = false) => {
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