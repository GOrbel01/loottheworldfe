import axios from 'axios';
import { properties } from '../../properties/properties.js'
import { authHeader } from '../../index.js';

const ITEM_URL_BASE = properties.baseUrl + properties.itemPath;
const ITEM_URL_BASE_B = properties.baseUrl + properties.itemPath + properties.pathPlural;

class ItemService {
    getItems(){
        return axios.get(ITEM_URL_BASE_B, authHeader);
    }

    createItem(item) {
        return axios.post(ITEM_URL_BASE, item);
    }
}

export default new ItemService()