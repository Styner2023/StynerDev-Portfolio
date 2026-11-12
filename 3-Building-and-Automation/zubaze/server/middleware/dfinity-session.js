/**
 * DFINITY Canister Session Store
 * Store sessions directly in your ICP canister
 */

const session = require('express-session');
const { Actor, HttpAgent } = require('@dfinity/agent');

class DfinityStore extends session.Store {
  constructor(options = {}) {
    super(options);
    this.canisterId = options.canisterId || process.env.CANISTER_ID;
    this.agent = new HttpAgent({ 
      host: options.host || process.env.IC_HOST || 'https://icp-api.io' 
    });
  }

  async get(sid, callback) {
    try {
      // Call canister method to get session
      const result = await this.actor.getSession(sid);
      callback(null, result ? JSON.parse(result) : null);
    } catch (error) {
      callback(error);
    }
  }

  async set(sid, session, callback) {
    try {
      // Call canister method to store session
      await this.actor.setSession(sid, JSON.stringify(session));
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  async destroy(sid, callback) {
    try {
      // Call canister method to delete session
      await this.actor.deleteSession(sid);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}

const dfinitySessionMiddleware = session({
  store: new DfinityStore({
    canisterId: process.env.CANISTER_ID,
    host: process.env.IC_HOST
  }),
  secret: process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  },
  name: 'zubaze_session'
});

module.exports = dfinitySessionMiddleware;