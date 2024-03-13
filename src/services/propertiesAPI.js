import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '/demoData/properties/',
  withCredentials: false,
});

export default {
  getSnippets(query) {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('propertiesSnippets.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  getSnippetsByQuery(query) {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('propertiesSnippetsQueried.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  getSelectOptions() {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('selectOptions.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
};
