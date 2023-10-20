import axios from 'axios';

const apiClient = axios.create({
  baseURL: '../demoData/userData.json',
  // withCredentials: true,
  // headers: {
  //   Accept: 'application/json',
  //   'Conetent-Type': 'application/json',
  // },
});

export default {
  getUserData() {
    // token is passed using cookies.
    // using promise for setTimeout to simulate api call waiting time.
    return new Promise((resolve) => {
      setTimeout(() => {
        apiClient.get().then((res) => {
          resolve(res.data);
        });
      }, 2000);
    });
  },
};
