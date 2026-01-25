const mysql = require('mysql2/promise');

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || '74.208.155.229',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'grudge_game',
  user: process.env.DB_USER || 'grudge_admin',
  password: process.env.DB_PASSWORD || 'Grudge2026!',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to execute queries (mimics Neon's template literal syntax)
async function query(strings, ...values) {
  const connection = await pool.getConnection();
  try {
    // Convert template literal to parameterized query
    let sql = strings[0];
    const params = [];
    
    for (let i = 0; i < values.length; i++) {
      sql += '?' + strings[i + 1];
      params.push(values[i]);
    }
    
    const [rows] = await connection.execute(sql, params);
    return rows;
  } finally {
    connection.release();
  }
}

// Tag function for template literals
function sql(strings, ...values) {
  return query(strings, ...values);
}

module.exports = sql;
