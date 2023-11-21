import axios from 'axios';
import axiosRetry from 'axios-retry';

const apiClient = axios.create({
  baseURL: 'https://ipapi.co/json/?key=lArtPAkCTi77UIMwIPA6pTbGZqzJYpK9LEsiZZHcUKmxIszlu8',
  withCredentials: false,
  timeout: 1500,
  headers: {
    Accept: 'application/json',
  },
});

// axiosRetry logic
axiosRetry(apiClient, {
  retries: 2,
  retryDelay: 0
});

export default {
  getIpData() {
    return apiClient
      .get()
      .then((res) => {
        return res.data;
      })

      .catch((error) => {
        // TODO:: triggering server webhook alarm with the error message
        console.log(error);
        return false;
      });
  },
};
