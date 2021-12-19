import React, { useState } from 'react';
import '../../components/movie/MovieCard/MovieCard.css';
import { Button } from 'react-bootstrap';

export default function Pagination(props) {
  const [page, setPage] = useState(1);
  return (
    <div className='NP-pages'>
      <div className='d-flex justify-content-between flex-row w-500'>
        <div>
          <Button
            className='pagination-button'
            variant='info'
            onClick={props.onPreviousClick}
          >
            Previous
          </Button>
        </div>
        <div className=''>
          <Button
            className='pagination-button'
            variant='info'
            onClick={props.onNextClick}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
