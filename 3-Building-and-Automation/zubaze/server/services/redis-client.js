/**
 * Shared Redis Client for Data Storage
 * Used for dashboard content, caching, etc.
 */

const { createClient } = require('redis');

// Create and connect Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));
redisClient.on('connect', () => console.log('✅ Redis Client Connected'));

// Connect immediately
redisClient.connect().catch(console.error);

module.exports = redisClient;
