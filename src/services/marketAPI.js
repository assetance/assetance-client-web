import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '/demoData/market',
  withCredentials: false,
});

export default {
  /* general */
  getSelectionOptions() {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('/offers/selectionOptions.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  /* -- offers -- */
  // artilce getters
  /**
   * 
   * @param {String} propertyId property Id to fetch offers for
   * @param {String} query query string to be concatincated in the request
   * @param {Number} num DEMO ONLY PARAM, REMOVE WHEN CONNECTED TO BACKEND
   */
  getPropertyOffers({propertyId, query}, num) {
    // using promise for setTimeout to simulate api call waiting time
    if (num == 1) {
        return new Promise((resolve) => {
          setTimeout(() => {
            apiClient.get('/offers/[propertyId]/page1.json').then((res) => {
              resolve(res.data);
            });
          }, 400);
        });
    } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            apiClient.get('/offers/[propertyId]/page2.json').then((res) => {
              resolve(res.data);
            });
          }, 400);
        });

    }
  },
};
