async function initializeData() {
    if (!sessionStorage.getItem('hotelsDataLoaded')) {
        try {
            const [data, h1, h2, mock] = await Promise.all([
                fetch('hotels-data.json').then(r => r.json()).catch(() => []),
                fetch('hotels1.json').then(r => r.json()).catch(() => []),
                fetch('hotels2.json').then(r => r.json()).catch(() => []),
                fetch('MOCK_DATA.json').then(r => r.json()).catch(() => [])
            ]);

            const rawHotels = [...data, ...h1, ...h2];
            
            const allHotels = rawHotels.map(h => ({
                id: h.id || Math.random().toString(36).substr(2, 9),
                name: h.name || h.hotelName || h.title || "Unknown Hotel",
                city: h.city || h.location || h.town || "Unknown Location",
                address: h.address || h.street || "Address not provided",
                details: h.details || h.description || h.info || h.about || "No description available.",
                image: h.image || h.imageUrl || h.photo || h.picture || "https://via.placeholder.com/300x200",
                price: h.price || h.cost || h.rate || Math.floor(Math.random() * 3000) + 1000
            }));
            
            sessionStorage.setItem('hotels', JSON.stringify(allHotels));
            
            const deals = mock.slice(0, 4).map(d => ({
                title: d.title || d.name || d.dealName || "Special Deal",
                details: d.details || d.description || d.info || "Limited time offer.",
                image: d.image || d.imageUrl || d.photo || "https://via.placeholder.com/300x200"
            }));
            sessionStorage.setItem('deals', JSON.stringify(deals));
            
            const uniqueCities = [...new Set(allHotels.map(h => h.city))].filter(Boolean).slice(0, 4);
            const popular = uniqueCities.map(city => {
                const matchedHotel = allHotels.find(h => h.city === city && !h.image.includes('placeholder'));
                return {
                    city: city,
                    image: matchedHotel ? matchedHotel.image : "https://via.placeholder.com/800x300"
                };
            });
            sessionStorage.setItem('popular', JSON.stringify(popular));

            sessionStorage.setItem('hotelsDataLoaded', 'true');
        } catch (error) {
            console.error(error);
        }
    }
    routePage();
}

function routePage() {
    if (document.getElementById('homePage')) setupHome();
    if (document.getElementById('resultsPage')) setupResults();
    if (document.getElementById('detailsPage')) setupDetails();
    if (document.getElementById('paymentPage')) setupPayment();
}

function setupHome() {
    const deals = JSON.parse(sessionStorage.getItem('deals')) || [];
    const dCont = document.getElementById('dealsContainer');
    deals.forEach(d => {
        dCont.innerHTML += `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <img src="${d.image}" class="card-img-top">
                    <div class="card-body text-center">
                        <h5 class="card-title">${d.title}</h5>
                        <p class="card-text small text-muted">${d.details}</p>
                    </div>
                </div>
            </div>`;
    });

    const popular = JSON.parse(sessionStorage.getItem('popular')) || [];
    const pCont = document.getElementById('popularContainer');
    popular.forEach((p, i) => {
        pCont.innerHTML += `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <div class="card bg-dark text-white border-0">
                    <img src="${p.image}" class="card-img opacity-50">
                    <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
                        <h2 class="fw-bold">${p.city}</h2>
                    </div>
                </div>
            </div>`;
    });

    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value.toLowerCase();
        if(!query) return alert("Please enter a search term.");

        const hotels = JSON.parse(sessionStorage.getItem('hotels')) || [];
        const filtered = hotels.filter(h => 
            h.name.toLowerCase().includes(query) || 
            h.city.toLowerCase().includes(query)
        ).sort((a, b) => a.name.localeCompare(b.name));

        sessionStorage.setItem('searchResults', JSON.stringify(filtered));
        window.location.href = 'searchResults.html';
    });
}

function setupResults() {
    const results = JSON.parse(sessionStorage.getItem('searchResults')) || [];
    const grid = document.getElementById('resultsGrid');
    
    if(results.length === 0) {
        grid.innerHTML = "<div class='col-12'><h4>No hotels found.</h4></div>";
        return;
    }

    results.forEach(hotel => {
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${hotel.image}" class="card-img-top" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${hotel.name}</h5>
                    <p class="text-muted mb-1">${hotel.city}</p>
                    <p class="fw-bold text-success mb-0">₺${hotel.price}</p>
                </div>
            </div>`;
        
        col.querySelector('.card').addEventListener('click', () => {
            sessionStorage.setItem('selectedHotel', JSON.stringify(hotel));
            window.location.href = 'hotelDetails.html';
        });
        
        grid.appendChild(col);
    });
}

function setupDetails() {
    const hotel = JSON.parse(sessionStorage.getItem('selectedHotel'));
    if(!hotel) return window.location.href = 'index.html';

    document.getElementById('hotelNameTitle').textContent = hotel.name;
    document.getElementById('hotelMainImg').src = hotel.image;
    document.getElementById('hotelDescText').textContent = hotel.details;
    document.getElementById('hotelAddressText').textContent = `Address: ${hotel.address}`;
    document.getElementById('hotelPriceText').textContent = `Starting from ₺${hotel.price}`;

    document.getElementById('bookNowBtn').addEventListener('click', () => {
        document.getElementById('roomSection').classList.remove('hidden');
        
        const tbody = document.getElementById('roomTableBody');
        const basePrice = parseInt(hotel.price) || 2000;
        tbody.innerHTML = `
            <tr>
                <td>Standard Room</td>
                <td>₺${basePrice}</td>
                <td><button class="btn btn-outline-primary btn-sm select-room" data-type="Standard" data-price="${basePrice}">Select</button></td>
            </tr>
            <tr>
                <td>Deluxe Suite</td>
                <td>₺${basePrice + 1500}</td>
                <td><button class="btn btn-outline-primary btn-sm select-room" data-type="Deluxe" data-price="${basePrice + 1500}">Select</button></td>
            </tr>
        `;

        document.querySelectorAll('.select-room').forEach(btn => {
            btn.addEventListener('click', (e) => {
                hotel.selectedRoomType = e.target.getAttribute('data-type');
                hotel.selectedPrice = e.target.getAttribute('data-price');
                sessionStorage.setItem('selectedHotel', JSON.stringify(hotel));
                window.location.href = 'payment.html';
            });
        });
    });
}

function setupPayment() {
    const hotel = JSON.parse(sessionStorage.getItem('selectedHotel'));
    if(!hotel || !hotel.selectedRoomType) return window.location.href = 'index.html';

    document.getElementById('summaryHotel').textContent = hotel.name;
    document.getElementById('summaryRoom').textContent = `${hotel.selectedRoomType} Room`;
    document.getElementById('summaryTotal').textContent = `Total: ₺${hotel.selectedPrice}`;

    document.getElementById('paymentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const reservation = {
            hotelInfo: hotel,
            guestName: document.getElementById('guestName').value,
            guestEmail: document.getElementById('guestEmail').value,
            date: new Date().toISOString()
        };

        sessionStorage.setItem('finalReservation', JSON.stringify(reservation));
        alert("Booking Successful! Redirecting to Home.");
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', initializeData);