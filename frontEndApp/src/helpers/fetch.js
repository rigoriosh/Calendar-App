const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`
    //console.log({url})

    if(method === 'GET') return fetch(url);

    return fetch(url, {
        method,
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify(data)
    })
}

export const fetchWithToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`

    if(method === 'GET') return fetch(url, {
        method,
        headers:{
            'x-token': localStorage.getItem('token') || ''
        }
    });

    return fetch(url, {
        method,
        headers:{
            'Content-type': 'application/json',
            'x-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify(data)
    })
}