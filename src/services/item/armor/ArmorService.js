import axios from 'axios';
import { properties } from '../../../properties/properties.js'

const ITEM_URL_BASE = properties.baseUrl + properties.armorPath;
const ITEM_URL_BASE_B = properties.baseUrl + properties.armorPath + properties.pathPlural;

class ArmorService {

    getItems(){
        return axios.get(ITEM_URL_BASE_B);
    }

    createItem(item) {
        return axios.post(ITEM_URL_BASE, item);
    }

    getItemById(id){
        return axios.get(ITEM_URL_BASE + '/' + id);
    }

    updateItem(id, item) {
        return axios.put(ITEM_URL_BASE + '/' + id, item);
    }
}

export default new ArmorService()