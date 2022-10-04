import axios from 'axios';

const ITEM_URL_BASE = "http://localhost:8080/api/v1/armor";
const ITEM_URL_BASE_2 = "http://localhost:8080/api/v1/armors";

class ArmorService {

    getItems(){
        return axios.get(ITEM_URL_BASE_2);
    }

    createItem(item) {
        return axios.post(ITEM_URL_BASE, item);
    }

    getItemById(id){
        return axios.get(ITEM_URL_BASE + '/' + id);
    }
}

export default new ArmorService()