/**
 * Production Session Management
 * Uses HTTP-only cookies + in-memory store (Railway)
 */

const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const sessionMiddleware = session({
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  },
  name: 'zubaze_session'
});

module.exports = sessionMiddleware;