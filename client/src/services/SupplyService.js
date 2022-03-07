import { $supplies } from '../http'

export class SupplyService {
    static async fetchSypplies() {
        return $supplies.get('/all')
    }
}