"use client";

import { useState } from "react";
import { Card, CardBody, Row, Col, Input, Label, Button, FormGroup } from "reactstrap";

export default function RoomSelection({ hotel, searchData, onProceedPayment }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomCount, setRoomCount] = useState(searchData?.rooms || 1);
  const [roomError, setRoomError] = useState(false);

  const handleProceed = () => {
    if (selectedRoom === null) {
      setRoomError(true);
      return;
    }
    setRoomError(false);
    const room = hotel.rooms[selectedRoom];
    const checkIn = searchData?.checkIn || "";
    const checkOut = searchData?.checkOut || "";
    const guestCount = searchData?.guests || 2;

    let nights = 1;
    if (checkIn && checkOut) {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      if (d2 > d1) {
        nights = (d2 - d1) / (1000 * 60 * 60 * 24);
      }
    }

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
            <Label>Room Count</Label>
            <Input
              type="number"
              min="1"
              value={roomCount}
              onChange={(e) => setRoomCount(parseInt(e.target.value))}
            />
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
      {roomError && (
        <div style={{ color: "red", fontSize: "0.9em", marginTop: "10px" }}>
          Please select a room type.
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
