import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

const apiClient = (config) => {
  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default apiClient;
