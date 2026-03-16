import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import Service from "./models/Service.js";
console.log("Seed script started...");

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    const products = [
      {
        name: "Brake Pad",
        description: "High quality brake pad for motorcycles",
        price: 1200,
        category: "Brakes",
        image: "https://images.unsplash.com/photo-1613215264649-7fcd45d5d7ca",
        stock: 20,
      },
      {
        name: "Engine Oil",
        description: "Premium engine oil for motorcycles",
        price: 900,
        category: "Oil",
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
        stock: 50,
      },
      {
        name: "Motorcycle Chain",
        description: "Durable motorcycle drive chain",
        price: 1800,
        category: "Engine",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
        stock: 15,
      },
      {
        name: "Front Tire",
        description: "All-weather front tire for motorcycles",
        price: 3200,
        category: "Body",
        image: "https://images.unsplash.com/photo-1518655048521-f130df041f66",
        stock: 10,
      },
      {
        name: "LED Headlight",
        description: "Bright LED headlight for night riding",
        price: 2100,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1542365887-3d1c8c3b45d8",
        stock: 25,
      },
    ];

    const services = [
      {
        serviceName: "Full Bike Service",
        description: "Complete motorcycle maintenance",
        price: 2500,
        duration: "2 hours",
        image: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77f",
      },
      {
        serviceName: "Engine Repair",
        description: "Engine repair and tuning",
        price: 4500,
        duration: "4 hours",
        image: "https://images.unsplash.com/photo-1609639643509-4c3c6bcd1c7c",
      },
      {
        serviceName: "Oil Change",
        description: "Engine oil replacement",
        price: 800,
        duration: "45 minutes",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3",
      },
      {
        serviceName: "Brake Inspection",
        description: "Complete brake system inspection",
        price: 600,
        duration: "1 hour",
        image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb",
      },
      {
        serviceName: "Tire Replacement",
        description: "Tire replacement and balancing",
        price: 1500,
        duration: "1.5 hours",
        image: "https://images.unsplash.com/photo-1518655048521-f130df041f66",
      },
    ];

    await Product.deleteMany({});
    await Service.deleteMany({});

    await Product.insertMany(products);
    await Service.insertMany(services);

    console.log("Products and Services inserted successfully");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedData();