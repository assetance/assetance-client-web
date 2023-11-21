import axios from 'axios';
import axiosRetry from 'axios-retry';

const apiClient = axios.create({
    baseURL: '../demoData/exchangeRates.json',
    withCredentials: false,
});

// axiosRetry logic
axiosRetry(apiClient, {
    retries: 2,
    retryDelay: 0
});

export default {
    // live api 
    getRates() {
        // using promise for setTimeout to simulate api call waiting time
        return new Promise((resolve) => {
            setTimeout(() => {
                apiClient.get().then((res) => {
                    resolve(res.data.data);
                });
            }, 1000);
        });
    },
    // fallback data to be manually updated every week from public/demoData/exchangeRates.json
    getLocalRates() {
        // using promise for setTimeout to simulate api call waiting time
        return new Promise((resolve) => {
            setTimeout(() => {
                apiClient.get().then((res) => {
                    resolve(res.data.data);
                });
            }, 1000);
        });
    },
};
