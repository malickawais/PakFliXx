import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import apiClient from "../../apiClient";

export default function GenreList() {
  const [generes, setGeneres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genresType, setGenresType] = useState("movies");

  const fetchGenres = async (genreType) => {
    try {
      setLoading(true);
      const res = await apiClient({
        url: `/genre/${genreType}/list`,
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

  const onSelectHandler = (e) => {
    let genreValue = e.target.value;
    setGenresType(genreValue);
    if (genreValue === "tv") {
      fetchGenres("tv");
    } else if (genreValue === "movie") {
      fetchGenres("movie");
    }
  };

  useEffect(() => {
    fetchGenres("movie");
  }, []);
  return (
    <>
      <div className="search-bar">
        <Form.Select value={genresType} onChange={onSelectHandler}>
          <option value="movie">Movies</option>
          <option value="tv">Tv Shows</option>
        </Form.Select>
      </div>
      <Row className="mx-3">
        {generes.map((genre) => {
          return (
            <Col className="my-2" md={3} key={genre.id}>
              <Card>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`/${genresType}?genre_id=${genre.id}`}
                >
                  <Card.Body>{genre.name}</Card.Body>
                </NavLink>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
