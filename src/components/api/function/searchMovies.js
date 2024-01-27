import parametersApi from '../parametersApi';

const { baseUrl, key } = parametersApi;

const searchMovies = parameters => {
  let q = '';


    if (parameters.includes(' ')) {
      q = parameters.split(' ').join('+');
    } else {
      q = parameters;
    }
    return fetch(
      `${baseUrl}search/movie?api_key=${key}&query=${q}&include_adult=true`
    );
  
};

export default searchMovies;
