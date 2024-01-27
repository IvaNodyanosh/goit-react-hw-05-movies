import parametersApi from '../parametersApi';

const { baseUrl, key } = parametersApi;

const getReviewsFilm = id => {
  return fetch(`${baseUrl}movie/${id}/reviews?api_key=${key}`);
};

export default getReviewsFilm;
