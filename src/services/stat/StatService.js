import axios from 'axios';
import { properties } from '../../properties/properties.js'
import { authHeader } from '../../index.js';

const STAT_URL_BASE = properties.baseUrl + properties.statPath;
const STAT_URL_BASE_B = properties.baseUrl + properties.statPath + properties.pathPlural;

class StatService {

    getStats(){
        return axios.get(STAT_URL_BASE_B, authHeader);
    }

    getStatsLookup(){
        return axios.get(STAT_URL_BASE_B + '/lookup', authHeader);
    }

    createStat(stat){
        return axios.post(STAT_URL_BASE, stat, authHeader);
    }

    getStatById(statId){
        return axios.get(STAT_URL_BASE + '/' + statId, authHeader);
    }

    updateStat(stat, statId){
        return axios.put(STAT_URL_BASE + '/' + statId, stat, authHeader);
    }

    deleteStat(statId){
        return axios.delete(STAT_URL_BASE + '/' + statId, authHeader);
    }
}

export default new StatService()