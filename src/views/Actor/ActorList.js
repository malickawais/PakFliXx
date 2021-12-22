import React, { useState, useEffect } from "react";
import ActorCard from "../../components/Actor/ActorCard";
import apiClient from "../../apiClient";
import useFavorites from "../../contexts/FavouriteContext";

import { Spinner, Row, Col, Button, FormControl } from "react-bootstrap";
import Pagination from "../../components/Pagination/Pagination";
import "./ActorList.css";

export default function ActorList() {
  const [actors, setActors] = useState([]);
  const [allActors, setAllActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { favorites, toggleFavorites } = useFavorites();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [disable, setDisable] = useState(false);

  const onChangeHandler = (e) => {
    const query = e.target.value;
    setQuery(query);
  };
  const fetchActors = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: "/person/popular?page=" + page,
        method: "GET",
      });
      setLoading(false);
      console.log("response", res);
      setActors(res.data.results);
      setAllActors(res.data.results);
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
  }, [page]);

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
              const isAddedToFavorite = favorites.find(
                (fav) => fav.id === actor.id
              );

              return (
                <Col className="my-2" md={3}>
                  <ActorCard
                    actor={actor}
                    isAddedToFavorite={isAddedToFavorite}
                  />
                </Col>
              );
            })}
          </>
        )}
      </Row>

      <Pagination
        onPreviousClick={() => setPage(page - 1)}
        onNextClick={() => setPage(page + 1)}
      />
    </>
  );
}
