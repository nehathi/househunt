require("dotenv").config();
const mongoose = require("mongoose");
const Property = require("./models/Property");

const cities = [
  "Guntur, AP", "Hyderabad, TG", "Vijayawada, AP", "Bengaluru, KA",
  "Chennai, TN", "Pune, MH", "Mumbai, MH", "Delhi, DL", "Kolkata, WB",
  "Visakhapatnam, AP", "Kochi, KL", "Coimbatore, TN", "Nagpur, MH",
  "Ahmedabad, GJ", "Jaipur, RJ", "Lucknow, UP", "Indore, MP", "Bhopal, MP",
  "Chandigarh, CH", "Surat, GJ",
];

const areas = [
  "Lakshmipuram", "Brodipet", "Gandhi Nagar", "Whitefield", "Koramangala",
  "Indiranagar", "Anna Nagar", "T Nagar", "Baner", "Kothrud", "Andheri West",
  "Bandra East", "Rohini", "Dwarka", "Salt Lake", "Madhapur", "Gachibowli",
  "Kondapur", "MG Road", "Jubilee Hills", "Banjara Hills", "Velachery",
  "Kharadi", "Viman Nagar", "Powai", "Malad", "Vasant Kunj", "Saket",
];

const types = ["Apartment", "Independent House", "Villa", "Studio", "Penthouse", "Gated Community Flat"];

const amenitiesPool = [
  "Parking", "Lift", "Power Backup", "Security", "Gym", "Swimming Pool",
  "Park", "Club House", "24x7 Water", "Modular Kitchen", "Balcony", "Pet Friendly",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMany(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const properties = [];

for (let i = 1; i <= 90; i++) {
  const city = pick(cities);
  const area = pick(areas);
  const type = pick(types);
  const bedrooms = randInt(1, 5);
  const bathrooms = Math.max(1, bedrooms - randInt(0, 1));
  const basePrice = 6000 + bedrooms * 4000 + randInt(0, 15000);
  const seedImg = 100 + i;

  properties.push({
    title: `${bedrooms} BHK ${type} in ${area}`,
    description: `Spacious ${bedrooms} BHK ${type.toLowerCase()} located in the heart of ${area}, ${city}. Comes with ${pickMany(amenitiesPool, 4).join(
      ", "
    )}. Well ventilated, close to schools, hospitals, and markets. Ideal for families and working professionals looking for a comfortable stay.`,
    location: `${area}, ${city}`,
    price: basePrice,
    bedrooms,
    bathrooms,
    image: `https://picsum.photos/seed/houserent${seedImg}/600/400`,
  });
}

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");

    await Property.deleteMany({});
    console.log("Old properties cleared.");

    await Property.insertMany(properties);
    console.log(`${properties.length} demo properties inserted successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
