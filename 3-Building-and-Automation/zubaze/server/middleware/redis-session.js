/**
 * Redis Session Store for Production
 * Scalable, persistent session management
 */

const session = require('express-session');
const { createClient } = require('redis');
// Fixed import for connect-redis v9+
const RedisStore = require('connect-redis').default;

// Create Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.connect().catch(console.error);

const redisSessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  },
  name: 'zubaze_session'
});

module.exports = redisSessionMiddleware;