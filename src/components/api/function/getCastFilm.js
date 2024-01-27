import parametersApi from '../parametersApi';

const { baseUrl, key } = parametersApi;

const getCastFilm = id => {
    return fetch(`${baseUrl}movie/${id}/credits?api_key=${key}`);
};

export default getCastFilm;
