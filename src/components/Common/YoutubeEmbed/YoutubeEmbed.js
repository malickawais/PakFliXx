import React from "react";
import PropTypes from "prop-types";
import "./YoutubeEmbed.css";

const YoutubeEmbed = ({ embedId }) => (
  //   <div className='video-responsive'>
  <iframe
    width="400"
    height="170"
    className="rounded"
    src={`https://www.youtube.com/embed/${embedId}`}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullScreen
  ></iframe>
  //   </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};
export default YoutubeEmbed;
