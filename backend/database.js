const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'habit_track',
  password: '@Aklil19',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ PostgreSQL connected');
    release();
    initDb();
  }
});

async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS habits (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        user_id TEXT NOT NULL,
        goal_type TEXT DEFAULT 'daily',
        goal_target INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS completions (
        id SERIAL PRIMARY KEY,
        habit_id INT REFERENCES habits(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(habit_id, user_id, date)
      )
    `);
    const res = await pool.query("SELECT * FROM habits WHERE user_id = 'user123'");
    if (res.rows.length === 0) {
      await pool.query("INSERT INTO habits (name, user_id) VALUES ('Exercise', 'user123')");
      await pool.query("INSERT INTO habits (name, user_id) VALUES ('Read a book', 'user123')");
      await pool.query("INSERT INTO habits (name, user_id) VALUES ('Drink water', 'user123')");
      console.log('✅ Sample habits added');
    }
    console.log('✅ Database ready');
  } catch (err) {
    console.error('Init error:', err.message);
  }
}

module.exports = pool;