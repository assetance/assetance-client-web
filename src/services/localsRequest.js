import axios from 'axios';

const apiClient = axios.create({
  baseURL: '../demoData/supportedLocals.json',
  withCredentials: false,
});

export default {
  getSupportedLanguages() {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get().then((res) => {
          resolve(res.data.languages);
        });
      }, 1000);
    });
  },
  getSupportedCurrencies() {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get().then((res) => {
          resolve(res.data.currencies);
        });
      }, 1000);
    });
  },
};
