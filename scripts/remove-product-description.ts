// Script to remove description field from all products in the database
// Run this with: npx tsx scripts/remove-product-description.ts

import mongoose from 'mongoose';

// Get MongoDB URI from environment or use default
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hawai-door';

async function removeDescriptionField() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    const productsCollection = db.collection('products');

    // Remove description field from all products
    const result = await productsCollection.updateMany(
      {},
      { $unset: { description: "" } }
    );

    console.log(`Updated ${result.modifiedCount} products`);
    console.log('Description field removed from all products');

    await mongoose.connection.close();
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

removeDescriptionField();










