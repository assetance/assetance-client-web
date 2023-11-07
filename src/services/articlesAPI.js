import axios from 'axios';

const apiClient = axios.create({
  baseURL: '../demoData/',
  withCredentials: false,
});

export default {
  getRand() {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('randArticles.json').then((res) => {
          resolve(res.data);
        });
      }, 1000);
    });
  },
};
