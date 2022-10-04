import axios from 'axios';

const ITEM_URL_BASE = "http://localhost:8080/api/v1/weapon";
const ITEM_URL_BASE_2 = "http://localhost:8080/api/v1/weapons";

class WeaponService {

    getItems(){
        return axios.get(ITEM_URL_BASE_2);
    }

    createItem(item) {
        return axios.post(ITEM_URL_BASE, item);
    }
}

export default new WeaponService()