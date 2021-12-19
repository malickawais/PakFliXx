import React, { useState } from 'react';
import { FavoriteProvider } from '../../contexts/FavouriteContext';
import useFavorites from '../../contexts/FavouriteContext';
import MovieCard from '../../components/movie/MovieCard/MovieCard';
import { Badge, Col, Row,Alert } from 'react-bootstrap';
import "./Favourites.css"
import ActorCard from '../../components/Actor/ActorCard';
import { NavLink } from 'react-router-dom';


export default function FavouriteList() {
  const { favorites, toggleFavorites } = useFavorites();
  const actor = favorites.filter(fav=> fav.favouriteType==="actor")
  const movie = favorites.filter(fav=> fav.favouriteType==="movie")
  
  return (
    <div>
      <h4 className='m-2'>Movies/Tv Shows  <Badge bg="dark">{movie.length}</Badge></h4>
      {movie.length > 0 ? (
        
      <div className='favourites d-flex flex-row '>  
      {movie.map((fav) => {
        const isAddedToFavorite = favorites.find((fav) => fav.id === fav.id);
        return(   
        
          <div className='me-2'>
        <MovieCard movie={fav} isAddedToFavorite={isAddedToFavorite} />
        </div>
        )     
      })}
      </div>
      ) : ( 
            <Alert variant='danger'>There is No Favourite Movie Click on {" "}
            <NavLink to="/movies" >Movie List</NavLink> to add favourite movie
            </Alert>
            
      ) }
      
      <h4 className='m-4'>Actors  <Badge bg="dark">{actor.length}</Badge> </h4>
      {actor.length > 0 ? (
      <div className='favourites d-flex flex-row '>  
      {actor.map((fav) => {
        const isAddedToFavorite = favorites.find((fav) => fav.id === fav.id);
        return(       
          <div className='me-2 actor-wrapper'>
        <ActorCard actor={fav} isAddedToFavorite={isAddedToFavorite} />
        </div>
        )     
      })}
      </div> ) : (
            <Alert variant='danger'>There is No Favourite Movie Click on {" "}
           <NavLink to="/actors" >Actor List</NavLink> {" "}to add favourite actor
            </Alert>)}
    </div>
    
  );
}