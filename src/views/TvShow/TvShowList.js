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

import { Link } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import apiClient from "../../apiClient";
import { getImageUrl } from "../../utils";
import "../../components/movie/MovieCard/MovieCard.css";
import Pagination from "../../components/Pagination/Pagination";

export default function TvShowLanding() {
  const [serials, setSerials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allSerials, setAllSerials] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [disable, setDisable] = useState(false);

  const fetchTvSeries = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: `/discover/tv?page=${page}`,
        method: "GET",
      });
      setLoading(false);
      console.log("response", res);
      setSerials(res.data.results);
      setAllSerials(res.data.results);
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
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };

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
  }, [page]);

  const onChangeHandler = (e) => {
    const query = e.target.value;
    if (!e.target.value) {
      e.preventDefault();
      setSerials(allSerials);
      return;
    }
    let filteredSerialList = allSerials.filter((serial) =>
      serial.name.toLowerCase().includes(query.toLowerCase())
    );
    setSerials(filteredSerialList);
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
      {/* <div className="search-bar">
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          placeholder="Enter here for search"
          onChange={(e) => onChangeHandler(e)}
        />
      </div> */}
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
            return (
              <Link style={{ textDecoration: "none" }} key={serial.id} to={""}>
                <Card className="border-0 pakflix-main">
                  <Card.Body className="movie1-box">
                    <Row
                      style={{
                        background: serial.backgroundColor,
                      }}
                      className="movie-1 "
                    >
                      <Col xs={3}>
                        <img
                          src={getImageUrl(serial.poster_path)}
                          className=" px-1 py-3 image-1"
                        />
                      </Col>
                      <Col className="image1-text" xs={7}>
                        <h5>{serial.name}</h5>
                        <Row>
                          <Col>
                            <p>Serial</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        className="d-flex jutify-content-between flex-column py-4 px-2"
                        xs={2}
                      >
                        <div>
                          <BsHeart color={"white"} size={"20"} />
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="star-icon me-1 mt-4"
                            icon={faStar}
                          />
                          <span className="rating">
                            {" "}
                            {serial.vote_average}{" "}
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Link>
            );
          })}
        </>
      )}

      <Pagination
        onPreviousClick={() => setPage(page - 1)}
        onNextClick={() => setPage(page + 1)}
      />
    </>
  );
}
