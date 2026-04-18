const hotels = [
    { id: 1, name: "Antalya Hotel", city: "Antalya", address: "123 Beach Road", details: "Luxury stay by the sea.", image: "https://via.placeholder.com/300x200", price: 5454 },
    { id: 2, name: "Mugla Resort", city: "Mugla", address: "45 Boat Lane", details: "Quiet nature retreat.", image: "https://via.placeholder.com/300x200", price: 7041 },
    { id: 3, name: "Kappadokien Cave", city: "Kappadokien", address: "78 Stone Way", details: "Historical cave rooms.", image: "https://via.placeholder.com/300x200", price: 7402 },
    { id: 4, name: "Kuzey Kıbrıs Inn", city: "Kıbrıs", address: "10 Harbor Dr", details: "Beautiful Mediterranean views.", image: "https://via.placeholder.com/300x200", price: 7613 }
];

const deals = [
    { title: "Earn 3K Bonus Points", details: "For every 3 nights.", image: "https://via.placeholder.com/300x200" },
    { title: "Up to 50K Points", details: "Stay more, earn more.", image: "https://via.placeholder.com/300x200" },
    { title: "Glamping 2K Bonus", details: "Outdoor luxury stays.", image: "https://via.placeholder.com/300x200" },
    { title: "3K Points Per Night", details: "Register to earn now.", image: "https://via.placeholder.com/300x200" }
];

const popularSearches = [
    { title: "Antalya", details: "8,280 Hotels", image: "https://via.placeholder.com/300x200" },
    { title: "Mugla Province", details: "7,275 Hotels", image: "https://via.placeholder.com/300x200" },
    { title: "Kappadokien", details: "1,386 Hotels", image: "https://via.placeholder.com/300x200" },
    { title: "Kuzey Kıbrıs", details: "592 Hotels", image: "https://via.placeholder.com/300x200" }
];

function handleSearchClick() {
    const searchText = document.getElementById('searchText').value;
    if(!searchText) {
        alert("Search field is required");
        return;
    }
    
    const filtered = hotels.filter(h => 
        h.name.toLowerCase().includes(searchText.toLowerCase()) || 
        h.details.toLowerCase().includes(searchText.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
    
    sessionStorage.setItem('searchResults', JSON.stringify(filtered));
    window.location.href = 'searchResults.html';
}

function selectHotel(id) {
    const selected = hotels.find(h => h.id === id);
    sessionStorage.setItem('selectedHotel', JSON.stringify(selected));
    window.location.href = 'hotelDetails.html';
}