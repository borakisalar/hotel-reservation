"use client";

import { useState } from "react";
import { Card, CardBody, Row, Col, Input, Label, Button, FormGroup } from "reactstrap";

export default function RoomSelection({ hotel, searchData, onProceedPayment }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomCount, setRoomCount] = useState(searchData?.rooms || 1);
  const [checkIn, setCheckIn] = useState(searchData?.checkIn || "");
  const [checkOut, setCheckOut] = useState(searchData?.checkOut || "");
  const [errors, setErrors] = useState({});

  const handleProceed = () => {
    const nextErrors = {};

    if (selectedRoom === null) {
      nextErrors.roomType = "Please select a room type.";
    }
    if (!Number.isInteger(roomCount) || roomCount < 1) {
      nextErrors.roomCount = "Room count must be at least 1.";
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

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const room = hotel.rooms[selectedRoom];
    const guestCount = searchData?.guests || 2;

    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const nights = (d2 - d1) / (1000 * 60 * 60 * 24);

    const totalAmount = room.price * roomCount * nights;

    onProceedPayment({
      hotel,
      reservationData: {
        roomCount,
        guestCount,
        roomType: room.type,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      },
      amountInfo: {
        totalAmount,
        nights,
      },
    });
  };

  return (
    <div className="mt-4" style={{ borderTop: "1px solid #ccc", paddingTop: "20px" }}>
      <h4>Select a Room</h4>
      <Row className="g-3 mb-3">
        <Col md={4}>
          <FormGroup>
            <Label>Check-in</Label>
            <Input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            {errors.checkIn && (
              <div style={{ color: "red", fontSize: "0.9em" }}>
                {errors.checkIn}
              </div>
            )}
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label>Check-out</Label>
            <Input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
            {errors.checkOut && (
              <div style={{ color: "red", fontSize: "0.9em" }}>
                {errors.checkOut}
              </div>
            )}
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label>Room Count</Label>
            <Input
              type="number"
              min="1"
              value={roomCount}
              onChange={(e) => setRoomCount(Number.parseInt(e.target.value, 10))}
            />
            {errors.roomCount && (
              <div style={{ color: "red", fontSize: "0.9em" }}>
                {errors.roomCount}
              </div>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row className="g-3">
        {hotel.rooms.map((room, index) => (
          <Col md={6} key={index}>
            <Card>
              <CardBody>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="roomSelect"
                    id={`room${index}`}
                    value={index}
                    checked={selectedRoom === index}
                    onChange={() => setSelectedRoom(index)}
                  />
                  <label className="form-check-label w-100" htmlFor={`room${index}`}>
                    <strong>{room.type}</strong> - ${room.price}/night
                    <br />
                    <small className="text-muted">
                      {room.features} (Max: {room.maxGuests})
                    </small>
                  </label>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      {errors.roomType && (
        <div style={{ color: "red", fontSize: "0.9em", marginTop: "10px" }}>
          {errors.roomType}
        </div>
      )}
      <div className="mt-3">
        <Button color="success" onClick={handleProceed}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
}
