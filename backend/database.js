const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'habit-track-postgres',  // Docker container name
  database: 'habit_track',
  password: '@Aklil19',
  port: 5432,                     // Internal container port, not 5433
});

module.exports = pool;

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure PostgreSQL container is running: sudo docker ps');
    console.log('2. Check if database "habit_track" exists');
    console.log('3. Verify credentials in docker-compose.yml');
  } else {
    console.log('✅ Connected to PostgreSQL successfully!');
    release();
    initDatabase();
  }
});

// Initialize database tables
async function initDatabase() {
  try {
    // Create habits table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS habits (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        user_id VARCHAR(100) NOT NULL,
        goal_type VARCHAR(50) DEFAULT 'daily',
        goal_target INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Habits table ready');

    // Create completions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS completions (
        id SERIAL PRIMARY KEY,
        habit_id INTEGER NOT NULL,
        user_id VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE,
        UNIQUE(habit_id, user_id, date)
      )
    `);
    console.log('✅ Completions table ready');

    // Insert sample habits if none exist
    const result = await pool.query("SELECT COUNT(*) FROM habits WHERE user_id = 'user123'");
    if (parseInt(result.rows[0].count) === 0) {
      const sampleHabits = [
        { name: 'Exercise', goal_type: 'daily', goal_target: 1 },
        { name: 'Read 20 minutes', goal_type: 'daily', goal_target: 1 },
        { name: 'Drink 8 glasses of water', goal_type: 'daily', goal_target: 8 },
        { name: 'Weekly Planning', goal_type: 'weekly', goal_target: 1 }
      ];
      
      for (const habit of sampleHabits) {
        await pool.query(
          "INSERT INTO habits (name, user_id, goal_type, goal_target) VALUES ($1, $2, $3, $4)",
          [habit.name, 'user123', habit.goal_type, habit.goal_target]
        );
      }
      console.log('✅ Sample habits inserted');
    }

  } catch (err) {
    console.error('❌ Database initialization error:', err.message);
  }
}

module.exports = pool;