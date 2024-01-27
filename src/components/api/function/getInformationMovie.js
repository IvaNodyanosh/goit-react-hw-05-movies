import parametersApi from '../parametersApi';

const { baseUrl, key } = parametersApi;

const getInformationFilm = id => {
  return fetch(`${baseUrl}movie/${id}?api_key=${key}`);
};

export default getInformationFilm;
