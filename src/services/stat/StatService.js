import axios from 'axios';

const STAT_URL_BASE = "http://localhost:8080/api/v1/stat";
const STAT_URL_BASE_B = "http://localhost:8080/api/v1/stats";

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

    updateStat(stat, statId){
        return axios.put(STAT_URL_BASE + '/' + statId, stat);
    }

    deleteStat(statId){
        return axios.delete(STAT_URL_BASE + '/' + statId);
    }
}

export default new StatService()