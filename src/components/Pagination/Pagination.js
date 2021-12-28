import React, { useState } from "react";
import "../../components/movie/MovieCard/MovieCard.css";
import { Button } from "react-bootstrap";

export default function Pagination(props) {
  return (
    <div className="NP-pages">
      <div className="d-flex justify-content-between flex-row w-500">
        <div>
          <Button
            className="pagination-button"
            variant="info"
            onClick={props.onPreviousClick}
            disabled={props.currentPage === 1}
          >
            Previous
          </Button>
        </div>
        <h5>
          {props.currentPage} / {props.totalPages}
        </h5>
        <div className="">
          <Button
            className="pagination-button"
            disabled={props.currentPage === props.totalPages}
            variant="info"
            onClick={props.onNextClick}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
