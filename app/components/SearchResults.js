"use client";

import { Row, Col } from "reactstrap";
import HotelCard from "./HotelCard";

export default function SearchResults({ results, onHotelClick }) {
  if (!results || results.length === 0) {
    return <p>No hotels match your search.</p>;
  }

  return (
    <div className="mb-5">
      <h3 className="mb-3">Search Results</h3>
      <Row className="g-4">
        {results.map((hotel) => (
          <Col sm={6} md={4} lg={3} key={hotel.id}>
            <HotelCard hotel={hotel} onClick={onHotelClick} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
