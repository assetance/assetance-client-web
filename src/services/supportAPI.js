import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '/demoData/support/',
  withCredentials: false,
});

export default {
  getAvailability() {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('availability.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
};
