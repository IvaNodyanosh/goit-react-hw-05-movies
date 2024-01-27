import getReviewsFilm from './api/function/getReviewsFilm';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [dataStatus, setDataStatus] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    setDataStatus('loading');
    getReviewsFilm(movieId)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(data => {
        setReviews(data.results);
        setDataStatus('ok');
      })
      .catch(error => {
        console.error(error);
        setDataStatus('error');
      });
  }, [movieId]);

  return (
    <ul>
      {dataStatus === 'ok' && reviews.length !== 0 ? (
        reviews.map(review => {
          return (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          );
        })
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </ul>
  );
};

export default Reviews;
