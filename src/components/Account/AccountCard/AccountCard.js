import React from 'react';
import './AccountCard.css';
import { Row, Col, Card } from 'react-bootstrap';
import { BsPersonCircle, BsHeartFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

export default function AccountCard(props) {
  const cardUI = (
    <Card className=' border-0 Account-main'>
      <Card.Body className='Account-body'>
        <Row>
          <Col xs={3}>
            <div className='BsPerson'>{props.renderIcon()}</div>
          </Col>
          <Col xs={9}>
            <h6 className='favourites'>{props.title}</h6>
            <p className='fav-text'>{props.subTitle}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
  return (
    <div>
      {props.link ? (
        <NavLink style={{ textDecoration: 'none' }} to={props.link.to}>
          {cardUI}
        </NavLink>
      ) : (
        cardUI
      )}
    </div>
  );
}
