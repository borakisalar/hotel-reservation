/* =====================================================
   data.js  –  All static arrays for the application
   No localStorage / global state. Data is loaded once
   and written to sessionStorage.
===================================================== */

const hotelsData = [
  {
    id: 1,
    name: "Sai Kaew Beach Resort",
    address: "8/1 Moo 4, Koh Samet, Rayong",
    city: "Koh Samet",
    country: "Thailand",
    starRating: 4,
    ratingAverage: 8.2,
    numberOfReviews: 3439,
    ratesFrom: 166,
    ratesCurrency: "USD",
    checkIn: "2:00 PM",
    checkOut: "11:30 AM",
    numberRooms: 160,
    yearOpened: 2000,
    overview: "The 4-star Sai Kaew Beach Resort offers comfort and convenience whether you're on business or holiday in Koh Samet. Free Wi-Fi in all rooms, daily housekeeping, gift/souvenir shop, 24-hour front desk, outdoor pool, spa, and massage.",
    photos: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Free Wi-Fi", "Outdoor Pool", "Spa", "Restaurant", "Fitness Center", "Beach Access"],
    rooms: [
      { type: "Standard", pricePerNight: 166, maxGuests: 2, features: "Queen bed, Garden view, 25 sqm" },
      { type: "Deluxe", pricePerNight: 230, maxGuests: 3, features: "King bed, Sea view, 35 sqm, Balcony" },
      { type: "Suite", pricePerNight: 380, maxGuests: 4, features: "King bed + Sofa, Sea view, 65 sqm, Jacuzzi" }
    ]
  },
  {
    id: 2,
    name: "Marine Hotel Dublin",
    address: "Sutton Cross, Dublin D13",
    city: "Dublin",
    country: "Ireland",
    starRating: 3,
    ratingAverage: 7.4,
    numberOfReviews: 12,
    ratesFrom: 144,
    ratesCurrency: "USD",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    numberRooms: 50,
    yearOpened: 1995,
    overview: "Marine Hotel is perfectly located for both business and leisure guests in Dublin. The hotel offers free Wi-Fi, 24-hour front desk, luggage storage, indoor pool, golf course access within 3 km, and a beautiful garden.",
    photos: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1592921870789-04563d55041c?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Free Wi-Fi", "Indoor Pool", "Golf Access", "Garden", "Bar", "Parking"],
    rooms: [
      { type: "Standard", pricePerNight: 144, maxGuests: 2, features: "Double bed, City view, 22 sqm" },
      { type: "Superior", pricePerNight: 190, maxGuests: 2, features: "King bed, Sea view, 30 sqm" },
      { type: "Family Room", pricePerNight: 260, maxGuests: 4, features: "2 Queen beds, Garden view, 45 sqm" }
    ]
  },
  {
    id: 3,
    name: "Motif Seattle",
    address: "1415 5th Ave, Seattle, WA 98101",
    city: "Seattle",
    country: "USA",
    starRating: 4,
    ratingAverage: 8.5,
    numberOfReviews: 2105,
    ratesFrom: 259,
    ratesCurrency: "USD",
    checkIn: "4:00 PM",
    checkOut: "11:00 AM",
    numberRooms: 319,
    yearOpened: 2010,
    overview: "Centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel features stunning city views, a chic restaurant and bar, fitness center, and easy access to Seattle's most vibrant attractions.",
    photos: [
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Free Wi-Fi", "Restaurant", "Bar", "Fitness Center", "Business Center", "Valet Parking"],
    rooms: [
      { type: "City View", pricePerNight: 259, maxGuests: 2, features: "King bed, City view, 32 sqm" },
      { type: "Deluxe King", pricePerNight: 320, maxGuests: 2, features: "King bed, Corner city view, 40 sqm" },
      { type: "Suite", pricePerNight: 520, maxGuests: 4, features: "King bed + Sofa, Panoramic view, 75 sqm" }
    ]
  },
  {
    id: 4,
    name: "The Westin Seattle",
    address: "1900 5th Ave, Seattle, WA 98101",
    city: "Seattle",
    country: "USA",
    starRating: 4,
    ratingAverage: 8.7,
    numberOfReviews: 3820,
    ratesFrom: 209,
    ratesCurrency: "USD",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    numberRooms: 891,
    yearOpened: 1981,
    overview: "Steps from Westlake Center and Pacific Place, The Westin Seattle offers legendary Heavenly Beds, world-class dining, an indoor pool, and a full-service spa — an urban sanctuary in the heart of downtown Seattle.",
    photos: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Heavenly Beds", "Spa", "Indoor Pool", "Restaurant", "Bar", "Concierge"],
    rooms: [
      { type: "Standard", pricePerNight: 209, maxGuests: 2, features: "Queen bed, City view, 28 sqm" },
      { type: "Deluxe", pricePerNight: 275, maxGuests: 2, features: "King bed, Mountain/City view, 38 sqm" },
      { type: "Heavenly Suite", pricePerNight: 480, maxGuests: 3, features: "King + Sofa, Panoramic 72nd floor, 80 sqm" }
    ]
  },
  {
    id: 5,
    name: "Antalya Beach Palace",
    address: "123 Beach Road, Lara, Antalya",
    city: "Antalya",
    country: "Turkey",
    starRating: 5,
    ratingAverage: 9.1,
    numberOfReviews: 5621,
    ratesFrom: 180,
    ratesCurrency: "USD",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    numberRooms: 420,
    yearOpened: 2008,
    overview: "A world-class all-inclusive resort on Lara Beach, Antalya. Enjoy 8 restaurants, 6 pools, a private beach, full spa and wellness center, kids club, water slides, and nightly entertainment — a true Mediterranean paradise.",
    photos: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1612965607446-25e1332775ae?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["All-Inclusive", "Private Beach", "6 Pools", "8 Restaurants", "Full Spa", "Kids Club"],
    rooms: [
      { type: "Standard", pricePerNight: 180, maxGuests: 2, features: "King bed, Pool view, 32 sqm" },
      { type: "Sea View", pricePerNight: 260, maxGuests: 2, features: "King bed, Sea view, 36 sqm, Balcony" },
      { type: "Family Suite", pricePerNight: 420, maxGuests: 5, features: "2 Bedrooms, Sea view, 90 sqm, Private Pool" }
    ]
  },
  {
    id: 6,
    name: "Grand Istanbul Bosphorus",
    address: "Çırağan Cad. No:32, Beşiktaş, Istanbul",
    city: "Istanbul",
    country: "Turkey",
    starRating: 5,
    ratingAverage: 9.3,
    numberOfReviews: 7140,
    ratesFrom: 350,
    ratesCurrency: "USD",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    numberRooms: 315,
    yearOpened: 1992,
    overview: "Nestled on the shores of the Bosphorus in a restored Ottoman palace, Grand Istanbul Bosphorus offers an unparalleled blend of history and luxury. Enjoy Bosphorus-view rooms, fine dining, world-class spa, and a unique outdoor pool overlooking the strait.",
    photos: [
      "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Bosphorus View", "Outdoor Pool", "Full Spa", "Fine Dining", "Historic Palace", "Butler Service"],
    rooms: [
      { type: "Bosphorus View", pricePerNight: 350, maxGuests: 2, features: "King bed, Full Bosphorus view, 45 sqm" },
      { type: "Palace Room", pricePerNight: 520, maxGuests: 2, features: "King bed, Ottoman décor, 55 sqm, Balcony" },
      { type: "Royal Suite", pricePerNight: 1200, maxGuests: 4, features: "2 Bedrooms, Panoramic Bosphorus, 150 sqm" }
    ]
  },
  {
    id: 7,
    name: "Cappadocia Cave Suites",
    address: "Göreme Village Centre, Nevşehir",
    city: "Cappadocia",
    country: "Turkey",
    starRating: 4,
    ratingAverage: 9.0,
    numberOfReviews: 2987,
    ratesFrom: 220,
    ratesCurrency: "USD",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    numberRooms: 30,
    yearOpened: 2005,
    overview: "Experience the magic of Cappadocia in hand-carved cave suites with fairy chimney views. Hot air balloon rides from the terrace, a rooftop pool, and authentic Turkish cuisine make this a once-in-a-lifetime stay.",
    photos: [
      "https://images.unsplash.com/photo-1569949516362-f4c4b33d62a0?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Cave Suites", "Rooftop Pool", "Balloon Views", "Turkish Cuisine", "Free Breakfast", "Guided Tours"],
    rooms: [
      { type: "Cave Standard", pricePerNight: 220, maxGuests: 2, features: "Rock-carved, Valley view, 28 sqm" },
      { type: "Cave Deluxe", pricePerNight: 320, maxGuests: 2, features: "Rock-carved, Fairy chimney view, 40 sqm, Jacuzzi" },
      { type: "Bridal Cave Suite", pricePerNight: 520, maxGuests: 2, features: "Private terrace, Panoramic, 60 sqm, Hot tub" }
    ]
  },
  {
    id: 8,
    name: "Barcelona Sea View Hotel",
    address: "Passeig de Gràcia 64, Barcelona",
    city: "Barcelona",
    country: "Spain",
    starRating: 5,
    ratingAverage: 8.9,
    numberOfReviews: 4432,
    ratesFrom: 295,
    ratesCurrency: "USD",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    numberRooms: 180,
    yearOpened: 2015,
    overview: "Located on Passeig de Gràcia, steps from Gaudí's masterpieces and the golden beaches of Barcelona. Enjoy rooftop infinity pool, Michelin-starred dining, and elegantly designed rooms that blend Catalan tradition with modern luxury.",
    photos: [
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1548873151-93e9855d42c1?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1536183922588-166604504d5e?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Rooftop Pool", "Michelin Dining", "Spa", "Concierge", "Airport Shuttle", "Valet Parking"],
    rooms: [
      { type: "City Room", pricePerNight: 295, maxGuests: 2, features: "Queen bed, City view, 30 sqm" },
      { type: "Deluxe Sea", pricePerNight: 420, maxGuests: 2, features: "King bed, Mediterranean view, 40 sqm" },
      { type: "Penthouse Suite", pricePerNight: 850, maxGuests: 3, features: "King bed, Private rooftop, 120 sqm" }
    ]
  },
  {
    id: 9,
    name: "Maldives Overwater Resort",
    address: "North Malé Atoll, Maldives",
    city: "Maldives",
    country: "Maldives",
    starRating: 5,
    ratingAverage: 9.6,
    numberOfReviews: 8920,
    ratesFrom: 890,
    ratesCurrency: "USD",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    numberRooms: 75,
    yearOpened: 2014,
    overview: "Perched above the crystal-clear waters of the Indian Ocean, this iconic overwater villa resort offers complete privacy, a private plunge pool, direct lagoon access, world-class diving, and the finest Maldivian and international cuisine.",
    photos: [
      "https://images.unsplash.com/photo-1540202404-d0c7fe46a087?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Overwater Villa", "Private Pool", "Lagoon Access", "Diving Center", "Spa", "Butler Service"],
    rooms: [
      { type: "Lagoon Villa", pricePerNight: 890, maxGuests: 2, features: "Overwater, Lagoon view, 90 sqm, Plunge Pool" },
      { type: "Ocean Villa", pricePerNight: 1150, maxGuests: 2, features: "Overwater, Ocean view, 110 sqm, Infinity Pool" },
      { type: "Two-Bedroom Villa", pricePerNight: 2200, maxGuests: 4, features: "2 Bedrooms, Private beach, 200 sqm" }
    ]
  },
  {
    id: 10,
    name: "Paris Elegance Boutique",
    address: "15 Rue du Faubourg, 8th Arr., Paris",
    city: "Paris",
    country: "France",
    starRating: 5,
    ratingAverage: 9.2,
    numberOfReviews: 6210,
    ratesFrom: 420,
    ratesCurrency: "USD",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    numberRooms: 55,
    yearOpened: 2003,
    overview: "An intimate Haussmann-style palace hotel steps from the Champs-Élysées and Eiffel Tower. Featuring Hermès toiletries, hand-tailored French linens, a champagne bar, rooftop garden, and personalized butler service for a quintessentially Parisian experience.",
    photos: [
      "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1559508551-44bff1de756b?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1561997835-be539cb24e53?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Eiffel Views", "Champagne Bar", "Rooftop Garden", "Butler Service", "Hermès Amenities", "Fine Dining"],
    rooms: [
      { type: "Classic", pricePerNight: 420, maxGuests: 2, features: "Queen bed, Courtyard view, 28 sqm" },
      { type: "Eiffel View", pricePerNight: 680, maxGuests: 2, features: "King bed, Eiffel Tower view, 38 sqm" },
      { type: "Grand Suite Paris", pricePerNight: 1400, maxGuests: 3, features: "King, Panoramic Eiffel, 100 sqm, Private terrace" }
    ]
  },
  {
    id: 11,
    name: "Bodrum Aegean Resort",
    address: "Yali Mevkii, Gümüşlük, Bodrum",
    city: "Bodrum",
    country: "Turkey",
    starRating: 5,
    ratingAverage: 8.8,
    numberOfReviews: 3310,
    ratesFrom: 240,
    ratesCurrency: "USD",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    numberRooms: 95,
    yearOpened: 2011,
    overview: "Perched above the shimmering Aegean Sea with panoramic views of Gümüşlük Cove. White-washed architecture, infinity pool, sunset yacht tours, award-winning seafood restaurant, and traditional Turkish hammam complete this Aegean dream.",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Aegean View", "Infinity Pool", "Hammam", "Yacht Tours", "Seafood Restaurant", "Private Beach"],
    rooms: [
      { type: "Sea View Room", pricePerNight: 240, maxGuests: 2, features: "King bed, Aegean view, 35 sqm, Balcony" },
      { type: "Terrace Suite", pricePerNight: 380, maxGuests: 3, features: "King + Sofa, Private terrace, 55 sqm" },
      { type: "Signature Villa", pricePerNight: 650, maxGuests: 4, features: "2 Bedrooms, Private pool, 120 sqm" }
    ]
  },
  {
    id: 12,
    name: "Tokyo Skyline Tower",
    address: "2-1-1 Shibuya, Shibuya-ku, Tokyo",
    city: "Tokyo",
    country: "Japan",
    starRating: 5,
    ratingAverage: 9.0,
    numberOfReviews: 9154,
    ratesFrom: 310,
    ratesCurrency: "USD",
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    numberRooms: 420,
    yearOpened: 2019,
    overview: "Rising above the iconic Shibuya crossing, Tokyo Skyline Tower offers minimalist luxury with floor-to-ceiling city views, omakase dining by a Michelin-starred chef, an onsen-inspired spa, and cutting-edge smart room technology.",
    photos: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=75"
    ],
    amenities: ["Onsen Spa", "Omakase Dining", "Rooftop Bar", "Smart Rooms", "Airport Limo", "Concierge"],
    rooms: [
      { type: "City View", pricePerNight: 310, maxGuests: 2, features: "King bed, Shibuya view, 32 sqm" },
      { type: "Skyline Deluxe", pricePerNight: 450, maxGuests: 2, features: "King bed, Panoramic Tokyo, 45 sqm" },
      { type: "Penthouse", pricePerNight: 1100, maxGuests: 3, features: "King + Lounge, 360° views, 130 sqm" }
    ]
  }
];

const dealsData = [
  {
    id: 1,
    title: "Summer Escape — 30% Off Beachfront",
    details: "Book your summer getaway today and save 30% on all beachfront properties. Valid for stays June–August 2026. Minimum 3-night stay required.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=70",
    badge: "30% OFF",
    tag: "Summer Deal"
  },
  {
    id: 2,
    title: "Early Bird Discount — 20% Off Any Hotel",
    details: "Book at least 60 days in advance and enjoy a flat 20% off your reservation across all participating hotels worldwide.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=70",
    badge: "20% OFF",
    tag: "Early Bird"
  },
  {
    id: 3,
    title: "Weekend Flash Sale — Up to 40% Savings",
    details: "Limited-time weekend offers available every Friday. Up to 40% off luxury hotels in top destinations. No promo code needed — discount applied automatically.",
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=600&q=70",
    badge: "40% OFF",
    tag: "Flash Sale"
  },
  {
    id: 4,
    title: "Honeymooners Special — Complimentary Extras",
    details: "Celebrating your wedding? Enjoy a complimentary welcome breakfast, room upgrade, and late checkout on select suites and villas.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=70",
    badge: "FREE EXTRAS",
    tag: "Honeymoon"
  },
  {
    id: 5,
    title: "Long Stay Reward — 7 Nights Pay for 6",
    details: "Stay 7 nights and pay for only 6 at hundreds of hotels worldwide. Perfect for extended holidays, bleisure trips, or remote work stays.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=70",
    badge: "1 NIGHT FREE",
    tag: "Long Stay"
  }
];

const popularSearches = [
  {
    id: 1,
    title: "Antalya, Turkey",
    searchQuery: "Antalya",
    hotels: 48,
    avgPrice: 190,
    minPrice: 110,
    maxPrice: 650,
    image: "https://images.unsplash.com/photo-1612965607446-25e1332775ae?auto=format&fit=crop&w=600&q=70",
    tag: "Beach & Sun"
  },
  {
    id: 2,
    title: "Istanbul, Turkey",
    searchQuery: "Istanbul",
    hotels: 320,
    avgPrice: 310,
    minPrice: 80,
    maxPrice: 1200,
    image: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=600&q=70",
    tag: "City & Culture"
  },
  {
    id: 3,
    title: "Maldives",
    searchQuery: "Maldives",
    hotels: 62,
    avgPrice: 1050,
    minPrice: 450,
    maxPrice: 3500,
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=70",
    tag: "Luxury"
  },
  {
    id: 4,
    title: "Barcelona, Spain",
    searchQuery: "Barcelona",
    hotels: 185,
    avgPrice: 280,
    minPrice: 95,
    maxPrice: 950,
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=600&q=70",
    tag: "Architecture"
  },
  {
    id: 5,
    title: "Cappadocia, Turkey",
    searchQuery: "Cappadocia",
    hotels: 34,
    avgPrice: 260,
    minPrice: 120,
    maxPrice: 680,
    image: "https://images.unsplash.com/photo-1569949516362-f4c4b33d62a0?auto=format&fit=crop&w=600&q=70",
    tag: "Unique Stay"
  },
  {
    id: 6,
    title: "Tokyo, Japan",
    searchQuery: "Tokyo",
    hotels: 420,
    avgPrice: 380,
    minPrice: 100,
    maxPrice: 1500,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=70",
    tag: "Urban Experience"
  },
  {
    id: 7,
    title: "Paris, France",
    searchQuery: "Paris",
    hotels: 510,
    avgPrice: 420,
    minPrice: 120,
    maxPrice: 2000,
    image: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=600&q=70",
    tag: "Romantic"
  },
  {
    id: 8,
    title: "Bodrum, Turkey",
    searchQuery: "Bodrum",
    hotels: 76,
    avgPrice: 220,
    minPrice: 90,
    maxPrice: 780,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70",
    tag: "Aegean Bliss"
  }
];
