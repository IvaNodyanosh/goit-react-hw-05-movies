import { Suspense, useEffect, useState, useRef } from 'react';
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from 'react-router-dom';

import css from './MovieDetails.module.css';

import imgError from '../../img/imgError.jpg';

import getInformationFilm from 'components/api/function/getInformationMovie';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [dataStatus, setDataStatus] = useState('');
  const { movieId } = useParams();

  const location = useLocation();

  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    setDataStatus('loading');
    getInformationFilm(movieId)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log(data.title);
        setMovieDetails(data);
        setDataStatus('ok');
      })
      .catch(error => {
        console.error(error);
        setDataStatus('error');
      });
  }, [movieId]);

  return (
    <>
      {dataStatus === 'ok' && (
        <div>
          <div className={css.movie__back}>
            <Link to={backLinkHref.current}>Go to back</Link>
          </div>

          <div className={css.movie__box}>
            <img
              src={
                movieDetails.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`
                  : imgError
              }
              alt={movieDetails.title}

              className={css.movie__img}
            />
            <div className={css.movie__info}>
              {' '}
              <h1>{movieDetails.title}</h1>
              <p>User score {movieDetails.vote_average.toFixed(1) * 10}%</p>
              <h2>Overview</h2>
              <p>{movieDetails.overview}</p>
              <ul>
                {movieDetails.genres.map(genre => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </div>
          </div>
          <h3 className={css.additional__title}>Additional information</h3>
          <ul className={css.movie__list}>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
