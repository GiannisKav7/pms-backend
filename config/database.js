const { Pool } = require('pg');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

let poolConfig;
if (process.env.DATABASE_URL) {
  // use single connection string (Railway & Azure)
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: isProd
      ? { rejectUnauthorized: false }
      : { rejectUnauthorized: false } // Azure still needs SSL locally
  };
} else {
  // fallback to individual vars for local dev
  poolConfig = {
    host:     process.env.DB_HOST,
    port:     +process.env.DB_PORT,
    database: process.env.DB_NAME,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl:      { rejectUnauthorized: false } 
  };
}

const pool = new Pool(poolConfig);
module.exports = pool;