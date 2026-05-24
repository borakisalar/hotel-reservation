"use client";

import { useState } from "react";

export default function SearchResultCarousel({ results, onHotelClick, onSeeMore }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }

  // Group results in chunks of 5
  const slides = [];
  for (let i = 0; i < results.length; i += 5) {
    slides.push(results.slice(i, i + 5));
  }

  const next = () => {
    setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  };

  const previous = () => {
    setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  };

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Search Results</h3>
        <a
          href="#"
          className="btn btn-link"
          onClick={(e) => {
            e.preventDefault();
            onSeeMore();
          }}
        >
          See more deals
        </a>
      </div>
      <div id="searchResultsCarousel" className="carousel slide">
        <div className="carousel-inner">
          {slides.map((group, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === activeIndex ? "active" : ""}`}
            >
              <div className="row">
                {group.map((hotel) => (
                  <div className="col" key={hotel.id}>
                    <div
                      className="card hotel-card h-100"
                      style={{ cursor: "pointer" }}
                      onClick={() => onHotelClick(hotel)}
                    >
                      <img
                        src={hotel.image}
                        className="card-img-top"
                        alt={hotel.name}
                      />
                      <div className="card-body">
                        <h6>{hotel.name}</h6>
                        <p className="small m-0 text-muted">{hotel.city}</p>
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
