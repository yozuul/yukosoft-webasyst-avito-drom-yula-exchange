import { $products } from '../http'

export class ProductService {
    static async fetchProducts() {
        return $products.get('/all')
    }
    static async getProductByID(id) {
        return $products.get(`/products/${id}`)
    }
    static async updateProduct(data) {
        return $products.post('/update', data)
    }
}