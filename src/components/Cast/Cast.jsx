import getCastFilm from '../api/function/getCastFilm';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css'
import imgError from '../../img/imgError.jpg';

const Cast = () => {
  const [casts, setCast] = useState(null);
  const [dataStatus, setDataStatus] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    setDataStatus('loading');
    getCastFilm(movieId)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => {
        setCast(data.cast);
        setDataStatus('ok');
      })
      .catch(error => {
        console.error(error);
        setDataStatus('error');
      });
  }, [movieId]);

  return (
    <>
      <ul>
        {dataStatus === 'ok' &&
          casts.map(cast => (
            <li key={cast.cast_id} className={css.cast__item}>
              <img
                src={cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : imgError}
                alt={cast.name}
              />
              <div className={css.cast__box}>
                <h3>{cast.name}</h3>
                <p>Character: {cast.character}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Cast;
