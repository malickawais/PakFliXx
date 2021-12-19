import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Spinner,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';
import '../../components/movie/MovieCard/MovieCard.css';
import apiClient from '../../apiClient';
import useFavorites from '../../contexts/FavouriteContext';
import MovieCard from '../../components/movie/MovieCard/MovieCard';
import './MovieList.css';
import { useSearchParams, useLocation } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { favorites, toggleFavorites } = useFavorites();
  const [rating, setRating] = useState('7-10');
  const [ratingMinimum, setRatingMinimum] = useState(7);
  const [ratingMaximum, setRatingMaximum] = useState(10);

  const { search } = useLocation();

  let searchParams = new URLSearchParams(search);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: `/discover/movie?page=${page}&vote_average.gte=${ratingMinimum}&vote_average.lte=${ratingMaximum}&with_cast=${searchParams.get(
          'person_id'
        )}`,
        method: 'GET',
      });
      setLoading(false);
      console.log('response', res);
      setMovies(res.data.results);
      setAllMovies(res.data.results);
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, ratingMaximum, ratingMinimum]);

  const onChangeHandler = (e) => {
    const query = e.target.value;
    if (!e.target.value) {
      e.preventDefault();
      setMovies(allMovies);
      return;
    }
    let filteredMovieList = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(filteredMovieList);
  };
  const onSelectHandler = (e) => {
    let query = e.target.value;
    setRating(e.target.value);
    let querySplit = query.split('-');
    setRatingMinimum(querySplit[0]);
    setRatingMaximum(querySplit[1]);
  };

  return (
    <>
      <div className='search-bar'>
        <FormControl
          placeholder='Username'
          aria-label='Username'
          aria-describedby='basic-addon1'
          placeholder='Enter here for search'
          onChange={(e) => onChangeHandler(e)}
        />
      </div>
      <div className='search-bar'>
        <Form.Select value={rating} onChange={onSelectHandler}>
          <option value='1-3'>1-3</option>
          <option value='4-7'>4-7</option>
          <option value='7-10'>7+</option>
        </Form.Select>
      </div>
      {movies.map((movie) => {
        const isAddedToFavorite = favorites.find((fav) => fav.id === movie.id);
        return (
          <MovieCard movie={movie} isAddedToFavorite={isAddedToFavorite} />
        );
      })}

      {loading ? (
        <div className='spinner'>
          <Spinner
            className={'ms-2'}
            size='lg'
            animation='border'
            role='status'
          >
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Pagination
        onPreviousClick={() => setPage(page - 1)}
        onNextClick={() => setPage(page + 1)}
      />
       
      )}
    </>
  );
}
