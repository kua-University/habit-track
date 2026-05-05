import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:4000/api';

function App() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [goalType, setGoalType] = useState('daily');
  const [message, setMessage] = useState('');

  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const checkConnection = async () => {
    try {
      await axios.get(`${API_URL}/health`);
      setConnected(true);
      return true;
    } catch {
      setConnected(false);
      return false;
    }
  };

  const loadHabits = async () => {
    setLoading(true);
    const ok = await checkConnection();
    if (!ok) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/habits?userId=user123`);
      setHabits(res.data);
    } catch (err) {
      showMessage('Failed to load habits', true);
    }
    setLoading(false);
  };

  const addHabit = async () => {
    if (!newHabit.trim()) return showMessage('Enter a habit name', true);
    try {
      await axios.post(`${API_URL}/habits`, { name: newHabit, userId: 'user123', goal_type: goalType });
      setNewHabit('');
      loadHabits();
      showMessage(`Added ${goalType} habit: ${newHabit}`);
    } catch {
      showMessage('Add failed', true);
    }
  };

  const checkIn = async (id, name) => {
    try {
      const res = await axios.post(`${API_URL}/habits/${id}/check`, { userId: 'user123' });
      showMessage(`✅ ${name} done! ${res.data.message}`);
      loadHabits();
    } catch {
      showMessage('Check-in failed', true);
    }
  };

  const deleteHabit = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await axios.delete(`${API_URL}/habits/${id}?userId=user123`);
      showMessage(`Deleted ${name}`);
      loadHabits();
    } catch {
      showMessage('Delete failed', true);
    }
  };

  const exportData = async () => {
    try {
      const res = await axios.post(`${API_URL}/export`, { userId: 'user123' });
      const blob = new Blob([res.data.csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `habits_${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showMessage('Exported!');
    } catch {
      showMessage('Export failed', true);
    }
  };

  useEffect(() => { loadHabits(); }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>📅 Habit Tracker</h1>
        <div className={`status ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      </div>
      <p className="subtitle">Track your daily goals</p>

      <div className="stats">
        <div className="stat" onClick={exportData}><div className="stat-value">{habits.length}</div><div>Total</div></div>
        <div className="stat"><div className="stat-value">{habits.filter(h => h.completed).length}</div><div>Today</div></div>
        <div className="stat"><div className="stat-value">{Math.max(...habits.map(h => h.streak), 0)}</div><div>Best Streak</div></div>
      </div>

      <div className="habit-list">
        {habits.map(h => (
          <div key={h.id} className="habit-item">
            <div>
              <div className={`habit-name ${h.completed ? 'completed' : ''}`}>{h.name} <span className="badge">{h.goal_type}</span></div>
              <div className="streak">{h.streak > 0 ? `🔥 ${h.streak} day streak` : '✨ Start streak'}</div>
            </div>
            <div>
              <button className="delete-btn" onClick={() => deleteHabit(h.id, h.name)}>🗑️</button>
              <button className="check-btn" onClick={() => checkIn(h.id, h.name)} disabled={h.completed}>{h.completed ? '✓ Done' : 'Check In'}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-habit">
        <input type="text" placeholder="New habit..." value={newHabit} onChange={e => setNewHabit(e.target.value)} onKeyPress={e => e.key === 'Enter' && addHabit()} />
        <select value={goalType} onChange={e => setGoalType(e.target.value)}><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select>
        <button onClick={addHabit}>+ Add</button>
      </div>
      <button className="export-btn" onClick={exportData}>📎 Export CSV</button>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;