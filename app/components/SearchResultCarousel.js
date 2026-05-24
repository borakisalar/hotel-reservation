"use client";

import { useState } from "react";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  Card,
  CardImg,
  CardBody,
  Row,
  Col,
} from "reactstrap";

export default function SearchResultCarousel({ results, onHotelClick, onSeeMore }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }


  const slides = [];
  for (let i = 0; i < results.length; i += 5) {
    slides.push(results.slice(i, i + 5));
  }

  const next = () => {
    if (animating) return;
    setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  };

  const previous = () => {
    if (animating) return;
    setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  };

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Search Results</h3>
        <a href="#" className="btn btn-link" onClick={(e) => { e.preventDefault(); onSeeMore(); }}>
          See more deals
        </a>
      </div>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        {slides.map((group, idx) => (
          <CarouselItem
            key={idx}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
          >
            <Row>
              {group.map((hotel) => (
                <Col key={hotel.id}>
                  <Card
                    className="hotel-card h-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => onHotelClick(hotel)}
                  >
                    <CardImg top src={hotel.image} alt={hotel.name} />
                    <CardBody>
                      <h6>{hotel.name}</h6>
                      <p className="small m-0 text-muted">{hotel.city}</p>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </CarouselItem>
        ))}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}
