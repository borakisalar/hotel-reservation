"use client";

import { useState } from "react";
import { Badge, Button, Carousel, CarouselItem, CarouselControl } from "reactstrap";
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
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  };

  const previous = () => {
    if (animating) return;
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      {images.map((img, idx) => (
        <CarouselItem
          key={idx}
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
        >
          <img
            src={img}
            className="d-block w-100"
            alt={`view ${idx + 1}`}
            style={{ height: "400px", objectFit: "cover" }}
          />
        </CarouselItem>
      ))}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}
