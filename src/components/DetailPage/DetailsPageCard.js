import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Row,
  Badge,
  Col,
  Spinner,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

import "../../views/MovieDetails/DetailPage.css";
import YoutubeEmbed from "../../components/Common/YoutubeEmbed/YoutubeEmbed";

import { Navigate, useNavigate, useParams } from "react-router";
import apiClient from "../../apiClient";
import { getImageUrl } from "../../utils";
import { BsPersonCircle } from "react-icons/bs";
import { BiCameraMovie } from "react-icons/bi";
import ActorCard from "../../components/Actor/ActorCard";
import useFavorites from "../../contexts/FavouriteContext";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Carousel from "../Courosel/Carousel";
import CarouselCard from "../Courosel/Carousel";

export default function TvSerialDetailCard() {
  const { favorites, toggleFavorites } = useFavorites();

  const navigate = useNavigate();
  const [serial, setSerial] = useState({});
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const [posterImage, setPosterImage] = useState();

  const params = useParams();
  const isAddedToFavorite = favorites.find((fav) => fav.id === serial.id);

  const fetchTvSerials = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url:
          "/tv/" +
          params.serialId +
          "?append_to_response=videos,movie_credits,credits",
        method: "GET",
      });

      console.log("response", res);
      setSerial(res.data);
      setLoading(false);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.serialId) {
      fetchTvSerials();
      //   console.log("why it is being called a lot", props.id);
    }
  }, [params.serialId]);

  if (loading) {
    return (
      <div className="spinner">
        <Spinner className={"ms-2"} size="lg" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const trailerVid = serial?.videos?.results?.find(
    (vid) => vid.type === "Trailer"
  );
  const director = serial?.credits?.crew?.find(
    (dir) => dir.known_for_department === "Directing"
  );
  const popover = (actor) => (
    <Popover>
      <div className="detailPage-veiw">
        <ActorCard hideCrossIcon={true} actor={actor} />
      </div>
    </Popover>
  );
  console.log(serial.seasons);
  return (
    <div>
      <Row className="d-flex w-100 justify-content-center">
        <Col className="border-0 pakflix-wrapper p-4 " md={6}>
          <Row className="w-100">
            <Col xs={4}>
              <FontAwesomeIcon
                onClick={() => navigate("/tv")}
                className="overveiw left-arrow"
                icon={faArrowLeft}
              />
            </Col>
            <Col className="d-flex justify-content-end" xs={8}>
              <div
                className="favourite-movie-wrapper"
                onClick={() => {
                  toggleFavorites({ ...serial, favouriteType: "serial" });
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
                src={getImageUrl(serial.poster_path)}
                alt=""
              />
            </Col>
            <Col className="ps-4" xs={10}>
              {serial.homepage ? (
                <a className="overveiw" href={serial.homepage} target="_blank">
                  {serial.title}
                </a>
              ) : (
                <>
                  <h4 className="overveiw">{serial.title}</h4> <br />
                </>
              )}
              <p className="overveiw">
                <BiCameraMovie color={"white"} size={"25"} className="me-2" />

                {director?.name}
              </p>

              {serial.genres?.map((gen) => {
                return (
                  <Badge pill bg="warning" className="me-2">
                    {gen.name}
                  </Badge>
                );
              })}
            </Col>
          </Row>
          <div className="d-flex my-3 justify-content-center">
            {/* {trailerVid && <YoutubeEmbed embedId={trailerVid?.key} />} */}
            <CarouselCard seasons={serial.seasons} />;
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
                ? serial.overview
                : `${serial.overview?.substr(0, 50)}...`}
              <span className="text" onClick={() => setShowText(!showText)}>
                {showText ? " Read Less" : " Read all"}
              </span>
            </p>
          </Row>

          <div className="actors d-flex flex-row">
            {serial.credits?.cast?.map((actor) => (
              <>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  rootClose
                  overlay={popover(actor)}
                >
                  <div
                    key={actor.id}
                    className="text-center me-2 actor-container"
                  >
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
              </>
            ))}
          </div>
          <Row className="py-4">
            <Col className="me-4 px-4 py-4 vote-average">
              <h3 className="imdb">Vote Average</h3>
              <p className="imdb">{serial.vote_average}</p>
            </Col>
            <Col className="ms-4 px-4 py-4 vote-average">
              <h3 className="imdb">Vote Count</h3>
              <p className="imdb">{serial.vote_count}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
