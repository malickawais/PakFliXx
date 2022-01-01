import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { getImageUrl } from "../../utils";
import "./Carousel.css";

export default function CarouselCard(props) {
  const [showText, setShowText] = useState(false);

  return (
    <Carousel className="w-100" interval={null}>
      {props?.seasons?.map((season) => {
        return (
          <Carousel.Item key={season.id}>
            <img
              onClick={() => {
                props.onSeasonPosterClick(season);
              }}
              className="d-block carousel-img-poster cursor-pointer"
              src={getImageUrl(season.poster_path)}
              alt="First slide"
            />
            {season.name}
            <h3 className="text-center my-2 overveiw">{season.name}</h3>
            <p className="overveiw text-center">
              {showText
                ? season.overview
                : `${season.overview?.substr(0, 50)}...`}
              <span className="text" onClick={() => setShowText(!showText)}>
                {showText ? " Read Less" : " Read all"}
              </span>
            </p>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
