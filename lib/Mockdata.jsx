// categories.js (or combined in products.js)
export const categories = [
  { id: "all", name: "All Products" },
  { id: "tech", name: "Tech & Study" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "dorm", name: "Dorm Essentials" },
  { id: "fashion", name: "Fashion" },
];

// products.js
export const products = [
  {
    id: "1",
    name: "Wireless Earbuds",
    price: 39.99,
    originalPrice: 49.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"
    ],
    description:
      "Perfect for lectures and library sessions. Crystal clear audio with 6-hour battery life.",
    inStock: true,
    tags: ["bestseller", "sale"],
    variations: ["Black", "White"],
    maxStock: 10,
    isFlashSale:true
  },
  {
    id: "2",
    name: "Laptop Stand",
    price: 34.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80"
    ],
    description:
      "Ergonomic laptop stand for better posture during those long study sessions.",
    inStock: true,
    tags: ["bestseller"],
    variations: ["Aluminum", "Black"],
    maxStock: 10,
    isFlashSale:true
    
  },
  {
    id: "3",
    name: "Campus Backpack",
    price: 59.99,
    category: "lifestyle",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
    ],
    description:
      "Spacious backpack with laptop compartment. Perfect for carrying books and tech.",
    inStock: true,
    tags: ["new"],
    variations: ["Black", "Blue", "Gray"],
    maxStock: 15,
    isFlashSale:true

  },
  {
    id: "4",
    name: "Blue Light Glasses",
    price: 29.99,
    category: "lifestyle",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&q=80"
    ],
    description:
      "Reduce eye strain from late-night study sessions and screen time.",
    inStock: true,
    tags: ["bestseller"],
    variations: ["Black", "Clear"],
    maxStock: 20
  },
  {
    id: "5",
    name: "Desk Organizer",
    price: 19.99,
    originalPrice: 24.99,
    category: "dorm",
    image: "https://images.unsplash.com/photo-1587222656590-6a810a3d1f00?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1587222656590-6a810a3d1f00?w=500&q=80"
    ],
    description: "Keep your dorm desk tidy with this minimalist organizer.",
    inStock: true,
    tags: ["sale"],
    variations: ["Wood", "White"],
    maxStock: 12
  },
  {
    id: "6",
    name: "LED Desk Lamp",
    price: 39.99,
    category: "dorm",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80"
    ],
    description:
      "Adjustable brightness for late-night cramming without disturbing your roommate.",
    inStock: true,
    tags: [],
    variations: ["Black", "White", "Silver"],
    maxStock: 15
  },
  {
    id: "7",
    name: "Reusable Water Bottle",
    price: 22.99,
    category: "lifestyle",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80"
    ],
    description:
      "Stay hydrated between classes. Keeps drinks cold for 24 hours.",
    inStock: true,
    tags: ["bestseller"],
    variations: ["Blue", "Green", "Red"],
    maxStock: 25
  },

  {
    id: "8",
    name: "Portable Charger",
    price: 44.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80",
    description:
      "20,000mAh power bank. Never run out of battery during campus life.",
    inStock: true,
    tags: ["new"],
  },
  {
    id: "9",
    name: "Canvas Tote Bag",
    price: 14.99,
    originalPrice: 18.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80",
    description:
      "Eco-friendly tote for groceries, gym clothes, or quick campus trips.",
    inStock: true,
    tags: ["sale"],
  },
  {
    id: "10",
    name: "Hoodie",
    price: 45.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    description:
      "Comfortable oversized hoodie for cold lecture halls and cozy study nights.",
    inStock: false,
  },
  {
    id: "11",
    name: "Meal Prep Containers",
    price: 27.99,
    category: "dorm",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&q=80",
    description:
      "Save money on food. Microwave and dishwasher safe. Set of 5 containers.",
    inStock: true,
    tags: ["new"],
  },
  {
    id: "12",
    name: "Wireless Mouse",
    price: 19.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    description:
      "Quiet clicking for library use. Ergonomic design for long study sessions.",
    inStock: true,
    tags: ["bestseller"],
  },
  {
    id: "13",
    name: "Plant Pot Set",
    price: 16.99,
    category: "dorm",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80",
    description:
      "Bring life to your dorm room. Set of 3 small ceramic pots.",
    inStock: true,
  },
  {
    id: "14",
    name: "Study Planner",
    price: 14.99,
    category: "lifestyle",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&q=80",
    description:
      "Track assignments, exams, and deadlines. Undated for maximum flexibility.",
    inStock: true,
    tags: ["new"],
  },
  {
    id: "15",
    name: "Bluetooth Speaker",
    price: 29.99,
    originalPrice: 35.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    description:
      "Compact speaker for dorm parties or background music while studying.",
    inStock: true,
    tags: ["sale"],
  },
  {
    id: "16",
    name: "Sneakers",
    price: 79.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
    description:
      "Comfortable walking shoes for getting around campus all day.",
    inStock: true,
  },
];
