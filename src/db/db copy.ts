/** @format */
import mysql from 'mysql2/promise';

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'prismic',
  port: 3306, // Port default MySQL
};

export const db = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    throw error;
  }
};
