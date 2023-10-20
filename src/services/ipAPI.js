import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    'https://ipapi.co/json/?key=lArtPAkCTi77UIMwIPA6pTbGZqzJYpK9LEsiZZHcUKmxIszlu8',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

export default {
  getIpData() {
    return apiClient
      .get()
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        // TODO:: setting a default a dynamic fallback value
        return {
          languages: 'US',
          currency: 'USD',
          country_name: 'United States',
          currency_name: 'Dollare',
        };
      });
  },
};
