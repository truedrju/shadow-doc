export async function get200(fullRoute) {
    try {
        let res = await fetch(fullRoute)
        let data = await res.json()
        if (res.status != 200) {
            throw `${res.status} from server : ${JSON.stringify(data)}`
        }
        return data
    } catch (e) {
        throw `could not GET ${fullRoute} : ${e}`
    }
}

export async function getSite200(fullRoute) {
    try {
        let res = await fetch(fullRoute)
        let data = await res.text()
        if (res.status != 200) {
            throw `${res.status} from server : ${JSON.stringify(data)}`
        }
        return data
    } catch (e) {
        throw `could not GET ${fullRoute} : ${e || e.message}`
    }
}

export async function getNoCORS(fullRoute) {
    try {
        let res = await fetch(fullRoute, {
            mode: "no-cors",
        })

        return res
    } catch (e) {
        throw `could not GET ${fullRoute} : ${e}`
    }
}

export async function get200WToken(path, token) {
    try {
        let res = await fetch(path, {
            mode: "no-cors",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        let data = await res.json()
        if (res.status != 200) {
            throw `${res.status} from server : ${JSON.stringify(data)}`
        }
        return data
    } catch (e) {
        throw `could not GET ${path} : ${e}`
    }
}


export async function postForm200(fullRoute, body) {
    try {
        let res = await fetch(fullRoute, {
            body: body,
            method: "POST",
        })
        return await res.text()
    } catch (error) {
        throw `could not POST ${fullRoute} : ${error}`
    }
}

export async function post200(fullRoute, body) {
    try {
        let res = await fetch(fullRoute, {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
        try {
            return await res.json()
        } catch (e) {
            throw Error("fuck : " + e)
        }
    } catch (error) {
        throw `could not POST ${fullRoute} : ${error}`
    }
}


export async function deleteForm200(fullRoute, body) {
    try {
        let res = await fetch(fullRoute, {
            body: body,
            method: "DELETE",
        })
        return await res.text()
    } catch (error) {
        throw `could not POST ${fullRoute} : ${error}`
    }
}

export const encodeParams = (p) =>
    Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&")

