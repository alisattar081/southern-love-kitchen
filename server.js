const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./notifications.db');

// Initialize table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sent INTEGER DEFAULT 0
  )`);
});

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'secret123';

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/notifications', (req, res) => {
  db.all(
    `SELECT id, title, message, created_at FROM notifications ORDER BY created_at DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.post('/notifications', (req, res) => {
  if (req.headers['x-admin-token'] !== ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message required' });
  }
  const stmt = db.prepare(
    `INSERT INTO notifications (title, message, sent) VALUES (?, ?, 0)`
  );
  stmt.run(title, message, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, message });
  });
});

// Email transport using JSON output (for demonstration)
const transporter = nodemailer.createTransport({ jsonTransport: true });

// Cron job to send unsent notifications every 10 seconds
cron.schedule('*/10 * * * * *', () => {
  db.all(`SELECT id, title, message FROM notifications WHERE sent = 0`, [], (err, rows) => {
    if (err) return console.error(err);
    rows.forEach((row) => {
      const mailOptions = {
        from: 'no-reply@southern-love-kitchen.test',
        to: 'user@example.com',
        subject: row.title,
        text: row.message,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error(error);
        }
        db.run(`UPDATE notifications SET sent = 1 WHERE id = ?`, [row.id]);
        console.log('Notification sent:', info.messageId);
      });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
