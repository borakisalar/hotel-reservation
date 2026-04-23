/* ============================================================
   index.js  –  Logic for index.html
   Uses sessionStorage for passing search data.
   No jQuery, no frameworks, no inline CSS/JS.
============================================================ */

(function () {
  "use strict";

  /* ── Seed data into sessionStorage once ── */
  if (!sessionStorage.getItem("hotelsData")) {
    sessionStorage.setItem("hotelsData", JSON.stringify(hotelsData));
  }

  /* ── DOM refs ── */
  const dealsContainer       = document.getElementById("deals-container");
  const dealsSection         = document.getElementById("deals-section");
  const popularInner         = document.getElementById("popular-carousel-inner");
  const popularIndicators    = document.getElementById("popular-indicators");
  const searchBtn            = document.getElementById("search-btn");
  const destInput            = document.getElementById("search-destination");
  const checkinInput         = document.getElementById("search-checkin");
  const checkoutInput        = document.getElementById("search-checkout");
  const guestsSelect         = document.getElementById("search-guests");
  const roomsSelect          = document.getElementById("search-rooms");

  /* ── Set min dates ── */
  const today = new Date().toISOString().split("T")[0];
  checkinInput.min  = today;
  checkoutInput.min = today;

  checkinInput.addEventListener("change", function () {
    checkoutInput.min = this.value || today;
    if (checkoutInput.value && checkoutInput.value < this.value) {
      checkoutInput.value = "";
    }
  });

  /* ── Helpers ── */
  function starsHTML(n) {
    let s = "";
    for (let i = 0; i < 5; i++) {
      s += i < n
        ? '<i class="bi bi-star-fill sr-stars"></i>'
        : '<i class="bi bi-star sr-stars" style="color:#cbd5e1"></i>';
    }
    return s;
  }

  /* ── Render Deals ── */
  function renderDeals() {
    dealsContainer.innerHTML = "";
    dealsData.forEach(function (deal) {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-4 fade-in";
      col.innerHTML =
        '<div class="deal-card">' +
          '<div class="deal-img-wrap">' +
            '<img src="' + deal.image + '" alt="' + deal.title + '" loading="lazy" />' +
            '<span class="deal-badge">' + deal.badge + '</span>' +
          '</div>' +
          '<div class="card-body">' +
            '<div class="info-tag mb-2"><i class="bi bi-tag-fill me-1"></i>' + deal.tag + '</div>' +
            '<h3 class="card-title">' + deal.title + '</h3>' +
            '<p class="card-text">' + deal.details + '</p>' +
            '<a href="#" class="learn-more">Learn more <i class="bi bi-arrow-right"></i></a>' +
          '</div>' +
        '</div>';
      dealsContainer.appendChild(col);
    });
  }

  /* ── Render Popular Searches ── */
  function renderPopular() {
    popularInner.innerHTML      = "";
    popularIndicators.innerHTML = "";

    const itemsPerSlide = window.innerWidth >= 768 ? 4 : 2;
    const totalSlides   = Math.ceil(popularSearches.length / itemsPerSlide);

    for (let s = 0; s < totalSlides; s++) {
      /* indicator */
      const ind = document.createElement("button");
      ind.type = "button";
      ind.setAttribute("data-bs-target", "#popularCarousel");
      ind.setAttribute("data-bs-slide-to", String(s));
      if (s === 0) { ind.className = "active"; ind.setAttribute("aria-current", "true"); }
      popularIndicators.appendChild(ind);

      /* slide */
      const item = document.createElement("div");
      item.className = "carousel-item" + (s === 0 ? " active" : "");

      const row = document.createElement("div");
      row.className = "row g-3";

      const slice = popularSearches.slice(s * itemsPerSlide, (s + 1) * itemsPerSlide);
      slice.forEach(function (dest) {
        const colClass = itemsPerSlide === 4 ? "col-6 col-md-3" : "col-6";
        const col = document.createElement("div");
        col.className = colClass;
        col.innerHTML =
          '<div class="popular-card" data-query="' + dest.searchQuery + '" role="button" tabindex="0">' +
            '<img src="' + dest.image + '" alt="' + dest.title + '" loading="lazy" />' +
            '<div class="popular-overlay">' +
              '<span class="pop-tag">' + dest.tag + '</span>' +
              '<h5>' + dest.title + '</h5>' +
              '<p class="pop-info">' +
                '<i class="bi bi-building me-1"></i>' + dest.hotels + ' hotels &nbsp;|&nbsp; ' +
                '<i class="bi bi-currency-dollar"></i>Avg $' + dest.avgPrice + '/night' +
              '</p>' +
            '</div>' +
          '</div>';

        col.querySelector(".popular-card").addEventListener("click", function () {
          searchByQuery(this.getAttribute("data-query"));
        });

        col.querySelector(".popular-card").addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { searchByQuery(this.getAttribute("data-query")); }
        });

        row.appendChild(col);
      });

      item.appendChild(row);
      popularInner.appendChild(item);
    }
  }

  /* ── Validate search form ── */
  function validateForm() {
    let valid = true;

    function markField(input, errId, condition) {
      const errEl = document.getElementById(errId);
      if (condition) {
        input.classList.add("is-invalid");
        if (errEl) errEl.style.display = "block";
        valid = false;
      } else {
        input.classList.remove("is-invalid");
        if (errEl) errEl.style.display = "none";
      }
    }

    markField(destInput,    "dest-error",    !destInput.value.trim());
    markField(checkinInput,  "checkin-error",  !checkinInput.value);
    markField(checkoutInput, "checkout-error", !checkoutInput.value || checkoutInput.value <= checkinInput.value);

    return valid;
  }

  /* ── Search + show results in carousel ── */
  function performSearch() {
    if (!validateForm()) return;

    const query   = destInput.value.trim().toLowerCase();
    const hotels  = JSON.parse(sessionStorage.getItem("hotelsData")) || [];

    const filtered = hotels
      .filter(function (h) {
        return (
          h.name.toLowerCase().includes(query) ||
          h.city.toLowerCase().includes(query) ||
          h.country.toLowerCase().includes(query) ||
          (h.overview && h.overview.toLowerCase().includes(query)) ||
          (h.address && h.address.toLowerCase().includes(query))
        );
      })
      .sort(function (a, b) { return a.name.localeCompare(b.name); });

    /* Save search context */
    sessionStorage.setItem("searchQuery",    destInput.value.trim());
    sessionStorage.setItem("searchCheckin",  checkinInput.value);
    sessionStorage.setItem("searchCheckout", checkoutInput.value);
    sessionStorage.setItem("searchGuests",   guestsSelect.value);
    sessionStorage.setItem("searchRooms",    roomsSelect.value);
    sessionStorage.setItem("searchResults",  JSON.stringify(filtered));

    renderSearchResultsCarousel(filtered);
  }

  /* ── Render search results in carousel (5 slides) ── */
  function renderSearchResultsCarousel(hotels) {
    /* Remove old carousel if present */
    const oldResultSec = document.getElementById("search-result-section");
    if (oldResultSec) oldResultSec.remove();

    /* Hide deals section */
    dealsSection.style.display = "none";

    /* Build section */
    const section = document.createElement("section");
    section.id        = "search-result-section";
    section.className = "section-pad";

    if (hotels.length === 0) {
      section.innerHTML =
        '<div class="container">' +
          '<div class="empty-state">' +
            '<div class="empty-icon"><i class="bi bi-building-slash"></i></div>' +
            '<h4>No Hotels Found</h4>' +
            '<p>Try a different destination or broader search term.</p>' +
          '</div>' +
        '</div>';
      dealsSection.insertAdjacentElement("beforebegin", section);
      return;
    }

    const headerId = "see-more-link";
    section.innerHTML =
      '<div class="container">' +
        '<div class="d-flex justify-content-between align-items-center mb-3">' +
          '<h2 class="section-heading mb-0">Results for "' + escHtml(sessionStorage.getItem("searchQuery")) + '"</h2>' +
          '<a href="searchResults.html" class="see-more-link" id="' + headerId + '">See more deals <i class="bi bi-arrow-right"></i></a>' +
        '</div>' +
        '<p class="section-sub">' + hotels.length + ' hotel(s) found</p>' +
        '<div class="divider-line"></div>' +

        '<div id="resultCarousel" class="carousel slide" data-bs-ride="false">' +
          '<div class="carousel-inner" id="result-carousel-inner"></div>' +
          '<button class="carousel-control-prev" type="button" data-bs-target="#resultCarousel" data-bs-slide="prev" id="res-prev">' +
            '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
            '<span class="visually-hidden">Previous</span>' +
          '</button>' +
          '<button class="carousel-control-next" type="button" data-bs-target="#resultCarousel" data-bs-slide="next" id="res-next">' +
            '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
            '<span class="visually-hidden">Next</span>' +
          '</button>' +
        '</div>' +
      '</div>';

    dealsSection.insertAdjacentElement("beforebegin", section);

    /* Populate carousel — 5 cards per slide */
    const inner = section.querySelector("#result-carousel-inner");
    const perSlide = 5;
    const totalSlides = Math.ceil(hotels.length / perSlide);

    for (let s = 0; s < totalSlides; s++) {
      const item = document.createElement("div");
      item.className = "carousel-item" + (s === 0 ? " active" : "");

      const row = document.createElement("div");
      row.className = "row g-3";

      hotels.slice(s * perSlide, (s + 1) * perSlide).forEach(function (hotel) {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-2d4";
        col.style.maxWidth = "20%";
        col.style.flex     = "0 0 20%";
        col.innerHTML =
          '<div class="search-result-card" data-id="' + hotel.id + '">' +
            '<img class="sr-img" src="' + hotel.photos[0] + '" alt="' + hotel.name + '" loading="lazy" />' +
            '<div class="sr-body">' +
              '<p class="sr-name">' + hotel.name + '</p>' +
              '<p class="sr-city"><i class="bi bi-geo-alt-fill me-1"></i>' + hotel.city + '</p>' +
              '<div class="d-flex justify-content-between align-items-center mt-1">' +
                '<span>' + starsHTML(hotel.starRating) + '</span>' +
                '<span class="sr-price">$' + hotel.ratesFrom + '</span>' +
              '</div>' +
            '</div>' +
          '</div>';

        col.querySelector(".search-result-card").addEventListener("click", function () {
          openHotelDetails(parseInt(this.getAttribute("data-id")));
        });

        row.appendChild(col);
      });

      item.appendChild(row);
      inner.appendChild(item);
    }

    /* Make sure popoverstate for carousel is inside the DOM */
    setTimeout(function () {
      new bootstrap.Carousel(document.getElementById("resultCarousel"), { interval: false });
    }, 50);
  }

  /* ── searchByQuery (from popular searches) ── */
  function searchByQuery(query) {
    const hotels = JSON.parse(sessionStorage.getItem("hotelsData")) || [];
    const filtered = hotels
      .filter(function (h) {
        const q = query.toLowerCase();
        return (
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.country.toLowerCase().includes(q) ||
          (h.overview && h.overview.toLowerCase().includes(q))
        );
      })
      .sort(function (a, b) { return a.name.localeCompare(b.name); });

    sessionStorage.setItem("searchQuery",   query);
    sessionStorage.setItem("searchResults", JSON.stringify(filtered));

    window.location.href = "searchResults.html";
  }

  /* ── Open hotel details ── */
  function openHotelDetails(hotelId) {
    const hotels = JSON.parse(sessionStorage.getItem("hotelsData")) || [];
    const hotel  = hotels.find(function (h) { return h.id === hotelId; });
    if (!hotel) return;

    /* Create/update the current booking object */
    const booking = {
      hotel: {
        id:      hotel.id,
        name:    hotel.name,
        address: hotel.address
      }
    };
    sessionStorage.setItem("currentBooking", JSON.stringify(booking));
    sessionStorage.setItem("selectedHotel",  JSON.stringify(hotel));

    window.location.href = "hotelDetails.html";
  }

  /* ── Escape HTML ── */
  function escHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ── Listen to search button ── */
  searchBtn.addEventListener("click", performSearch);

  /* Allow pressing Enter in the destination field */
  destInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") performSearch();
  });

  /* ── Init ── */
  renderDeals();
  renderPopular();

})();
