import axios from 'axios';
import { properties } from '../../../properties/properties.js'
import { authHeader } from '../../../index.js';

const ITEM_URL_BASE = properties.baseUrl + properties.weaponPath;
const ITEM_URL_BASE_B = properties.baseUrl + properties.weaponPath + properties.pathPlural;

class WeaponService {

    getItems(){
        return axios.get(ITEM_URL_BASE_B, authHeader);
    }

    createItem(item) {
        return axios.post(ITEM_URL_BASE, item, authHeader);
    }

    getItemById(id){
        return axios.get(ITEM_URL_BASE + '/' + id, authHeader);
    }

    updateItem(id, item) {
        return axios.put(ITEM_URL_BASE + '/' + id, item, authHeader);
    }
}

export default new WeaponService()