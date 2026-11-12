/**
 * Auth middleware
 * Verifies our own (custom) JWTs and extracts user information.
 * Tokens are issued by server/routes/auth.js (HS256, AUTH_JWT_SECRET).
 */

const jwt = require('jsonwebtoken');

/**
 * JWT verification middleware.
 * Reads a Bearer token, verifies it locally, and puts the decoded
 * payload on req.auth (same shape the rest of the app already expects).
 */
const verifyJwt = (req, res, next) => {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) {
    console.error('AUTH_JWT_SECRET is not set — cannot verify tokens');
    return res.status(500).json({ ok: false, error: 'Server auth not configured' });
  }

  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null;
  if (!token) {
    return res.status(401).json({ ok: false, error: 'Authentication required' });
  }

  try {
    req.auth = jwt.verify(token, secret);
    return next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'Invalid or expired authentication token' });
  }
};

// Existing routers do `router.use(checkJwt)`; keep that name working.
const checkJwt = verifyJwt;

/**
 * Extract user metadata from the verified token.
 * Also writes to req.session so the session cookie is set.
 */
const extractUserInfo = (req, res, next) => {
  try {
    const { auth } = req;

    if (!auth) {
      return res.status(401).json({ ok: false, error: 'Authentication required' });
    }

    const userInfo = {
      id: auth.sub,
      email: auth.email || auth[`https://zubaze.com/email`],
      userType: auth[`https://zubaze.com/user_type`] || 'developer',
      developerId: auth[`https://zubaze.com/developer_id`],
      clientId: auth[`https://zubaze.com/client_id`],
    };

    req.user = userInfo;

    if (req.session) {
      req.session.user = userInfo;
      req.session.authenticated = true;
    }

    next();
  } catch (error) {
    console.error('Error extracting user info:', error);
    return res.status(401).json({ ok: false, error: 'Invalid authentication token' });
  }
};

/**
 * Authorization middleware - check user type
 */
const requireUserType = (requiredType) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ ok: false, error: 'Authentication required' });
    }

    if (req.user.userType !== requiredType) {
      return res.status(403).json({
        ok: false,
        error: `Access denied. This endpoint requires ${requiredType} access.`,
      });
    }

    next();
  };
};

/**
 * Authorization middleware - check resource ownership
 */
const requireOwnership = (resourceType) => {
  return async (req, res, next) => {
    try {
      const { user } = req;

      if (user.userType === 'developer') {
        next();
      } else if (user.userType === 'client') {
        next();
      } else {
        return res.status(403).json({
          ok: false,
          error: 'Access denied. You do not own this resource.',
        });
      }
    } catch (error) {
      console.error('Ownership check failed:', error);
      return res.status(500).json({ ok: false, error: 'Failed to verify resource ownership' });
    }
  };
};

module.exports = {
  verifyJwt,
  checkJwt,
  extractUserInfo,
  requireUserType,
  requireOwnership,
};
