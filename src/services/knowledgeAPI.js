import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '/demoData/knowledge',
  withCredentials: false,
});

export default {
  /* general */
  getCategories() {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('categories.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  /* -- artilces -- */
  // artilce getters
  getRandArticles(count = 10) {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('/articles/randArticles.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  getSupportRandArticles(count = 10) { // "how to" articles 
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('/articles/randArticles.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  getArticlesByCategory(category) { // only using one file for development untill connected with the backend
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('/articles/articles_category.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  getArticleById(id) { // only using one file for development untill connected with the backend
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('/articles/article_ab01d.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  getArticlesByQuery(query) { // only using one file for development untill connected with the backend
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('/articles/articles_query.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  // artilce setters
  setArticleRating(id) { // only using one file for development untill connected with the backend
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(200);
      }, 400);
    });
  },
  /* -- videos -- */
  getRandVideos(count = 10) {
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('/videos/randVideos.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  getVideosByCategory(category) { // only using one file for development untill connected with the backend
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('/videos/videos_category.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
  getVideosByQuery(query) { // only using one file for development untill connected with the backend
    // using promise for setTimeout to simulate api call waiting time
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get('/videos/videos_query.json').then((res) => {
          resolve(res.data);
        });
      }, 400);
    });
  },
};
