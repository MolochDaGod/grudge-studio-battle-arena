const { neon } = require('@neondatabase/serverless');

// Initialize database connection
const sql = neon(process.env.DATABASE_URL);

module.exports = sql;
