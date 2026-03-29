const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const products = [
  {
    id: "1",
    name: "VORTEX Origin Rashguard",
    price: 55.0,
    category: "Men",
    image: "/images/products/vortex-tshirt-1.png",
    description: "Premium compression fit with a bold bio-mechanical chest graphic. Engineered for high performance and dark athletic aesthetics."
  },
  {
    id: "2",
    name: "VORTEX Tribal Shoulder Compression",
    price: 60.0,
    category: "Men",
    image: "/images/products/vortex-tshirt-2.png",
    description: "Advanced moisture-wicking compression shirt featuring tribal thorn graphics on the shoulders. Built for extreme mobility."
  },
  {
    id: "3",
    name: "VORTEX Nocturne Base Layer",
    price: 60.0,
    category: "Men",
    image: "/images/products/vortex-tshirt-3.png",
    description: "Sleek and stealthy. The Nocturne base layer offers optimal muscle support and distinctive shoulder armor detailing."
  },
  {
    id: "4",
    name: "VORTEX Spine Graphic Compression",
    price: 65.0,
    category: "Men",
    image: "/images/products/vortex-tshirt-4.png",
    description: "A commanding design with an intricate tribal spine graphic running down the back. Maximum durability for intense training sessions."
  },
  {
    id: "5",
    name: "VORTEX Shadow Strike Rashguard",
    price: 60.0,
    category: "Men",
    image: "/images/products/vortex-tshirt-5.png",
    description: "Built for combat and conditioning, perfectly balancing stretch, support, and a striking tribal shoulder motif."
  }
];

async function migrateData() {
  console.log("Starting migration process...");
  let successCount = 0;
  
  for (const product of products) {
    try {
      const docRef = db.collection("products").doc(product.id);
      
      const { id, ...productData } = product; // Remove ID to prevent duplication within the doc
      await docRef.set(productData);
      
      console.log(`✅ Uploaded ${product.name}`);
      successCount++;
    } catch (e) {
      console.error(`❌ Failed to upload ${product.name}:`, e);
    }
  }
  
  console.log(`Migration Complete! Successfully uploaded ${successCount} products.`);
}

migrateData();
