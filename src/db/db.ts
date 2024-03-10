/** @format */

import { Db, MongoClient } from 'mongodb';

let db: Db;

export async function connectDB(): Promise<Db> {
  const url: string = 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('prismic'); // Ganti 'nama_database' dengan nama database Anda
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export function getDB(): Db {
  if (!db) {
    throw new Error('Database is not connected');
  }
  return db;
}
