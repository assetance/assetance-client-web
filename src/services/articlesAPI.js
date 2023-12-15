import axios from 'axios';

const apiClient = axios.create({
  baseURL: '../demoData/articles',
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
  getSupportRand() { // "how to" articles 
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('randArticles.json').then((res) => {
          resolve(res.data);
        });
      }, 1000);
    });
  },
  getCategories() {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('categories.json').then((res) => {
          resolve(res.data);
        });
      }, 1000);
    });
  },
  getByCategory(category) { // only using one file for development untill connected with the backend
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('articles_category.json').then((res) => {
          resolve(res.data);
        });
      }, 1000);
    });
  },
};
