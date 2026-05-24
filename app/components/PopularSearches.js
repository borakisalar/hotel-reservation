"use client";

import { useState } from "react";

export default function PopularSearches({ popular, onPopularClick }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!popular || popular.length === 0) return null;

  // Group popular items in pairs
  const slides = [];
  for (let i = 0; i < popular.length; i += 2) {
    slides.push(popular.slice(i, i + 2));
  }

  const next = () => {
    setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  };

  const previous = () => {
    setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  };

  return (
    <div className="mb-5">
      <h3 className="mb-3">Popular Searches</h3>
      <div id="popularCarousel" className="carousel slide">
        <div className="carousel-inner">
          {slides.map((pair, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === activeIndex ? "active" : ""}`}
            >
              <div className="row">
                {pair.map((item) => (
                  <div className="col-6" key={item.id}>
                    <div
                      className="card popular-card"
                      style={{ cursor: "pointer" }}
                      onClick={() => onPopularClick(item.title)}
                    >
                      <img
                        src={item.img}
                        className="card-img-top"
                        alt={item.title}
                      />
                      <div className="card-body bg-dark text-white text-center">
                        <h5>{item.title}</h5>
                        <p>{item.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
    </div>
  );
}
