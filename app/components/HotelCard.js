"use client";

import { Card, CardImg, CardBody, CardTitle, Badge } from "reactstrap";

export default function HotelCard({ hotel, onClick }) {
  return (
    <Card
      className="hotel-card h-100"
      style={{ cursor: "pointer" }}
      onClick={() => onClick(hotel)}
    >
      <CardImg top src={hotel.image} alt={hotel.name} />
      <CardBody>
        <CardTitle tag="h5">{hotel.name}</CardTitle>
        <div className="mb-2">
          <Badge color="warning" className="text-dark me-1">
            {hotel.star} Stars
          </Badge>
          <Badge color="info" className="text-dark">
            Rating: {hotel.rating}
          </Badge>
        </div>
        <p className="card-text text-muted small">{hotel.city}</p>
        <h6 className="text-success mt-auto">From ${hotel.price}</h6>
      </CardBody>
    </Card>
  );
}
