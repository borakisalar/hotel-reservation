/* ============================================================
   searchResults.js  –  Logic for searchResults.html
============================================================ */

(function () {
  "use strict";

  /* ── Seed hotelsData if needed ── */
  if (!sessionStorage.getItem("hotelsData")) {
    sessionStorage.setItem("hotelsData", JSON.stringify(hotelsData));
  }

  /* ── DOM refs ── */
  const grid           = document.getElementById("hotels-grid");
  const emptyState     = document.getElementById("empty-state");
  const countText      = document.getElementById("results-count-text");
  const searchBtn      = document.getElementById("search-btn");
  const destInput      = document.getElementById("search-destination");
  const checkinInput   = document.getElementById("search-checkin");
  const checkoutInput  = document.getElementById("search-checkout");
  const guestsSelect   = document.getElementById("search-guests");
  const roomsSelect    = document.getElementById("search-rooms");

  /* ── Restore previous search fields from sessionStorage ── */
  const prevQuery    = sessionStorage.getItem("searchQuery")    || "";
  const prevCheckin  = sessionStorage.getItem("searchCheckin")  || "";
  const prevCheckout = sessionStorage.getItem("searchCheckout") || "";
  const prevGuests   = sessionStorage.getItem("searchGuests")   || "2";
  const prevRooms    = sessionStorage.getItem("searchRooms")    || "1";

  destInput.value       = prevQuery;
  checkinInput.value    = prevCheckin;
  checkoutInput.value   = prevCheckout;
  guestsSelect.value    = prevGuests;
  roomsSelect.value     = prevRooms;

  /* ── Set min dates ── */
  const today = new Date().toISOString().split("T")[0];
  checkinInput.min  = today;
  checkoutInput.min = today;

  checkinInput.addEventListener("change", function () {
    checkoutInput.min = this.value || today;
    if (checkoutInput.value && checkoutInput.value <= this.value) {
      checkoutInput.value = "";
    }
  });

  /* ── Helper: star rating HTML ── */
  function starsHTML(n) {
    let s = "";
    for (let i = 0; i < 5; i++) {
      s += i < n
        ? '<i class="bi bi-star-fill" style="color:#f59e0b;font-size:.75rem"></i>'
        : '<i class="bi bi-star" style="color:#cbd5e1;font-size:.75rem"></i>';
    }
    return s;
  }

  /* ── Render hotel grid ── */
  function renderHotels(hotels) {
    grid.innerHTML = "";
    emptyState.classList.add("d-none");

    if (hotels.length === 0) {
      countText.innerHTML = "No hotels found.";
      emptyState.classList.remove("d-none");
      return;
    }

    countText.innerHTML =
      'Showing <strong>' + hotels.length + '</strong> hotel(s)' +
      (prevQuery ? ' for "<strong>' + escHtml(prevQuery) + '</strong>"' : '');

    hotels.forEach(function (hotel, idx) {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3 fade-in";
      col.style.animationDelay = (idx * 0.04) + "s";
      col.innerHTML =
        '<div class="hotel-card" data-id="' + hotel.id + '" tabindex="0" role="button">' +
          '<div class="hc-img-wrap">' +
            '<img src="' + hotel.photos[0] + '" alt="' + hotel.name + '" loading="lazy" />' +
            '<div class="star-badge"><i class="bi bi-star-fill"></i>' + hotel.starRating + '</div>' +
          '</div>' +
          '<div class="hc-body">' +
            '<h2 class="hc-name">' + hotel.name + '</h2>' +
            '<p class="hc-location"><i class="bi bi-geo-alt-fill"></i>' + hotel.city + ', ' + hotel.country + '</p>' +
            '<div class="rating-pill"><i class="bi bi-hand-thumbs-up-fill"></i>' + hotel.ratingAverage + ' / 10</div>' +
            '<p style="font-size:.78rem;color:#64748b;margin-bottom:.4rem">' + hotel.numberOfReviews.toLocaleString() + ' reviews</p>' +
            '<div class="hc-price">From <strong>$' + hotel.ratesFrom + '</strong>/night</div>' +
          '</div>' +
        '</div>';

      const card = col.querySelector(".hotel-card");
      card.addEventListener("click",   function () { openHotelDetails(parseInt(this.getAttribute("data-id"))); });
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") openHotelDetails(parseInt(this.getAttribute("data-id"))); });

      grid.appendChild(col);
    });
  }

  /* ── Navigate to hotel details ── */
  function openHotelDetails(hotelId) {
    const hotels = JSON.parse(sessionStorage.getItem("hotelsData")) || [];
    const hotel  = hotels.find(function (h) { return h.id === hotelId; });
    if (!hotel) return;

    /* Create/update booking object as required — don't create a new key if it exists */
    const booking = JSON.parse(sessionStorage.getItem("currentBooking") || "{}");
    booking.hotel = { id: hotel.id, name: hotel.name, address: hotel.address };
    sessionStorage.setItem("currentBooking", JSON.stringify(booking));
    sessionStorage.setItem("selectedHotel",  JSON.stringify(hotel));
    window.location.href = "hotelDetails.html";
  }

  /* ── Validate form ── */
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

  /* ── Perform search (updates THIS page, does NOT go back to index.html) ── */
  function performSearch() {
    if (!validateForm()) return;

    const query  = destInput.value.trim().toLowerCase();
    const hotels = JSON.parse(sessionStorage.getItem("hotelsData")) || [];

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

    /* Update sessionStorage */
    sessionStorage.setItem("searchQuery",    destInput.value.trim());
    sessionStorage.setItem("searchCheckin",  checkinInput.value);
    sessionStorage.setItem("searchCheckout", checkoutInput.value);
    sessionStorage.setItem("searchGuests",   guestsSelect.value);
    sessionStorage.setItem("searchRooms",    roomsSelect.value);
    sessionStorage.setItem("searchResults",  JSON.stringify(filtered));

    renderHotels(filtered);
  }

  /* ── Escape HTML helper ── */
  function escHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ── Initial load: use stored results or show all sorted hotels ── */
  function init() {
    const storedResults = sessionStorage.getItem("searchResults");

    if (storedResults) {
      renderHotels(JSON.parse(storedResults));
    } else {
      /* No prior search — show all hotels sorted by name */
      const all = (JSON.parse(sessionStorage.getItem("hotelsData")) || [])
        .sort(function (a, b) { return a.name.localeCompare(b.name); });

      sessionStorage.setItem("searchResults", JSON.stringify(all));
      countText.innerHTML = 'Showing all <strong>' + all.length + '</strong> hotels';
      renderHotels(all);
    }
  }

  /* ── Event listeners ── */
  searchBtn.addEventListener("click", performSearch);
  destInput.addEventListener("keydown", function (e) { if (e.key === "Enter") performSearch(); });

  init();

})();
