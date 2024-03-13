import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '/demoData/propertiesSnapshot.json',
  withCredentials: false,
});

export default {
  getAll() {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get().then((res) => {
          resolve(res.data.data);
        });
      }, 400);
    });
  },
};
