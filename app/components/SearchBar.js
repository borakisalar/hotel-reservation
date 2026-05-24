"use client";

import { useState } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [queryError, setQueryError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setQueryError(true);
      return;
    }
    setQueryError(false);
    onSearch({ query: query.trim(), checkIn, checkOut, guests, rooms });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Search Hotels</h5>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={3}>
              <Label>Destination / Hotel Name</Label>
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              {queryError && (
                <div style={{ color: "red", fontSize: "0.9em" }}>
                  Please enter a search text.
                </div>
              )}
            </Col>
            <Col md={2}>
              <Label>Check-in</Label>
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </Col>
            <Col md={2}>
              <Label>Check-out</Label>
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </Col>
            <Col md={2}>
              <Label>Guests</Label>
              <Input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                required
              />
            </Col>
            <Col md={2}>
              <Label>Rooms</Label>
              <Input
                type="number"
                min="1"
                value={rooms}
                onChange={(e) => setRooms(parseInt(e.target.value))}
                required
              />
            </Col>
            <Col md={1} className="d-flex align-items-end">
              <Button color="primary" type="submit" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
