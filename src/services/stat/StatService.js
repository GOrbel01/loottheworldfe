import axios from 'axios';
import { properties } from '../../properties/properties.js'

const STAT_URL_BASE = properties.baseUrl + properties.statPath;
const STAT_URL_BASE_B = properties.baseUrl + properties.statPath + properties.pathPlural;

class StatService {

    getStats(){
        return axios.get(STAT_URL_BASE_B);
    }

    getStatsLookup(){
        return axios.get(STAT_URL_BASE_B + '/lookup');
    }

    createStat(stat){
        return axios.post(STAT_URL_BASE, stat);
    }

    getStatById(statId){
        return axios.get(STAT_URL_BASE + '/' + statId);
    }

    updateStat(statId, stat){
        return axios.put(STAT_URL_BASE + '/' + statId, stat);
    }

    deleteStat(statId){
        return axios.delete(STAT_URL_BASE + '/' + statId);
    }
}

export default new StatService()