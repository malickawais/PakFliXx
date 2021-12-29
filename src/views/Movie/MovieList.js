import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Spinner,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import "../../components/movie/MovieCard/MovieCard.css";
import apiClient from "../../apiClient";
import useFavorites from "../../contexts/FavouriteContext";
import MovieCard from "../../components/movie/MovieCard/MovieCard";
import "./MovieList.css";
import { useSearchParams, useLocation } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import ActorCard from "../../components/Actor/ActorCard";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { favorites, toggleFavorites } = useFavorites();
  const [rating, setRating] = useState("7-10");
  const [ratingMinimum, setRatingMinimum] = useState(7);
  const [ratingMaximum, setRatingMaximum] = useState(10);
  const [query, setQuery] = useState("");
  const [disable, setDisable] = useState(false);
  const [actor, setActor] = useState();
  const [genreMovies, setGenreMovies] = useState("");
  const [generes, setGeneres] = useState([]);
  const [totalPages, setTotalPages] = useState();
  // const [currentPage, setCurrentPage] = useState();

  const { search } = useLocation();

  let searchParams = new URLSearchParams(search);

  //
  const fetchPersonById = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: `/person/${searchParams.get("person_id")}`,
        method: "GET",
      });
      setLoading(false);
      console.log("response", res);
      setActor(res.data);
      // setAllMovies(res.data.results);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };

  const onChangeSearchHandler = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  const fetchMovies = async (_page) => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: `/discover/movie?page=${_page}&vote_average.gte=${ratingMinimum}&vote_average.lte=${ratingMaximum}&with_cast=${searchParams.get(
          "person_id"
        )}&with_genres=${genreMovies}`,
        method: "GET",
      });
      setLoading(false);
      console.log("response", res);
      setMovies(res.data.results);
      setAllMovies(res.data.results);
      setTotalPages(res.data.total_pages);
      setPage(res.data.page);
      console.log(res.data.page);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };
  const searchMovies = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: "/search/movie?query=" + query,
        method: "GET",
      });
      setLoading(false);
      console.log("response", res);
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
      setPage(res.data.page);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };

  // get person id and genre id from search params

  const personId = searchParams.get("person_id");
  const genreId = searchParams.get("genre_id");

  useEffect(() => {
    fetchMovies();
  }, [ratingMaximum, ratingMinimum, genreMovies, personId]);

  const onSubmit = (e) => {
    e.preventDefault();
    searchMovies();
  };

  const onSelectHandler = (e) => {
    let query = e.target.value;
    setRating(e.target.value);
    let querySplit = query.split("-");
    setRatingMinimum(querySplit[0]);
    setRatingMaximum(querySplit[1]);
  };
  const onGenreSelectHandler = (e) => {
    setGenreMovies(e.target.value);
  };

  const fetchGenres = async (genreType) => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: `/genre/movie/list`,
        method: "GET",
      });
      setLoading(false);
      console.log("response", res);
      setGeneres(res.data.genres);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };

  // this use effect will run only first time when there is
  // genre_id or person_id in the url search params
  useEffect(() => {
    if (personId) {
      fetchPersonById();
    }
    if (genreId) {
      setGenreMovies(searchParams.get("genre_id"));
    }
  }, [personId, genreId]);

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      <div className="movie-list-wrapper">
        <Row>
          <Col xs={3}>
            {searchParams.get("person_id") && actor && (
              <div className="Actor-card">
                <ActorCard actor={actor} movieListVeiw={true} />{" "}
              </div>
            )}
          </Col>
          <Col xs={searchParams.get("person_id") ? 9 : 12}>
            <form onSubmit={onSubmit} className="search-bar-actor">
              <Row>
                <Col xs={8}>
                  <FormControl
                    value={query}
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    placeholder="Enter here for search"
                    onChange={(e) => onChangeSearchHandler(e)}
                  />
                </Col>
                <Col className="px-2" xs={2}>
                  <Button
                    type="submit"
                    disabled={query === "" || loading}
                    onClick={onSubmit}
                    variant="dark"
                  >
                    Submit
                  </Button>
                </Col>
                <Col className="px-2" xs={2}>
                  <Button
                    disabled={query == ""}
                    onClick={() => {
                      setQuery("");
                      fetchMovies();
                    }}
                    variant="dark"
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </form>

            <div className="search-bar">
              <Form.Select value={rating} onChange={onSelectHandler}>
                <option value="1-3">1-3</option>
                <option value="4-7">4-7</option>
                <option value="7-10">7+</option>
              </Form.Select>
            </div>
            <div className="search-bar">
              <Form.Select value={genreMovies} onChange={onGenreSelectHandler}>
                {generes.map((genre) => {
                  return <option value={genre.id}>{genre.name}</option>;
                })}
              </Form.Select>
            </div>
            {loading ? (
              <div className="spinner">
                <Spinner
                  className={"ms-2"}
                  size="lg"
                  animation="border"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <>
                <Pagination
                  onPreviousClick={() => fetchMovies(page - 1)}
                  onNextClick={() => fetchMovies(page + 1)}
                  // currentPage={currentPage}
                  totalPages={totalPages}
                  page={page}
                />
              </>
            )}
            {movies.map((movie) => {
              const isAddedToFavorite = favorites.find(
                (fav) => fav.id === movie.id
              );
              return (
                <MovieCard
                  movie={movie}
                  isAddedToFavorite={isAddedToFavorite}
                />
              );
            })}

            {loading ? (
              <div className="spinner">
                <Spinner
                  className={"ms-2"}
                  size="lg"
                  animation="border"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <>
                <Pagination
                  onPreviousClick={() => fetchMovies(page - 1)}
                  onNextClick={() => fetchMovies(page + 1)}
                  // currentPage={currentPage}
                  page={page}
                  totalPages={totalPages}
                />
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
