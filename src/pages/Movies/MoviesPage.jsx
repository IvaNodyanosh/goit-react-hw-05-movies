import { useState, useEffect } from 'react';
import searchMovies from 'components/api/function/searchMovies';
import { Link } from 'react-router-dom';
import { useSearchParams, useLocation } from 'react-router-dom';
import css from "./MoviesPage.module.css"

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [dataStatus, setDataStatus] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const parameters = searchParams.get('query');
  const location = useLocation();

  const onChange = e => {
    const value = e.target.value;
    if (value !== '') {
      return setSearchParams({ query: value });
    }
    return setSearchParams('');
  };

  useEffect(() => {
    if (parameters) {
      setDataStatus('loading');
      searchMovies(parameters)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          } else {
            return response.json();
          }
        })
        .then(data => {
          setMovies(data.results);
          setDataStatus('ok');
        })
        .catch(error => {
          console.error(error);
          setDataStatus('error');
        });
    } else {
      setDataStatus();
    }
  }, [parameters]);

  return (
    <>
      <input type="text" onChange={onChange} placeholder='Search' className={css.movies__input} />

      <ul className={css.movies__list}>
        {dataStatus === 'ok' &&
          movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.movies__link}>
                  {movie.original_title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MoviesPage;
