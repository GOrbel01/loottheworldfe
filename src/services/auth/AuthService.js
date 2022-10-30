import axios from 'axios';
import { properties } from '../../properties/properties.js'
import { authHeader } from '../../index.js';

const URL_BASE = properties.baseUrl;
const AUTH_URL_BASE = properties.baseUrl + "auth";
const AUTH_URL_BASE_B = properties.baseUrl + properties.weaponPath + properties.pathPlural;      

    export function getCurrentUser() {
        return axios.get(URL_BASE + "user/current", authHeader)
    }

    export function authLogin(loginRequest) {
        return this.request({url: AUTH_URL_BASE + '/login', method: 'POST', body: loginRequest})
    }

    export function authUser(item) {
        return axios.post(AUTH_URL_BASE, item, {  
            headers: {
                'content-type': 'application/json'
            }
        });

    }
