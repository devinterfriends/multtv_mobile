import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://mid.multtv.tv.br/',
});

const errorHandler = error => {
  throw new Error(error);
};

export const post = (url, data, headers) =>
  axiosClient
    .post(url, data, {headers})
    .then(response => response.data)
    .catch(errorHandler);

export const get = (url, query) =>
  axiosClient
    .get(`${url}?${query}`)
    .then(response => response.data)
    .catch(errorHandler);

export const patch = (url, data, query) =>
  axiosClient
    .patch(`${url}?${query}`, data)
    .then(response => response.data)
    .catch(errorHandler);

export const exclude = url => axiosClient.delete(url).catch(errorHandler);
