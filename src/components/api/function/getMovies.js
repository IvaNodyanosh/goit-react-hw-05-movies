import parametersApi from '../parametersApi';

const { baseUrl, key } = parametersApi;

const getTrendingMovies = () => {
  return fetch(`${baseUrl}trending/movie/day?api_key=${key}`);
};

export default getTrendingMovies;
