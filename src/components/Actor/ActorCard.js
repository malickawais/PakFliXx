import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { getImageUrl } from '../../utils';
import useFavorites from '../../contexts/FavouriteContext';
import {
  BsHeart,
  BsHeartFill,
  BsPersonCheck,
  BsPersonCircle,
  BsPersonSquare,
} from 'react-icons/bs';
import './ActorCard.css';
import { NavLink } from 'react-router-dom';

export default function ActorCard(props) {
  const { favorites, toggleFavorites } = useFavorites();
 

  const knownFor = props.actor?.known_for;
  console.log(knownFor);

  return (
    <Card className='actor'>
      <Row className='w-75 position-relative'>
        <Col className='p-2' key={props.actor.id}>
          {props.actor.profile_path ? (
            <img
              className='actor-img'
              src={getImageUrl(props.actor.profile_path)}
              alt=''
            />
          ) : (
            <BsPersonCircle size={'150'} color={'black'} />
          )}
        </Col>

        <div
          className='favourite-actor-container'
          onClick={() => toggleFavorites({...props.actor, favouriteType:"actor"})} 
          
          
        >
          <div>
            {props.isAddedToFavorite ? (
              <BsHeartFill color={'red'} size={'20'} />
            ) : (
              <BsHeart color={'black'} size={'20'} />
            )}
          </div>
        </div>
      </Row>

      <p className='actor-name'>{props.actor.name}</p>
      <div className='known-for p-2'>
        {knownFor?.slice(0, 2).map((movieOrSeason) => {
          return (
            <Badge bg='info' className='me-2'>
              {movieOrSeason.title}
            </Badge>
          );
        })}
        <NavLink
          style={{ textDecoration: 'none' }}
          to={'/movies?person_id=' + props.actor.id}
        >
          <Badge bg='primary' className='me-2'>
            More
          </Badge>
        </NavLink>
      </div>
      <p className='known-for-depart'>
        Know for Department:{' '}
        <Badge bg='info'> {props.actor.known_for_department} </Badge>
      </p>
    </Card>
  );
}
