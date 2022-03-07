import axios from 'axios'

const BASE_URL='http://localhost:5000'

const $account = axios.create({
    withCredentials: true,
    baseURL: `${BASE_URL}/account`
})
const $users = axios.create({
    withCredentials: true,
    baseURL: `${BASE_URL}/users`
})
const $products = axios.create({
    withCredentials: true,
    baseURL: `${BASE_URL}/products`
})
const $supplies = axios.create({
    withCredentials: true,
    baseURL: `${BASE_URL}/supplies`
})
const $settings = axios.create({
    withCredentials: true,
    baseURL: `${BASE_URL}/supplies`
})

let refreshToken = localStorage.getItem('token')

$account.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get(`${BASE_URL}/account/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            return $account.request(originalRequest)
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})
$users.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
$products.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
$supplies.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    console.log(config)
    return config
})

export { $account, $users, $products, $supplies, BASE_URL }