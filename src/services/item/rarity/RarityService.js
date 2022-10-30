import axios from 'axios';
import { properties } from '../../../properties/properties.js'
import { authHeader } from '../../../index.js';
import { trimLast } from '../../../functions/global/Utils.js';

const URL_BASE = properties.baseUrl + properties.rarityPath;
const URL_BASE_B = properties.baseUrl + trimLast(properties.rarityPath) + properties.altPathPlural;

class RarityService {

    getRarities(){
        return axios.get(URL_BASE_B, authHeader);
    }

    createRarity(rarity) {
        console.log(rarity);
        return axios.post(URL_BASE, rarity, authHeader);
    }

    getRarityById(id){
        return axios.get(URL_BASE + '/' + id, authHeader);
    }

    updateRarity(id, rarity) {
        return axios.put(URL_BASE + '/' + id, rarity, authHeader);
    }

    updateOrder(orders) {
        return axios.put(URL_BASE + '/' + "orders", orders, authHeader);
    }
}

export default new RarityService()