/**
 * Custom email + password authentication.
 * Issues our own HS256 JWTs (AUTH_JWT_SECRET). Credentials live in SQLite
 * (server/services/authDb.js). The canister User is created by authId so the
 * existing data flow (getUserByAuthId) keeps working unchanged.
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');

const { createAuthUser, getAuthUserByEmail, getAuthUserById } = require('../services/authDb');
const { verifyJwt } = require('../middleware/auth');
const dfinity = require('../services/dfinityIntegration');

const JWT_EXPIRY = '7d';
const USER_TYPE_CLAIM = 'https://zubaze.com/user_type';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many attempts. Please try again in a few minutes.' },
});

function signToken(authUser) {
  return jwt.sign(
    {
      sub: authUser.id,
      email: authUser.email,
      name: authUser.name,
      [USER_TYPE_CLAIM]: authUser.user_type,
    },
    process.env.AUTH_JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

// Never expose the password hash to clients.
function publicUser(u) {
  return { id: u.id, email: u.email, name: u.name, userType: u.user_type };
}

/**
 * POST /api/auth/signup
 */
router.post('/signup', authLimiter, async (req, res) => {
  try {
    let { email, password, name, userType } = req.body || {};
    email = String(email || '').trim().toLowerCase();
    name = String(name || '').trim();
    userType = userType === 'client' ? 'client' : 'developer';

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }
    if (!password || String(password).length < MIN_PASSWORD) {
      return res.status(400).json({ ok: false, error: `Password must be at least ${MIN_PASSWORD} characters.` });
    }
    if (getAuthUserByEmail(email)) {
      return res.status(409).json({ ok: false, error: 'An account with that email already exists.' });
    }

    const id = uuidv4();
    const passwordHash = await bcrypt.hash(String(password), 12);
    const displayName = name || email.split('@')[0];
    const authUser = createAuthUser({ id, email, passwordHash, userType, name: displayName });

    // Best-effort: create the canister User now. If the canister is slow/down,
    // GET /api/users/me will bootstrap it on first call (getUserByAuthId === id).
    try {
      await dfinity.createUser({ id: uuidv4(), authId: id, userType, name: displayName, email });
    } catch (e) {
      console.error('Signup: canister createUser failed (will bootstrap on first /me):', e.message);
    }

    return res.json({ ok: true, data: { token: signToken(authUser), user: publicUser(authUser) } });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ ok: false, error: 'Failed to create account.' });
  }
});

/**
 * POST /api/auth/login
 */
router.post('/login', authLimiter, async (req, res) => {
  try {
    let { email, password } = req.body || {};
    email = String(email || '').trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'Email and password are required.' });
    }

    const authUser = getAuthUserByEmail(email);
    // Same generic message whether the email or password is wrong.
    if (!authUser || !(await bcrypt.compare(String(password), authUser.password_hash))) {
      return res.status(401).json({ ok: false, error: 'Invalid email or password.' });
    }

    return res.json({ ok: true, data: { token: signToken(authUser), user: publicUser(authUser) } });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ ok: false, error: 'Failed to sign in.' });
  }
});

/**
 * GET /api/auth/me  (token required)
 */
router.get('/me', verifyJwt, (req, res) => {
  const authUser = getAuthUserById(req.auth.sub);
  if (!authUser) {
    return res.status(404).json({ ok: false, error: 'User not found.' });
  }
  return res.json({ ok: true, data: publicUser(authUser) });
});

/**
 * POST /api/auth/logout — stateless JWT, so the client just discards the token.
 */
router.post('/logout', (req, res) => res.json({ ok: true }));

module.exports = router;
