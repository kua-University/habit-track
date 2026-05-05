const express = require('express');
const cors = require('cors');
const pool = require('./database');

const app = express();
const PORT = 4000; // Fixed port for backend

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/habits', async (req, res) => {
  const userId = req.query.userId || 'user123';
  const today = new Date().toISOString().slice(0, 10);
  try {
    const habits = await pool.query("SELECT * FROM habits WHERE user_id = $1", [userId]);
    const completed = await pool.query("SELECT habit_id FROM completions WHERE user_id = $1 AND date = $2", [userId, today]);
    const completedSet = new Set(completed.rows.map(r => r.habit_id));
    const streakMap = new Map();
    for (let h of habits.rows) {
      const streakRes = await pool.query("SELECT date FROM completions WHERE habit_id = $1 AND user_id = $2 ORDER BY date DESC", [h.id, userId]);
      let streak = 0;
      let expected = new Date(today);
      for (let row of streakRes.rows) {
        if (row.date === expected.toISOString().slice(0, 10)) {
          streak++;
          expected.setDate(expected.getDate() - 1);
        } else break;
      }
      streakMap.set(h.id, streak);
    }
    const result = habits.rows.map(h => ({
      id: h.id,
      name: h.name,
      completed: completedSet.has(h.id),
      streak: streakMap.get(h.id) || 0,
      goal_type: h.goal_type,
      goal_target: h.goal_target,
      progress: completedSet.has(h.id) ? h.goal_target : 0,
      progress_percent: completedSet.has(h.id) ? 100 : 0
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/habits', async (req, res) => {
  const { name, userId, goal_type, goal_target } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  try {
    const result = await pool.query(
      "INSERT INTO habits (name, user_id, goal_type, goal_target) VALUES ($1, $2, $3, $4) RETURNING id",
      [name, userId || 'user123', goal_type || 'daily', goal_target || 1]
    );
    res.json({ success: true, habit: { id: result.rows[0].id, name, completed: false, streak: 0, goal_type, goal_target, progress: 0, progress_percent: 0 } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/habits/:id/check', async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId || 'user123';
  const today = new Date().toISOString().slice(0, 10);
  try {
    const exists = await pool.query("SELECT * FROM completions WHERE habit_id = $1 AND user_id = $2 AND date = $3", [id, userId, today]);
    if (exists.rows.length) return res.status(400).json({ error: 'Already checked' });
    await pool.query("INSERT INTO completions (habit_id, user_id, date) VALUES ($1, $2, $3)", [id, userId, today]);
    const streakRes = await pool.query("SELECT date FROM completions WHERE habit_id = $1 AND user_id = $2 ORDER BY date DESC", [id, userId]);
    let streak = 0;
    let expected = new Date(today);
    for (let row of streakRes.rows) {
      if (row.date === expected.toISOString().slice(0, 10)) {
        streak++;
        expected.setDate(expected.getDate() - 1);
      } else break;
    }
    res.json({ success: true, message: `Great job! ${streak} day streak!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/habits/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.query.userId || 'user123';
  try {
    await pool.query("DELETE FROM completions WHERE habit_id = $1 AND user_id = $2", [id, userId]);
    await pool.query("DELETE FROM habits WHERE id = $1 AND user_id = $2", [id, userId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/export', async (req, res) => {
  const userId = req.body.userId || 'user123';
  try {
    const habits = await pool.query("SELECT * FROM habits WHERE user_id = $1", [userId]);
    const completions = await pool.query("SELECT * FROM completions WHERE user_id = $1 ORDER BY date DESC", [userId]);
    let csv = "ID,Name,Goal Type,Goal Target\n";
    habits.rows.forEach(h => { csv += `${h.id},${h.name},${h.goal_type},${h.goal_target}\n`; });
    csv += "\nID,Habit ID,Date\n";
    completions.rows.forEach(c => { csv += `${c.id},${c.habit_id},${c.date}\n`; });
    res.json({ csv });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));