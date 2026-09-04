const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgres://postgres:admin123@localhost:5432/nlas_db' 
});

module.exports = pool;