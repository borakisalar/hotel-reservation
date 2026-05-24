"use client";

import { useState } from "react";
import { Badge, Button } from "reactstrap";
import RoomSelection from "./RoomSelection";

export default function HotelDetail({ hotel, searchData, onProceedPayment, onBack }) {
  const [showRooms, setShowRooms] = useState(false);

  if (!hotel) return null;

  const imagesToUse = hotel.images || [hotel.image];

  return (
    <div className="mb-5">
      <Button color="secondary" size="sm" className="mb-3" onClick={onBack}>
        &larr; Back
      </Button>

      <HotelCarousel images={imagesToUse} />

      <div className="card mt-3">
        <div className="card-body">
          <h3>{hotel.name}</h3>
          <p className="text-muted">{hotel.address}</p>
          <div className="mb-2">
            <Badge color="warning" className="text-dark me-2">
              {hotel.star} Stars
            </Badge>
            <Badge color="info" className="text-dark">
              Rating: {hotel.rating}
            </Badge>
          </div>
          <p>{hotel.description}</p>
          <h5 className="text-success">From ${hotel.price} / night</h5>
          <hr />
          <h5>Hotel Rules</h5>
          <ul>
            {hotel.rules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
          {!showRooms && (
            <Button color="primary" onClick={() => setShowRooms(true)}>
              Book Now
            </Button>
          )}
        </div>
      </div>

      {showRooms && (
        <RoomSelection
          hotel={hotel}
          searchData={searchData}
          onProceedPayment={onProceedPayment}
        />
      )}
    </div>
  );
}

function HotelCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  };

  const previous = () => {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  return (
    <div id="hotelCarousel" className="carousel slide">
      <div className="carousel-inner">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === activeIndex ? "active" : ""}`}
          >
            <img
              src={img}
              className="d-block w-100"
              alt={`view ${idx + 1}`}
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={previous}
      >
        <span className="carousel-control-prev-icon bg-dark rounded" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={next}
      >
        <span className="carousel-control-next-icon bg-dark rounded" aria-hidden="true"></span>
      </button>
    </div>
  );
}
