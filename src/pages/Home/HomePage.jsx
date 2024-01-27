import getTrendingMovies from 'components/api/function/getMovies';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RotatingSquare } from 'react-loader-spinner';

import css from "./HomePage.module.css"

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [dataStatus, setDataStatus] = useState('');

  const location = useLocation();

  useEffect(() => {
    setDataStatus('loading');
    getTrendingMovies()
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
  }, []);

  return (
    <>
      <ul>
        {dataStatus === 'ok' &&
          movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.home__link}>
                  {movie.original_title}
                </Link>
              </li>
            );
          })}
      </ul>
      {dataStatus === 'loading' && (
        <div className={css.loader}>
          <RotatingSquare
            visible={true}
            height="100"
            width="100"
            color="orangered"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
};

export default HomePage;
