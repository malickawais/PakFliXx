import React, { useState, useEffect } from "react";
import ActorCard from "../../components/Actor/ActorCard";
import apiClient from "../../apiClient";
import useFavorites from "../../contexts/FavouriteContext";

import { Spinner, Row, Col, Button, FormControl } from "react-bootstrap";
import Pagination from "../../components/Pagination/Pagination";
import "./ActorList.css";
import ModalPage from "../../components/Modal/Modal";
import MovieDetails from "../../views/MovieDetails/MovieDetails";

export default function ActorList() {
  const [actors, setActors] = useState([]);
  const [allActors, setAllActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { favorites, toggleFavorites } = useFavorites();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [disable, setDisable] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [show, setShow] = useState(false);
  const [movie, setMovie] = useState();

  const onChangeHandler = (e) => {
    const query = e.target.value;
    setQuery(query);
  };
  const fetchActors = async (_page) => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: `/person/popular?page=${_page}`,
        method: "GET",
      });
      setLoading(false);
      console.log("response", res);
      setActors(res.data.results);
      setAllActors(res.data.results);
      setTotalPages(res.data.total_pages);
      setPage(res.data.page);
      // console.log(res.data.page);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };
  const searchActors = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: "/search/person?query=" + query,
        method: "GET",
      });
      setLoading(false);
      console.log("response", res);
      setActors(res.data.results);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActors();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    searchActors();
  };

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
              onChange={(e) => onChangeHandler(e)}
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
                fetchActors();
              }}
              variant="dark"
            >
              Clear
            </Button>
          </Col>
        </Row>
      </form>
      <Pagination
        onPreviousClick={() => fetchActors(page - 1)}
        onNextClick={() => fetchActors(page + 1)}
        page={page}
        totalPages={totalPages}
      />
      <Row className="m-4">
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
            {actors.map((actor) => {
              return (
                <Col key={actor.id} className="my-2" md={3}>
                  <ActorCard
                    actor={actor}
                    hideCrossIcon={true}
                    onBadgeClick={(movie) => {
                      setMovie(movie);
                      setShow(true);
                    }}
                  />
                </Col>
              );
            })}
          </>
        )}
        <ModalPage
          title={movie?.title}
          show={show}
          onHide={() => setShow(false)}
        >
          {movie && <MovieDetails id={movie.id} />}
        </ModalPage>
      </Row>

      <Pagination
        onPreviousClick={() => fetchActors(page - 1)}
        onNextClick={() => fetchActors(page + 1)}
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}
