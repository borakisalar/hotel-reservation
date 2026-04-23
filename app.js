const hotels = [
    {
        id: 1,
        name: "Antalya Beach Resort",
        address: "123 Beach Rd, Antalya, Turkey",
        city: "Antalya",
        star: 5,
        rating: 9.2,
        price: 150,
        description: "A beautiful beachfront resort offering all-inclusive packages.",
        image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=600&q=80",
        rules: ["Check-in: 14:00", "Check-out: 12:00", "No smoking", "Pets allowed"],
        rooms: [
            { type: "Standard", price: 150, maxGuests: 2, features: "Sea view, 1 Double Bed" },
            { type: "Deluxe", price: 250, maxGuests: 3, features: "Sea view, 1 King Bed, Balcony" }
        ]
    },
    {
        id: 2,
        name: "Istanbul City Hotel",
        address: "45 Taksim Sq, Istanbul, Turkey",
        city: "Istanbul",
        star: 4,
        rating: 8.5,
        price: 100,
        description: "Right in the heart of Istanbul. Connect easily to everywhere.",
        image: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=600&q=80",
        rules: ["Check-in: 13:00", "Check-out: 11:30", "No smoking", "No pets"],
        rooms: [
            { type: "Standard", price: 100, maxGuests: 2, features: "City view, 1 Double Bed" },
            { type: "Suite", price: 200, maxGuests: 4, features: "City view, 1 King, 1 Sofa" }
        ]
    },
    {
        id: 3,
        name: "Izmir Seaside Inn",
        address: "99 Kordon, Izmir, Turkey",
        city: "Izmir",
        star: 3,
        rating: 7.9,
        price: 80,
        description: "A cozy and affordable stay with views of the Aegean sea.",
        image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=600&q=80",
        rules: ["Check-in: 14:00", "Check-out: 11:00", "Smoking allowed on balcony", "Pets allowed"],
        rooms: [
            { type: "Standard", price: 80, maxGuests: 2, features: "Street view, 2 Twin Beds" },
            { type: "Sea View", price: 120, maxGuests: 2, features: "Sea view, 1 Double Bed" }
        ]
    },
    {
        id: 4,
        name: "Bodrum Luxury Villas",
        address: "77 Yalikavak, Bodrum, Turkey",
        city: "Bodrum",
        star: 5,
        rating: 9.6,
        price: 400,
        description: "Exclusive private villas with personal pools.",
        image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80",
        rules: ["Check-in: 15:00", "Check-out: 12:00", "No smoking indoors", "No pets"],
        rooms: [
            { type: "Villa 1", price: 400, maxGuests: 4, features: "Private Pool, 2 Bedrooms" },
            { type: "Villa 2", price: 600, maxGuests: 6, features: "Private Pool, 3 Bedrooms" }
        ]
    },
    {
        id: 5,
        name: "Cappadocia Cave Hotel",
        address: "12 Goreme, Cappadocia, Turkey",
        city: "Cappadocia",
        star: 4,
        rating: 9.1,
        price: 180,
        description: "Experience the unique cave rooms of Cappadocia.",
        image: "https://images.unsplash.com/photo-1569949516362-f4c4b33d62a0?auto=format&fit=crop&w=600&q=80",
        rules: ["Check-in: 14:00", "Check-out: 11:00", "No smoking", "No pets"],
        rooms: [
            { type: "Cave Standard", price: 180, maxGuests: 2, features: "Cave experience, 1 Double Bed" },
            { type: "Cave Suite", price: 300, maxGuests: 4, features: "Cave experience, Jacuzzi" }
        ]
    }
];
const deals = [
    { title: "Summer Sale 20%", details: "Save 20% on all Beach Resorts.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
    { title: "City Break", details: "Book 3 nights, pay for 2 in Istanbul.", img: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=400&q=80" },
    { title: "Early Bird", details: "15% off when booking 60 days ahead.", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80" },
    { title: "Honeymoon Package", details: "Free spa access for couples.", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80" }
];
const popular = [
    { title: "Antalya", details: "Average $120/night", img: "https://images.unsplash.com/photo-1612965607446-25e1332775ae?auto=format&fit=crop&w=600&q=80" },
    { title: "Bodrum", details: "Average $200/night", img: "https://idsb.tmgrup.com.tr/ly/uploads/images/2023/06/22/thumbs/800x531/279235.jpg" },
    { title: "Istanbul", details: "Average $90/night", img: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=600&q=80" },
    { title: "Cappadocia", details: "Average $140/night", img: "https://images6.alphacoders.com/127/1279674.jpg" }
];
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    if (path.endsWith("index.html") || path.endsWith("/") || !path.includes(".html")) {
        initIndex();
    }
    else if (path.endsWith("searchResults.html")) {
        initSearchResults();
    }
    else if (path.endsWith("hotelDetails.html")) {
        initHotelDetails();
    }
    else if (path.endsWith("payment.html")) {
        initPayment();
    }
});
function initIndex() {
    renderDeals();
    renderPopular();
    attachSearchForm("searchForm");
}
function renderDeals() {
    const container = document.getElementById("dealsContainer");
    deals.forEach(deal => {
        const col = document.createElement("div");
        col.className = "col-md-3";
        col.innerHTML = `
            <div class="card deal-card h-100">
                <img src="${deal.img}" class="card-img-top" alt="${deal.title}">
                <div class="card-body">
                    <h5 class="card-title">${deal.title}</h5>
                    <p class="card-text">${deal.details}</p>
                    <a href="#" class="btn btn-sm btn-outline-primary mt-2">Learn More</a>
                </div>
            </div>`;
        container.appendChild(col);
    });
}
function renderPopular() {
    const inner = document.getElementById("popularCarouselInner");
    for (let i = 0; i < popular.length; i += 2) {
        let activeClass = i === 0 ? "active" : "";
        let item1 = popular[i];
        let item2 = popular[i + 1] || popular[i];
        let slide = document.createElement("div");
        slide.className = `carousel-item ${activeClass}`;
        slide.innerHTML = `
            <div class="row">
                <div class="col-6">
                    <div class="card popular-card cursor-pointer pointer-event" onclick="triggerSearch('${item1.title}')" style="cursor: pointer;">
                        <img src="${item1.img}" class="card-img-top" alt="${item1.title}">
                        <div class="card-body bg-dark text-white text-center">
                            <h5>${item1.title}</h5>
                            <p>${item1.details}</p>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card popular-card cursor-pointer pointer-event" onclick="triggerSearch('${item2.title}')" style="cursor: pointer;">
                        <img src="${item2.img}" class="card-img-top" alt="${item2.title}">
                        <div class="card-body bg-dark text-white text-center">
                            <h5>${item2.title}</h5>
                            <p>${item2.details}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        inner.appendChild(slide);
    }
}
window.triggerSearch = function (query) {
    document.getElementById("searchQuery").value = query;
    let tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    let after = new Date(); after.setDate(after.getDate() + 2);
    document.getElementById("checkIn").value = tomorrow.toISOString().split("T")[0];
    document.getElementById("checkOut").value = after.toISOString().split("T")[0];
    document.getElementById("searchForm").dispatchEvent(new Event("submit"));
};
function attachSearchForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const savedQuery = sessionStorage.getItem("searchQuery");
    if (savedQuery && document.getElementById("searchQuery")) {
        document.getElementById("searchQuery").value = savedQuery;
        document.getElementById("checkIn").value = sessionStorage.getItem("checkIn");
        document.getElementById("checkOut").value = sessionStorage.getItem("checkOut");
        document.getElementById("guestCount").value = sessionStorage.getItem("guestCount");
        document.getElementById("roomCount").value = sessionStorage.getItem("roomCount");
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = document.getElementById("searchQuery").value.trim();
        const error = document.getElementById("queryError");
        if (!query) {
            error.style.display = "block";
            return;
        }
        error.style.display = "none";
        sessionStorage.setItem("searchQuery", query);
        sessionStorage.setItem("checkIn", document.getElementById("checkIn").value);
        sessionStorage.setItem("checkOut", document.getElementById("checkOut").value);
        sessionStorage.setItem("guestCount", document.getElementById("guestCount").value);
        sessionStorage.setItem("roomCount", document.getElementById("roomCount").value);
        const filtered = hotels.filter(h =>
            h.name.toLowerCase().includes(query.toLowerCase()) ||
            h.city.toLowerCase().includes(query.toLowerCase()) ||
            h.description.toLowerCase().includes(query.toLowerCase())
        ).sort((a, b) => a.name.localeCompare(b.name));
        sessionStorage.setItem("searchResults", JSON.stringify(filtered));
        if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/") || !window.location.pathname.includes(".html")) {
            displayIndexResults(filtered);
        } else {
            window.location.href = "searchResults.html";
        }
    });
}
function displayIndexResults(results) {
    document.getElementById("dealsSection").style.display = "none";
    document.getElementById("indexSearchResultsSection").style.display = "block";
    const inner = document.getElementById("searchResultsCarouselInner");
    inner.innerHTML = "";
    for (let i = 0; i < results.length; i += 5) {
        let activeClass = i === 0 ? "active" : "";
        let slice = results.slice(i, i + 5);
        let rowHtml = `<div class="row">`;
        slice.forEach(h => {
            rowHtml += `
            <div class="col">
                <div class="card hotel-card h-100" style="cursor:pointer;" onclick="selectHotel(${h.id})">
                    <img src="${h.image}" class="card-img-top">
                    <div class="card-body">
                        <h6>${h.name}</h6>
                        <p class="small m-0 text-muted">${h.city}</p>
                    </div>
                </div>
            </div>`;
        });
        rowHtml += `</div>`;
        let slide = document.createElement("div");
        slide.className = `carousel-item ${activeClass}`;
        slide.innerHTML = rowHtml;
        inner.appendChild(slide);
    }
    if (results.length === 0) {
        inner.innerHTML = '<p>No results found.</p>';
    }
}
function initSearchResults() {
    attachSearchForm("searchForm");
    const results = JSON.parse(sessionStorage.getItem("searchResults") || "[]");
    const container = document.getElementById("searchResultsGrid");
    container.innerHTML = "";
    if (results.length === 0) {
        container.innerHTML = "<p>No hotels match your search.</p>";
        return;
    }
    results.forEach(h => {
        const col = document.createElement("div");
        col.className = "col-md-3";
        col.innerHTML = `
            <div class="card hotel-card h-100" style="cursor:pointer;" onclick="selectHotel(${h.id})">
                <img src="${h.image}" class="card-img-top" alt="${h.name}">
                <div class="card-body">
                    <h5 class="card-title">${h.name}</h5>
                    <div class="mb-2">
                        <span class="badge bg-warning text-dark">${h.star} Stars</span>
                        <span class="badge bg-info text-dark">Rating: ${h.rating}</span>
                    </div>
                    <p class="card-text text-muted small"><i class="bi bi-geo-alt"></i> ${h.city}</p>
                    <h6 class="text-success mt-auto">From $${h.price}</h6>
                </div>
            </div>`;
        container.appendChild(col);
    });
}
window.selectHotel = function (id) {
    const hotel = hotels.find(h => h.id === id);
    if (hotel) {
        sessionStorage.setItem("selectedHotel", JSON.stringify(hotel));
        window.location.href = "hotelDetails.html";
    }
}
function initHotelDetails() {
    const hotel = JSON.parse(sessionStorage.getItem("selectedHotel"));
    if (!hotel) {
        alert("No hotel selected");
        window.location.href = "index.html";
        return;
    }
    const inner = document.getElementById("hotelCarouselInner");
    inner.innerHTML = `
        <div class="carousel-item active">
            <img src="${hotel.image}" class="d-block w-100" alt="view 1">
        </div>
        <div class="carousel-item">
            <img src="${hotel.image}" class="d-block w-100" alt="view 2" style="filter: brightness(0.8);">
        </div>
    `;
    document.getElementById("hotelNameTitle").innerText = hotel.name;
    document.getElementById("hotelAddress").innerText = hotel.address;
    document.getElementById("hotelStar").innerText = `${hotel.star} Stars`;
    document.getElementById("hotelRating").innerText = `Rating: ${hotel.rating}`;
    document.getElementById("hotelDescription").innerText = hotel.description;
    document.getElementById("hotelPrice").innerText = `From $${hotel.price} / night`;
    const rulesList = document.getElementById("hotelRulesList");
    hotel.rules.forEach(rule => {
        let li = document.createElement("li");
        li.innerText = rule;
        rulesList.appendChild(li);
    });
    document.getElementById("bookNowBtn").addEventListener("click", () => {
        document.getElementById("roomSelectionSection").style.display = "block";
        document.getElementById("hotelDetailsContainer").scrollIntoView({ behavior: "smooth", block: "end" });
    });
    const roomsContainer = document.getElementById("roomOptionsContainer");
    hotel.rooms.forEach((room, index) => {
        const col = document.createElement("div");
        col.className = "col-md-6";
        col.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="form-check">
                        <input class="form-check-input room-radio" type="radio" name="roomSelect" id="room${index}" value="${index}">
                        <label class="form-check-label w-100" for="room${index}">
                            <strong>${room.type}</strong> - $${room.price}/night
                            <br><small class="text-muted">${room.features} (Max: ${room.maxGuests})</small>
                        </label>
                    </div>
                </div>
            </div>
        `;
        roomsContainer.appendChild(col);
    });
    document.getElementById("proceedPaymentBtn").addEventListener("click", () => {
        const selected = document.querySelector('input[name="roomSelect"]:checked');
        if (!selected) {
            document.getElementById("roomError").style.display = "block";
            return;
        }
        const roomIndex = selected.value;
        const selectedRoom = hotel.rooms[roomIndex];
        const roomCount = parseInt(sessionStorage.getItem("roomCount") || "1");
        const guestCount = parseInt(sessionStorage.getItem("guestCount") || "2");
        const checkIn = sessionStorage.getItem("checkIn") || "Not set";
        const checkOut = sessionStorage.getItem("checkOut") || "Not set";
        let nights = 1;
        if (checkIn !== "Not set" && checkOut !== "Not set") {
            const d1 = new Date(checkIn);
            const d2 = new Date(checkOut);
            if (d2 > d1) {
                nights = (d2 - d1) / (1000 * 60 * 60 * 24);
            }
        }
        const totalAmount = selectedRoom.price * roomCount * nights;
        const reservation = {
            hotel: {
                name: hotel.name,
                address: hotel.address
            },
            reservationData: {
                roomCount: roomCount,
                guestCount: guestCount,
                roomType: selectedRoom.type,
                checkInDate: checkIn,
                checkOutDate: checkOut
            },
            amountInfo: {
                totalAmount: totalAmount,
                nights: nights
            }
        };
        sessionStorage.setItem("draftReservation", JSON.stringify(reservation));
        window.location.href = "payment.html";
    });
}
function initPayment() {
    const draftStr = sessionStorage.getItem("draftReservation");
    if (!draftStr) {
        alert("No reservation data found");
        window.location.href = "index.html";
        return;
    }
    const draft = JSON.parse(draftStr);
    document.getElementById("summaryName").innerText = draft.hotel.name;
    document.getElementById("summaryAddress").innerText = draft.hotel.address;
    document.getElementById("summaryRoomType").innerText = draft.reservationData.roomType;
    document.getElementById("summaryDates").innerText = `${draft.reservationData.checkInDate} to ${draft.reservationData.checkOutDate}`;
    document.getElementById("summaryGuests").innerText = draft.reservationData.guestCount;
    document.getElementById("summaryRooms").innerText = draft.reservationData.roomCount;
    document.getElementById("summaryTotal").innerText = "$" + draft.amountInfo.totalAmount;
    document.getElementById("paymentForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const finalReservation = {
            hotel: draft.hotel,
            reservationData: draft.reservationData,
            guestData: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value
            },
            paymentInformation: {
                paymentMethod: "Credit Card",
                cardInfo: {
                    cardNumber: document.getElementById("cardNumber").value,
                    cardHolder: document.getElementById("cardHolder").value,
                    expiryDate: document.getElementById("expiry").value,
                    cvv: document.getElementById("cvv").value
                },
                totalAmount: draft.amountInfo.totalAmount
            }
        };
        sessionStorage.setItem("reservation", JSON.stringify(finalReservation));
        document.getElementById("paymentForm").reset();
        alert("Booking has been successfully completed! Thank you.");
    });
}
