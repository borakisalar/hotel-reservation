/* ============================================================
   payment.js  –  Logic for payment.html
============================================================ */

(function () {
  "use strict";

  /* ── Load booking from sessionStorage ── */
  const booking = JSON.parse(sessionStorage.getItem("currentBooking") || "null");

  const noBookingState = document.getElementById("no-booking-state");
  const paymentContent = document.getElementById("payment-content");

  if (!booking || !booking.reservationData) {
    noBookingState.classList.remove("d-none");
    return;
  }

  paymentContent.classList.remove("d-none");

  /* ── Populate booking summary sidebar ── */
  const rd = booking.reservationData;

  document.getElementById("sum-hotel-name").textContent    = booking.hotel.name;
  document.getElementById("sum-hotel-address").textContent = booking.hotel.address;
  document.getElementById("sum-room-type").textContent     = rd.roomType;
  document.getElementById("sum-room-count").textContent    = rd.roomCount + " room(s)";
  document.getElementById("sum-guests").textContent        = rd.guestCount + " guest(s)";
  document.getElementById("sum-checkin").textContent       = rd.checkInDate  || "—";
  document.getElementById("sum-checkout").textContent      = rd.checkOutDate || "—";
  document.getElementById("sum-nights").textContent        = rd.nights + " night(s)";
  document.getElementById("sum-rate").textContent          = "$" + rd.pricePerNight + "/night × " + rd.roomCount;
  document.getElementById("sum-total").textContent         = "$" + rd.totalAmount.toFixed(2);

  /* Bank transfer amount and reference */
  document.getElementById("bank-amount").textContent    = "$" + rd.totalAmount.toFixed(2);
  document.getElementById("bank-reference").textContent = "SE-" + Date.now().toString().slice(-6);

  /* ── Page title ── */
  document.title = "Pay for " + booking.hotel.name + " — StayEasy";

  /* ── Card visual live update ── */
  const cardNumberInput = document.getElementById("card-number");
  const cardHolderInput = document.getElementById("card-holder");
  const cardExpiryInput = document.getElementById("card-expiry");
  const cardPreviewNum  = document.getElementById("card-preview-number");
  const cardPreviewHolder = document.getElementById("card-preview-holder");
  const cardPreviewExpiry = document.getElementById("card-preview-expiry");

  /* Format card number with spaces */
  cardNumberInput.addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "").substring(0, 16);
    this.value = v.replace(/(.{4})/g, "$1 ").trim();
    cardPreviewNum.textContent = this.value.padEnd(19, "•").replace(/\S{4}(?=.)/g, "$& ").substring(0, 19) || "•••• •••• •••• ••••";
  });

  /* Format expiry MM/YY */
  cardExpiryInput.addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "").substring(0, 4);
    if (v.length >= 2) v = v.substring(0, 2) + "/" + v.substring(2);
    this.value = v;
    cardPreviewExpiry.textContent = this.value || "MM/YY";
  });

  cardHolderInput.addEventListener("input", function () {
    cardPreviewHolder.textContent = this.value.toUpperCase() || "YOUR NAME";
  });

  /* ── Validation helpers ── */
  function markValid(inputEl, errId) {
    inputEl.classList.remove("is-invalid");
    const e = document.getElementById(errId);
    if (e) e.style.display = "none";
  }

  function markInvalid(inputEl, errId) {
    inputEl.classList.add("is-invalid");
    const e = document.getElementById(errId);
    if (e) e.style.display = "block";
  }

  function validateGuestInfo() {
    let valid = true;

    const fn = document.getElementById("guest-firstname");
    const ln = document.getElementById("guest-lastname");
    const em = document.getElementById("guest-email");
    const ph = document.getElementById("guest-phone");

    if (!fn.value.trim()) { markInvalid(fn, "firstname-error"); valid = false; } else markValid(fn, "firstname-error");
    if (!ln.value.trim()) { markInvalid(ln, "lastname-error");  valid = false; } else markValid(ln, "lastname-error");

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(em.value.trim())) { markInvalid(em, "email-error"); valid = false; } else markValid(em, "email-error");

    const phoneRe = /^[+\d\s\-().]{7,20}$/;
    if (!phoneRe.test(ph.value.trim())) { markInvalid(ph, "phone-error"); valid = false; } else markValid(ph, "phone-error");

    return valid;
  }

  function validateCardPayment() {
    let valid = true;

    const cn = document.getElementById("card-number");
    const ch = document.getElementById("card-holder");
    const ce = document.getElementById("card-expiry");
    const cv = document.getElementById("card-cvv");

    const rawNum = cn.value.replace(/\s/g, "");
    if (rawNum.length !== 16) { markInvalid(cn, "cardnumber-error"); valid = false; } else markValid(cn, "cardnumber-error");
    if (!ch.value.trim())     { markInvalid(ch, "cardholder-error"); valid = false; } else markValid(ch, "cardholder-error");

    const expiryRe = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRe.test(ce.value.trim())) { markInvalid(ce, "expiry-error"); valid = false; } else markValid(ce, "expiry-error");

    const cvvRe = /^\d{3,4}$/;
    if (!cvvRe.test(cv.value.trim())) { markInvalid(cv, "cvv-error"); valid = false; } else markValid(cv, "cvv-error");

    return valid;
  }

  /* ── Complete Booking ── */
  document.getElementById("complete-btn").addEventListener("click", function () {
    const activeTab = document.querySelector(".payment-method-tabs .nav-link.active");
    const isCardTab = activeTab && activeTab.id === "card-tab";

    /* Validate guest info */
    const guestOk = validateGuestInfo();

    /* Validate payment */
    let paymentOk = true;
    if (isCardTab) {
      paymentOk = validateCardPayment();
    }

    /* Validate terms */
    const termsCheck  = document.getElementById("terms-agree");
    const termsOk     = termsCheck.checked;
    const termsErrEl  = document.getElementById("terms-error");
    if (!termsOk) {
      termsCheck.classList.add("is-invalid");
      if (termsErrEl) termsErrEl.style.display = "block";
    } else {
      termsCheck.classList.remove("is-invalid");
      if (termsErrEl) termsErrEl.style.display = "none";
    }

    if (!guestOk || !paymentOk || !termsOk) return;

    /* ── Build reservation object ── */
    const guestData = {
      firstName: document.getElementById("guest-firstname").value.trim(),
      lastName:  document.getElementById("guest-lastname").value.trim(),
      email:     document.getElementById("guest-email").value.trim(),
      phone:     document.getElementById("guest-phone").value.trim()
    };

    let paymentInformation;
    if (isCardTab) {
      paymentInformation = {
        paymentMethod: "Credit Card",
        cardInfo: {
          cardNumber: document.getElementById("card-number").value.replace(/\s/g, ""),
          cardHolder: document.getElementById("card-holder").value.trim(),
          expiryDate: document.getElementById("card-expiry").value.trim(),
          cvv:        document.getElementById("card-cvv").value.trim()
        },
        totalAmount: rd.totalAmount
      };
    } else {
      paymentInformation = {
        paymentMethod: "Bank Transfer",
        reference:     document.getElementById("bank-reference").textContent,
        totalAmount:   rd.totalAmount
      };
    }

    /* Full reservation object matching spec */
    const reservation = {
      hotel: {
        name:    booking.hotel.name,
        address: booking.hotel.address
      },
      reservationData: {
        roomCount:    rd.roomCount,
        guestCount:   rd.guestCount,
        roomType:     rd.roomType,
        checkInDate:  rd.checkInDate,
        checkOutDate: rd.checkOutDate
      },
      guestData: guestData,
      paymentInformation: paymentInformation
    };

    /* Save to sessionStorage — do NOT clear sessionStorage */
    sessionStorage.setItem("reservation", JSON.stringify(reservation));

    /* Clear only the form fields on screen */
    clearFormFields();

    /* Success alert */
    alert(
      "✅ Booking Confirmed!\n\n" +
      "Thank you, " + guestData.firstName + " " + guestData.lastName + "!\n" +
      "Your reservation at " + booking.hotel.name + " has been confirmed.\n\n" +
      "Room: " + rd.roomType + " × " + rd.roomCount + "\n" +
      "Check-In: " + (rd.checkInDate || "—") + "\n" +
      "Check-Out: " + (rd.checkOutDate || "—") + "\n" +
      "Total: $" + rd.totalAmount.toFixed(2) + "\n\n" +
      "A confirmation will be sent to " + guestData.email
    );
  });

  /* ── Clear form fields (NOT sessionStorage) ── */
  function clearFormFields() {
    const ids = [
      "guest-firstname", "guest-lastname", "guest-email", "guest-phone",
      "card-number", "card-holder", "card-expiry", "card-cvv"
    ];
    ids.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    /* Reset card preview */
    cardPreviewNum.textContent    = "•••• •••• •••• ••••";
    cardPreviewHolder.textContent = "YOUR NAME";
    cardPreviewExpiry.textContent = "MM/YY";

    document.getElementById("terms-agree").checked = false;

    /* Remove any validation classes */
    document.querySelectorAll(".is-invalid").forEach(function (el) {
      el.classList.remove("is-invalid");
    });
  }

})();
