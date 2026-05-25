"use client";

import { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, CardImg, CardTitle, CardSubtitle, Button } from "reactstrap";

const API_URL = "http://localhost:3001";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);

  async function getReservations() {
    const [resRes, hotelsRes] = await Promise.all([
      fetch(`${API_URL}/reservations`),
      fetch(`${API_URL}/hotels`)
    ]);
    const data = await resRes.json();
    const hotels = await hotelsRes.json();

    const hotelMap = {};
    hotels.forEach((h) => {
      hotelMap[h.name] = h.image;
    });

    return data.map((r) => ({
      ...r,
      hotel: {
        ...r.hotel,
        image: r.hotel?.image || hotelMap[r.hotel?.name]
      }
    }));
  }

  useEffect(() => {
    getReservations()
      .then((data) => setReservations(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/reservations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await getReservations();
        setReservations(data);
      }
    } catch (err) {
      console.error("Error deleting reservation:", err);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4 text-center">My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <Row className="g-4 justify-content-center">
          {reservations.map((r) => (
            <Col sm={12} md={6} lg={4} key={r.id}>
              <Card className="h-100 shadow-sm">
                {r.hotel?.image ? (
                  <CardImg
                    top
                    src={r.hotel.image}
                    alt={r.hotel?.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ height: "200px", backgroundColor: "#e9ecef", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="text-muted">No Image Available</span>
                  </div>
                )}

                <CardBody className="d-flex flex-column">
                  <CardTitle tag="h5" className="mb-1">{r.hotel?.name}</CardTitle>
                  <CardSubtitle className="mb-3 text-muted">
                    Guest: {r.guestData?.firstName} {r.guestData?.lastName}
                  </CardSubtitle>

                  <div className="mb-4 flex-grow-1">
                    <Row className="mb-1">
                      <Col xs="5" className="text-muted fw-bold">Room Count</Col>
                      <Col xs="7">: {r.reservationData?.roomCount}</Col>
                    </Row>
                    <Row className="mb-1">
                      <Col xs="5" className="text-muted fw-bold">Guest Count</Col>
                      <Col xs="7">: {r.reservationData?.guestCount}</Col>
                    </Row>
                    <Row className="mb-1">
                      <Col xs="5" className="text-muted fw-bold">Room Type</Col>
                      <Col xs="7">: {r.reservationData?.roomType}</Col>
                    </Row>
                    <Row className="mb-1">
                      <Col xs="5" className="text-muted fw-bold">Check-in</Col>
                      <Col xs="7">: {r.reservationData?.checkInDate}</Col>
                    </Row>
                    <Row>
                      <Col xs="5" className="text-muted fw-bold">Check-out</Col>
                      <Col xs="7">: {r.reservationData?.checkOutDate}</Col>
                    </Row>
                  </div>

                  <div className="d-flex justify-content-end border-top pt-3 mt-auto">
                    <Button
                      color="danger"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete Reservation
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
