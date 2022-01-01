import React, { useEffect, useState } from "react";

import "./DetailPage.css";

import { useNavigate, useParams } from "react-router";
import apiClient from "../../apiClient";
import useFavorites from "../../contexts/FavouriteContext";
import MovieDetails from "../../components/movie/MovieDetails/MovieDetails";

export default function DetailsPage(props) {
  const [loading, setLoading] = useState(false);

  const [movie, setMovie] = useState({});

  const params = useParams();

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url:
          "/movie/" +
          (params.movieId || props.id) +
          "?append_to_response=videos,movie_credits,credits",
        method: "GET",
      });

      console.log("response", res);
      setMovie(res.data);
      setLoading(false);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.movieId || props.id) {
      fetchMovie();
    }
  }, [params.movieId, props.id]);

  return <MovieDetails loading={loading} movie={movie} />;
}
