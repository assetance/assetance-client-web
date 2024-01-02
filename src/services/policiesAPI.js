import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + '/demoData/',
    withCredentials: false,
});

export default {
    get() {
        // using promise for setTimeout to simulate api call waiting time
        return new Promise((resolve) => {
            setTimeout(() => {
                apiClient.get('policies.json').then((res) => {
                    resolve(res.data);
                });
            }, 3000);
        });
    },
};
