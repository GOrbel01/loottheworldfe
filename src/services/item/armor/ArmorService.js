import axios from 'axios';
import { authHeader } from '../../../index.js';
import { properties } from '../../../properties/properties.js'

const ITEM_URL_BASE = properties.baseUrl + properties.armorPath;
const ITEM_URL_BASE_B = properties.baseUrl + properties.armorPath + properties.pathPlural;

class ArmorService {

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

export default new ArmorService()