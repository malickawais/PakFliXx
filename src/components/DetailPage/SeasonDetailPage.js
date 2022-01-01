import React, { useState, useEffect } from "react";
import apiClient from "../../apiClient";
import { Navigate, useNavigate, useParams } from "react-router";
import {
  Badge,
  Col,
  OverlayTrigger,
  Popover,
  Row,
  Spinner,
} from "react-bootstrap";
import { BsHeart, BsHeartFill, BsPersonCircle } from "react-icons/bs";
import { BiCameraMovie } from "react-icons/bi";
import { getImageUrl } from "../../utils";
import YoutubeEmbed from "../Common/YoutubeEmbed/YoutubeEmbed";
import ActorCard from "../Actor/ActorCard";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFavorites from "../../contexts/FavouriteContext";

export default function SeasonDetailPage(props) {
  const { favorites, toggleFavorites } = useFavorites();
  const isAddedToFavorite = favorites.find((fav) => fav.id === serial.id);

  const [loading, setLoading] = useState(false);
  const [serial, setSerial] = useState([]);
  const [showText, setShowText] = useState(false);
  const params = useParams();
  const trailerVid = serial?.videos?.results?.find(
    (vid) => vid.type === "Teaser"
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

  const fetchTvSerials = async () => {
    try {
      setLoading(true);
      const res = await apiClient({
        url:
          "/tv/" +
          params.serialId +
          "/season/" +
          props.seasonNumber +
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
    if (params.serialId && props.seasonNumber != undefined) {
      console.log(params.serialId, "i love");
      console.log(props.seasonNumber, "but not you");
      fetchTvSerials();
    }
  }, [params.serialId, props.seasonNumber]);

  return (
    <div>
      <div>
        <Row className="d-flex w-100 justify-content-center">
          <Col className="border-0 pakflix-wrapper p-4 " md={6}>
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
                  <a
                    className="overveiw"
                    href={serial.homepage}
                    target="_blank"
                  >
                    {serial.name}
                  </a>
                ) : (
                  <>
                    <h4 className="overveiw">{serial.name}</h4> <br />
                  </>
                )}
                <p className="overveiw">
                  <BiCameraMovie color={"white"} size={"25"} className="me-2" />

                  {director?.name}
                </p>

                {serial.genres?.map((gen) => {
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
            {serial?.overview && (
              <>
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
                      : `${serial?.overview?.substr(0, 50)}...`}
                    <span
                      className="text"
                      onClick={() => setShowText(!showText)}
                    >
                      {showText ? " Read Less" : " Read all"}
                    </span>
                  </p>
                </Row>
              </>
            )}

            <div className="actors d-flex flex-row">
              {serial.credits?.cast?.map((actor) => (
                <OverlayTrigger
                  key={actor.id}
                  trigger="click"
                  placement="right"
                  rootClose
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

            <div className="actors d-flex flex-row">
              {serial.episodes?.map((episode) => (
                <div className="text-center me-2 actor-container">
                  {episode.still_path ? (
                    <img
                      className="img border rounded"
                      src={getImageUrl(episode.still_path)}
                      alt=""
                    />
                  ) : (
                    <BsPersonCircle size={"60"} color={"white"} />
                  )}
                  <p>{episode.name}</p>
                </div>
              ))}
            </div>

            {/* <Row className="py-4">
              <Col className="me-4 px-4 py-4 vote-average">
                <h3 className="imdb">Vote Average</h3>
                <p className="imdb">{serial.episodes?.vote_average}</p>
              </Col>
              <Col className="ms-4 px-4 py-4 vote-average">
                <h3 className="imdb">Vote Count</h3>
                <p className="imdb">{serial.episodes?.vote_count}</p>
              </Col>
            </Row> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}
