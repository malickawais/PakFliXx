import React, { useState, useEffect } from 'react';
import ActorCard from '../../components/Actor/ActorCard';
import apiClient from '../../apiClient';
import useFavorites from '../../contexts/FavouriteContext';

import { Spinner, Row, Col, Button } from 'react-bootstrap';
import Pagination from '../../components/Pagination/Pagination';

export default function ActorList() {
  const [actors, setActors] = useState([]);
  const [allActors, setAllActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { favorites, toggleFavorites } = useFavorites();
  const [page, setPage] = useState(1);

  const fetchActors = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: '/person/popular?page=' + page,
        method: 'GET',
      });
      setLoading(false);
      console.log('response', res);
      setActors(res.data.results);
      setAllActors(res.data.results);
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActors();
  }, [page]);

  if (loading) {
    return (
      <Spinner className={'ms-2'} size='lg' animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Row className='m-4'>
        {actors.map((actor) => {
          const isAddedToFavorite = favorites.find(
            (fav) => fav.id === actor.id
          );

          return (
            <Col className='my-2' md={3}>
              <ActorCard actor={actor} isAddedToFavorite={isAddedToFavorite} />
            </Col>
          );
        })}
      </Row>
      <Pagination
        onPreviousClick={() => setPage(page - 1)}
        onNextClick={() => setPage(page + 1)}
      />
    </>
  );
}
