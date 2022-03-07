import axios from 'axios'

const BASE_URL='https://suppliers-api.wildberries.ru'

const products = async (wd_token) => {
    const $card = await axios.create({
        baseURL: `${BASE_URL}/card`,
        headers: {
            Authorization: `Bearer ${wd_token}`,
            'Content-Type': 'application/json'
        }
    })
    $card.interceptors.request.use((config) => {
        return config
    })

    return { $card }
}

const supplies = async (wd_token) => {
    const $supplies = await axios.create({
        baseURL: `${BASE_URL}/supplies`,
        headers: {
            Authorization: `Bearer ${wd_token}`,
            'Content-Type': 'application/json'
        }
    })
    $supplies.interceptors.request.use((config) => {
        return config
    })

    return { $supplies }
}

const api = async (wd_token) => {
    const $v1 = axios.create({
        baseURL: `${BASE_URL}/public/api/v1`,
        headers: {
            Authorization: `Bearer ${wd_token}`,
            'Content-Type': 'application/json'
        }
    })

    $v1.interceptors.request.use((config) => {
        return config
    })

    return { $v1 }
}

export { products, api, supplies }


