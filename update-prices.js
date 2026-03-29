// Run: node update-prices.js
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function updatePrices() {
  const snapshot = await db.collection('products').get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, { price: 79 });
  });

  await batch.commit();
  console.log(`✅ Updated ${snapshot.size} products to 79 TND`);
  process.exit(0);
}

updatePrices().catch((err) => { console.error(err); process.exit(1); });
