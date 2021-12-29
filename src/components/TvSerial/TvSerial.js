import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Row,
  Col,
  Spinner,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import useFavorites from "../../contexts/FavouriteContext";
import { getImageUrl } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TvSerial(props) {
  const { favorites, toggleFavorites } = useFavorites();

  return (
    <Card className="border-0 pakflix-main">
      <Card.Body className="movie1-box">
        <Row
          style={{
            background: props.serial.backgroundColor,
          }}
          className="movie-1 "
        >
          <Col xs={3}>
            <img
              src={getImageUrl(props.serial.poster_path)}
              className=" px-1 py-3 image-1"
            />
          </Col>
          <Col className="image1-text" xs={7}>
            <h5>{props.serial.name}</h5>
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
            <div
              onClick={() =>
                toggleFavorites({
                  ...props.serial,
                  favouriteType: "tv",
                })
              }
            >
              {props.isAddedToFavorite ? (
                <BsHeartFill color={"red"} size={"20"} />
              ) : (
                <BsHeart color={"white"} size={"20"} />
              )}
            </div>

            <div>
              <FontAwesomeIcon className="star-icon me-1 mt-4" icon={faStar} />
              <span className="rating"> {props.serial.vote_average} </span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
