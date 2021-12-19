import React from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import useFavorites from '../../../contexts/FavouriteContext';
import './MovieCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { getImageUrl } from '../../../utils';

export default function MovieCard(props) {
  const { favorites, toggleFavorites } = useFavorites();

  return (
    <Card className='border-0 pakflix-main'>
      <Card.Body className='movie1-box'>
        <Row
          style={{
            background: props.movie.backgroundColor,
          }}
          className='movie-1 '
        >
          <Col xs={10}>
            <Link
              style={{ textDecoration: 'none' }}
              key={props.movie.id}
              to={'/movies/' + props.movie.id}
            >
              <Row>
                <Col xs={3}>
                  <img
                    src={getImageUrl(props.movie.poster_path)}
                    className=' px-1 py-3 image-1'
                  />
                </Col>
                <Col className='image1-text' xs={9}>
                  <h5>{props.movie.title}</h5>
                  <Row>
                    <Col>
                      <p>Movie</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Link>
          </Col>

          <Col
            className='d-flex jutify-content-between flex-column py-4 px-2'
            xs={2}
          >
            <div onClick={() => toggleFavorites({...props.movie,favouriteType:"movie"})}>
              {props.isAddedToFavorite ? (
                <BsHeartFill color={'red'} size={'20'} />
              ) : (
                <BsHeart color={'white'} size={'20'} />
              )}
            </div>
            <div>
              <FontAwesomeIcon className='star-icon me-1 mt-4' icon={faStar} />
              <span className='rating'> {props.movie.vote_average} </span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
