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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import useFavorites from "../../contexts/FavouriteContext";
import { Link, useLocation } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import apiClient from "../../apiClient";
import { getImageUrl } from "../../utils";
import "../../components/movie/MovieCard/MovieCard.css";
import Pagination from "../../components/Pagination/Pagination";
import TvSerial from "../../components/TvSerial/TvSerial";

export default function TvShowLanding() {
  const { favorites, toggleFavorites } = useFavorites();

  const [serials, setSerials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allSerials, setAllSerials] = useState([]);
  const [query, setQuery] = useState("");
  const [disable, setDisable] = useState(false);
  const [generes, setGeneres] = useState([]);
  const [genreSerials, setGenreSerials] = useState();
  const [totalPages, setTotalPages] = useState();
  // const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(1);

  const { search } = useLocation();

  let searchParams = new URLSearchParams(search);

  const fetchTvSeries = async (_page) => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: `/discover/tv?page=${_page}&with_genres=${genreSerials}`,
        method: "GET",
      });
      setLoading(false);
      console.log("response", res);
      setSerials(res.data.results);
      setAllSerials(res.data.results);
      setTotalPages(res.data.total_pages);
      setPage(res.data.page);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };
  const searchTvShows = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: "/search/tv?query=" + query,
        method: "GET",
      });
      setLoading(false);
      console.log("response", res);
      setSerials(res.data.results);
      setTotalPages(res.data.total_pages);
      setPage(res.data.page);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };
  const fetchGenres = async (genreType) => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: `/genre/tv/list`,
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
  const onGenreSelectHandler = (e) => {
    setGenreSerials(e.target.value);
  };

  const genreId = searchParams.get("genre_id");

  useEffect(() => {
    setGenreSerials(genreId);
  }, [genreId]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    searchTvShows();
  };
  const onChangeSearchHandler = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  useEffect(() => {
    fetchTvSeries();
  }, [genreSerials]);

  return (
    <>
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
              disabled={query === ""}
              onClick={() => {
                setQuery("");
                fetchTvSeries();
              }}
              variant="dark"
            >
              Clear
            </Button>
          </Col>
        </Row>
      </form>
      <div className="search-bar">
        <Form.Select value={genreSerials} onChange={onGenreSelectHandler}>
          {generes.map((genre) => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </Form.Select>
      </div>
      <Pagination
        onPreviousClick={() => {
          fetchTvSeries(page - 1);
        }}
        onNextClick={() => {
          fetchTvSeries(page + 1);
        }}
        totalPages={totalPages}
        page={page}
      />

      {loading ? (
        <div className="d-flex justify-content-center">
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
          {serials.map((serial) => {
            const isAddedToFavorite = favorites.find(
              (fav) => fav.id === serial.id
            );

            return (
              <Link style={{ textDecoration: "none" }} key={serial.id} to={""}>
                <TvSerial
                  serial={serial}
                  isAddedToFavorite={isAddedToFavorite}
                />
              </Link>
            );
          })}
        </>
      )}

      <Pagination
        onPreviousClick={() => {
          fetchTvSeries();
          setPage(page - 1);
          // setCurrentPage(currentPage - 1);
        }}
        onNextClick={() => {
          fetchTvSeries();
          setPage(page + 1);
          // setCurrentPage(currentPage + 1);
        }}
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}
