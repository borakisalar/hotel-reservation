/* ============================================================
   hotelDetails.js  –  Logic for hotelDetails.html
============================================================ */

(function () {
  "use strict";

  /* ── Load hotel from sessionStorage ── */
  const hotel = JSON.parse(sessionStorage.getItem("selectedHotel") || "null");

  const notFoundState = document.getElementById("not-found-state");
  const hotelContent  = document.getElementById("hotel-content");

  if (!hotel) {
    notFoundState.classList.remove("d-none");
    return;
  }

  /* ── Show main content ── */
  hotelContent.classList.remove("d-none");

  /* ── Breadcrumb ── */
  document.getElementById("breadcrumb-name").textContent = hotel.name;
  document.title = hotel.name + " — StayEasy";

  /* ── Photo carousel ── */
  const carouselInner     = document.getElementById("detail-carousel-inner");
  const carouselIndicators = document.getElementById("detail-indicators");

  hotel.photos.forEach(function (url, idx) {
    /* Indicator */
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-bs-target", "#detailCarousel");
    btn.setAttribute("data-bs-slide-to", String(idx));
    if (idx === 0) { btn.classList.add("active"); btn.setAttribute("aria-current", "true"); }
    carouselIndicators.appendChild(btn);

    /* Slide */
    const item = document.createElement("div");
    item.className = "carousel-item" + (idx === 0 ? " active" : "");
    const img = document.createElement("img");
    img.src = url;
    img.alt = hotel.name + " photo " + (idx + 1);
    img.className = "d-block w-100";
    img.loading = "lazy";
    item.appendChild(img);
    carouselInner.appendChild(item);
  });

  /* ── Hotel info ── */
  document.getElementById("hotel-name").textContent = hotel.name;
  document.getElementById("hotel-address").innerHTML =
    '<i class="bi bi-geo-alt-fill text-primary me-1"></i>' + hotel.address;
  document.getElementById("hotel-overview").textContent = hotel.overview;

  /* Tags */
  const tagsEl = document.getElementById("hotel-tags");
  const starsTag = document.createElement("span");
  starsTag.className = "info-tag";
  let starIcons = "";
  for (let i = 0; i < hotel.starRating; i++) starIcons += '<i class="bi bi-star-fill" style="color:#f59e0b"></i>';
  starsTag.innerHTML = starIcons + " " + hotel.starRating + "-Star Hotel";
  tagsEl.appendChild(starsTag);

  const ratingTag = document.createElement("span");
  ratingTag.className = "info-tag";
  ratingTag.innerHTML = '<i class="bi bi-hand-thumbs-up-fill me-1" style="color:#1a6ef5"></i>' +
    hotel.ratingAverage + "/10 (" + hotel.numberOfReviews.toLocaleString() + " reviews)";
  tagsEl.appendChild(ratingTag);

  const priceTag = document.createElement("span");
  priceTag.className = "info-tag";
  priceTag.innerHTML = '<i class="bi bi-currency-dollar me-1"></i>From $' + hotel.ratesFrom + "/night";
  tagsEl.appendChild(priceTag);

  /* Amenities */
  const amenEl = document.getElementById("hotel-amenities");
  hotel.amenities.forEach(function (a) {
    const span = document.createElement("span");
    span.className = "info-tag";
    span.innerHTML = '<i class="bi bi-check-circle-fill me-1" style="color:#10b981"></i>' + a;
    amenEl.appendChild(span);
  });

  /* Rules */
  const rulesEl = document.getElementById("hotel-rules");
  const rules = [
    { icon: "bi-door-open",      text: "Check-in: " + hotel.checkIn },
    { icon: "bi-door-closed",    text: "Check-out: " + hotel.checkOut },
    { icon: "bi-smoke",          text: "No smoking in rooms" },
    { icon: "bi-exclamation-triangle", text: "No pets allowed" },
    { icon: "bi-people",         text: "ID required at check-in" },
    { icon: "bi-cash-coin",      text: "50% deposit required" }
  ];

  rules.forEach(function (r) {
    const div = document.createElement("div");
    div.className = "rule-item";
    div.innerHTML = '<span class="rule-icon"><i class="bi ' + r.icon + '"></i></span>' + r.text;
    rulesEl.appendChild(div);
  });

  /* ── Room Selection (initially hidden) ── */
  const roomSelectionDiv = document.getElementById("room-selection");
  const bookNowBtn       = document.getElementById("book-now-btn");
  const cancelRoomBtn    = document.getElementById("cancel-room-btn");
  const proceedBtn       = document.getElementById("proceed-btn");
  const roomCardsContainer = document.getElementById("room-cards-container");
  const roomCountInput   = document.getElementById("room-count-input");
  const roomErrorAlert   = document.getElementById("room-error-alert");
  const priceSummaryText = document.getElementById("price-summary-text");
  const priceSummaryTotal = document.getElementById("price-summary-total");

  /* Restore search dates for display */
  const checkin  = sessionStorage.getItem("searchCheckin")  || "";
  const checkout = sessionStorage.getItem("searchCheckout") || "";
  const guests   = sessionStorage.getItem("searchGuests")   || "2";

  document.getElementById("summary-guests").textContent   = guests + " guest(s)";
  document.getElementById("summary-checkin").textContent  = checkin  || "Not specified";
  document.getElementById("summary-checkout").textContent = checkout || "Not specified";

  /* Night count helper */
  function nightCount() {
    if (!checkin || !checkout) return 1;
    const ms = new Date(checkout) - new Date(checkin);
    const n  = Math.round(ms / (1000 * 60 * 60 * 24));
    return n > 0 ? n : 1;
  }

  /* ── Generate room cards dynamically ── */
  function generateRoomCards() {
    roomCardsContainer.innerHTML = "";
    hotel.rooms.forEach(function (room, idx) {
      const div = document.createElement("div");
      div.className = "room-card";
      div.innerHTML =
        '<input type="radio" name="roomType" id="room-' + idx + '" value="' + idx + '" />' +
        '<label for="room-' + idx + '" class="room-card-info" style="cursor:pointer;flex:1">' +
          '<p class="room-type-name">' + room.type + '</p>' +
          '<p class="room-features">' + room.features + ' &nbsp;|&nbsp; Max ' + room.maxGuests + ' guests</p>' +
        '</label>' +
        '<div class="text-end">' +
          '<div class="room-price">$' + room.pricePerNight + '<small>per night</small></div>' +
        '</div>';

      /* Click anywhere on card selects radio */
      div.addEventListener("click", function () {
        const radio = this.querySelector("input[type=radio]");
        radio.checked = true;
        /* Remove active from siblings */
        document.querySelectorAll(".room-card").forEach(function (c) { c.classList.remove("active"); });
        div.classList.add("active");
        updatePriceSummary(room);
        roomErrorAlert.classList.add("d-none");
      });

      roomCardsContainer.appendChild(div);
    });

    /* Update price when room count changes */
    roomCountInput.addEventListener("input", function () {
      const selected = document.querySelector('input[name="roomType"]:checked');
      if (selected) {
        const roomIdx = parseInt(selected.value);
        updatePriceSummary(hotel.rooms[roomIdx]);
      }
    });
  }

  /* ── Update price summary ── */
  function updatePriceSummary(room) {
    const nights = nightCount();
    const rooms  = parseInt(roomCountInput.value) || 1;
    const total  = room.pricePerNight * nights * rooms;
    priceSummaryText.textContent = room.type + " × " + rooms + " room(s) × " + nights + " night(s)";
    priceSummaryTotal.textContent = "$" + total.toFixed(2);
  }

  /* ── Book Now button shows room selection ── */
  bookNowBtn.addEventListener("click", function () {
    generateRoomCards();
    roomSelectionDiv.style.display = "block";
    roomSelectionDiv.classList.add("fade-in");
    /* Smooth scroll */
    setTimeout(function () {
      roomSelectionDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  });

  /* ── Cancel button hides room selection ── */
  cancelRoomBtn.addEventListener("click", function () {
    roomSelectionDiv.style.display = "none";
  });

  /* ── Proceed to Payment ── */
  proceedBtn.addEventListener("click", function () {
    const selectedRadio = document.querySelector('input[name="roomType"]:checked');

    /* Room type validation */
    if (!selectedRadio) {
      roomErrorAlert.classList.remove("d-none");
      return;
    }

    /* Room count validation */
    const roomCount = parseInt(roomCountInput.value);
    if (!roomCount || roomCount < 1) {
      roomCountInput.classList.add("is-invalid");
      document.getElementById("room-count-error").style.display = "block";
      return;
    }

    roomCountInput.classList.remove("is-invalid");
    document.getElementById("room-count-error").style.display = "none";
    roomErrorAlert.classList.add("d-none");

    const selectedRoom = hotel.rooms[parseInt(selectedRadio.value)];
    const nights       = nightCount();
    const total        = selectedRoom.pricePerNight * nights * roomCount;

    /* Update the existing booking object (do NOT create a new one) */
    const booking = JSON.parse(sessionStorage.getItem("currentBooking") || "{}");
    booking.hotel = { name: hotel.name, address: hotel.address };
    booking.reservationData = {
      roomCount:     roomCount,
      guestCount:    parseInt(guests),
      roomType:      selectedRoom.type,
      pricePerNight: selectedRoom.pricePerNight,
      checkInDate:   checkin,
      checkOutDate:  checkout,
      nights:        nights,
      totalAmount:   total
    };
    sessionStorage.setItem("currentBooking", JSON.stringify(booking));

    window.location.href = "payment.html";
  });

})();
