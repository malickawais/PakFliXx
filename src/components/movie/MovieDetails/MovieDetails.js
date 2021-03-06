import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Badge,
  Col,
  OverlayTrigger,
  Popover,
  Row,
  Spinner,
} from "react-bootstrap";
import useFavorites from "../../../contexts/FavouriteContext";

import { BsHeart, BsHeartFill, BsPersonCircle } from "react-icons/bs";
import { BiCameraMovie } from "react-icons/bi";
import { getImageUrl } from "../../../utils";
import YoutubeEmbed from "../../Common/YoutubeEmbed/YoutubeEmbed";
import ActorCard from "../../Actor/ActorCard";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function MovieDetails({ movie, loading }) {
  const [showText, setShowText] = useState(false);

  const { favorites, toggleFavorites } = useFavorites();
  const navigate = useNavigate();

  const isAddedToFavorite = favorites.find((fav) => fav.id === movie.id);

  if (loading) {
    return (
      <div className="spinner">
        <Spinner className={"ms-2"} size="lg" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const trailerVid = movie?.videos?.results?.find(
    (vid) => vid.type === "Trailer"
  );
  const director = movie?.credits?.crew?.find(
    (dir) => dir.known_for_department === "Directing"
  );

  const popover = (actor) => (
    <Popover>
      <div className="detailPage-veiw">
        <ActorCard hideCrossIcon={true} actor={actor} />
      </div>
    </Popover>
  );

  return (
    <div>
      <Row className="d-flex w-100 justify-content-center">
        <Col className="border-0 pakflix-wrapper p-4 " md={6}>
          <Row className="w-100">
            <Col xs={4}>
              <FontAwesomeIcon
                onClick={() => navigate("/movies")}
                className="overveiw left-arrow"
                icon={faArrowLeft}
              />
            </Col>
            <Col className="d-flex justify-content-end" xs={8}>
              <div
                className="favourite-movie-wrapper"
                onClick={() => {
                  toggleFavorites({ ...movie, favouriteType: "movie" });
                }}
              >
                <div>
                  {isAddedToFavorite ? (
                    <BsHeartFill color={"red"} size={"20"} />
                  ) : (
                    <BsHeart color={"black"} size={"20"} />
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-4 w-100">
            <Col xs={2}>
              <img
                className="movie-image"
                src={getImageUrl(movie.poster_path)}
                alt=""
              />
            </Col>
            <Col className="ps-4" xs={10}>
              {movie.homepage ? (
                <a className="overveiw" href={movie.homepage} target="_blank">
                  {movie.title}
                </a>
              ) : (
                <>
                  <h4 className="overveiw">{movie.title}</h4> <br />
                </>
              )}
              <p className="overveiw">
                <BiCameraMovie color={"white"} size={"25"} className="me-2" />

                {director?.name}
              </p>

              {movie.genres?.map((gen) => {
                return (
                  <Badge key={gen.id} pill bg="warning" className="me-2">
                    {gen.name}
                  </Badge>
                );
              })}
            </Col>
          </Row>
          <div className="d-flex my-3 justify-content-center">
            {trailerVid && <YoutubeEmbed embedId={trailerVid?.key} />}
          </div>
          <Row className="my-4">
            <Col>
              <h4 className="overveiw">Overveiw</h4>
            </Col>
            <Col className="d-flex justify-content-end">
              <div>
                <FontAwesomeIcon
                  className="star-icon overveiw me-1"
                  icon={faStar}
                />
                <span className="overveiw">9</span>
              </div>
            </Col>
            <p className="overveiw">
              {showText
                ? movie.overview
                : `${movie.overview?.substr(0, 50)}...`}
              <span className="text" onClick={() => setShowText(!showText)}>
                {showText ? " Read Less" : " Read all"}
              </span>
            </p>
          </Row>

          <div className="actors d-flex flex-row">
            {movie.credits?.cast?.map((actor) => (
              <OverlayTrigger
                trigger="click"
                placement="right"
                rootClose
                key={actor.id}
                overlay={popover(actor)}
              >
                <div className="text-center me-2 actor-container">
                  {actor.profile_path ? (
                    <img
                      className="img"
                      src={getImageUrl(actor.profile_path)}
                      alt=""
                    />
                  ) : (
                    <BsPersonCircle size={"60"} color={"white"} />
                  )}
                  <p>{actor.name}</p>
                </div>
              </OverlayTrigger>
            ))}
          </div>
          <Row className="py-4">
            <Col className="me-4 px-4 py-4 vote-average">
              <h3 className="imdb">Vote Average</h3>
              <p className="imdb">{movie.vote_average}</p>
            </Col>
            <Col className="ms-4 px-4 py-4 vote-average">
              <h3 className="imdb">Vote Count</h3>
              <p className="imdb">{movie.vote_count}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
