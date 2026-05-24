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

export default function PopularSearches({ popular, onPopularClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  if (!popular || popular.length === 0) return null;

  // Group popular items in pairs
  const slides = [];
  for (let i = 0; i < popular.length; i += 2) {
    slides.push(popular.slice(i, i + 2));
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
      <h3 className="mb-3">Popular Searches</h3>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        {slides.map((pair, idx) => (
          <CarouselItem
            key={idx}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
          >
            <Row>
              {pair.map((item) => (
                <Col xs={6} key={item.id}>
                  <Card
                    className="popular-card cursor-pointer"
                    onClick={() => onPopularClick(item.title)}
                    style={{ cursor: "pointer" }}
                  >
                    <CardImg top src={item.img} alt={item.title} />
                    <CardBody className="bg-dark text-white text-center">
                      <h5>{item.title}</h5>
                      <p>{item.details}</p>
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
