"use client";

import { useState } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!query.trim()) {
      nextErrors.query = "Please enter a search text.";
    }
    if (!checkIn) {
      nextErrors.checkIn = "Please select a check-in date.";
    }
    if (!checkOut) {
      nextErrors.checkOut = "Please select a check-out date.";
    }
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      nextErrors.checkOut = "Check-out date must be after check-in date.";
    }
    if (!Number.isInteger(guests) || guests < 1) {
      nextErrors.guests = "Guest count must be at least 1.";
    }
    if (!Number.isInteger(rooms) || rooms < 1) {
      nextErrors.rooms = "Room count must be at least 1.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

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
              {errors.query && (
                <div style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.query}
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
              {errors.checkIn && (
                <div style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.checkIn}
                </div>
              )}
            </Col>
            <Col md={2}>
              <Label>Check-out</Label>
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
              {errors.checkOut && (
                <div style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.checkOut}
                </div>
              )}
            </Col>
            <Col md={2}>
              <Label>Guests</Label>
              <Input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(Number.parseInt(e.target.value, 10))}
                required
              />
              {errors.guests && (
                <div style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.guests}
                </div>
              )}
            </Col>
            <Col md={2}>
              <Label>Rooms</Label>
              <Input
                type="number"
                min="1"
                value={rooms}
                onChange={(e) => setRooms(Number.parseInt(e.target.value, 10))}
                required
              />
              {errors.rooms && (
                <div style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.rooms}
                </div>
              )}
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
