"use client";

import { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import SearchBar from "./components/SearchBar";
import DealsAndDiscounts from "./components/DealsAndDiscounts";
import PopularSearches from "./components/PopularSearches";
import SearchResultCarousel from "./components/SearchResultCarousel";
import SearchResults from "./components/SearchResults";
import HotelDetail from "./components/HotelDetail";
import Payment from "./components/Payment";
import ReservationsPage from "./reservations/ReservationsPage";

const API_URL = "http://localhost:3001";

export default function Home() {
  // "home", "reservations"
  const [currentPage, setCurrentPage] = useState("home");

  // Home page views: "initial", "searchCarousel", "searchResults", "hotelDetail", "payment"
  const [view, setView] = useState("initial");

  const [deals, setDeals] = useState([]);
  const [popular, setPopular] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [searchData, setSearchData] = useState(null);

  // Fetch deals and popular on mount
  useEffect(() => {
    fetch(`${API_URL}/deals`)
      .then((res) => res.json())
      .then((data) => setDeals(data))
      .catch((err) => console.error("Error fetching deals:", err));

    fetch(`${API_URL}/popular`)
      .then((res) => res.json())
      .then((data) => setPopular(data))
      .catch((err) => console.error("Error fetching popular:", err));
  }, []);

  const handleSearch = async (data) => {
    setSearchData(data);
    try {
      const res = await fetch(`${API_URL}/hotels?q=${encodeURIComponent(data.query)}`);
      const hotels = await res.json();
      const sorted = hotels.sort((a, b) => a.name.localeCompare(b.name));
      setSearchResults(sorted);
      setView("searchCarousel");
    } catch (err) {
      console.error("Error searching hotels:", err);
    }
  };

  const handlePopularClick = async (title) => {
    const data = { query: title, checkIn: "", checkOut: "", guests: 2, rooms: 1 };
    setSearchData(data);
    try {
      const res = await fetch(`${API_URL}/hotels?q=${encodeURIComponent(title)}`);
      const hotels = await res.json();
      const sorted = hotels.sort((a, b) => a.name.localeCompare(b.name));
      setSearchResults(sorted);
      setView("searchResults");
    } catch (err) {
      console.error("Error searching hotels:", err);
    }
  };

  const handleSeeMore = () => {
    setView("searchResults");
  };

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    setView("hotelDetail");
  };

  const handleProceedPayment = (data) => {
    setBookingData(data);
    setView("payment");
  };

  const handleBack = () => {
    if (view === "payment") {
      setView("hotelDetail");
    } else if (view === "hotelDetail") {
      if (searchResults.length > 0) {
        setView("searchResults");
      } else {
        setView("initial");
      }
    } else {
      setView("initial");
    }
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === "home") {
      setView("initial");
      setSearchResults([]);
      setSelectedHotel(null);
      setBookingData(null);
    }
  };

  return (
    <>
      <NavigationBar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="container">
        {currentPage === "home" && (
          <>
            {/* Search Bar - always visible except in payment */}
            {view !== "payment" && view !== "hotelDetail" && (
              <SearchBar onSearch={handleSearch} />
            )}

            {/* Initial view: Deals + Popular */}
            {view === "initial" && (
              <>
                <DealsAndDiscounts deals={deals} />
                <PopularSearches
                  popular={popular}
                  onPopularClick={handlePopularClick}
                />
              </>
            )}

            {/* After search: Carousel + Popular */}
            {view === "searchCarousel" && (
              <>
                <SearchResultCarousel
                  results={searchResults}
                  onHotelClick={handleHotelClick}
                  onSeeMore={handleSeeMore}
                />
                <PopularSearches
                  popular={popular}
                  onPopularClick={handlePopularClick}
                />
              </>
            )}

            {/* See more: Grid */}
            {view === "searchResults" && (
              <SearchResults
                results={searchResults}
                onHotelClick={handleHotelClick}
              />
            )}

            {/* Hotel Detail */}
            {view === "hotelDetail" && selectedHotel && (
              <HotelDetail
                hotel={selectedHotel}
                searchData={searchData}
                onProceedPayment={handleProceedPayment}
                onBack={handleBack}
              />
            )}

            {/* Payment */}
            {view === "payment" && bookingData && (
              <Payment bookingData={bookingData} onBack={handleBack} />
            )}
          </>
        )}

        {currentPage === "reservations" && <ReservationsPage />}
      </div>
    </>
  );
}
