/**
 * Users API Routes
 * Handles user bootstrap and management
 */

const express = require('express');
const router = express.Router();
const { checkJwt, extractUserInfo } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// Apply authentication middleware to all routes
router.use(checkJwt);
router.use(extractUserInfo);

const dfinity = require('../services/dfinityIntegration');

/**
 * GET /api/users/me
 * Get current user or bootstrap if first login
 */
router.get('/me', async (req, res) => {
  try {
    const { user } = req;
    
    // Check if user exists in canister
    let canisterUser = await dfinity.getUserByAuthId(user.id);
    
    if (!canisterUser) {
      // First login - bootstrap user
      console.log(`Bootstrapping new user: ${user.email}`);
      
      const newUser = {
        id: uuidv4(),
        authId: user.id,
        userType: user.userType || 'developer',
        name: user.email?.split('@')[0] || 'User',
        email: user.email || '',
      };
      
      canisterUser = await dfinity.createUser(newUser);
    }
    
    return res.json({
      ok: true,
      data: canisterUser,
    });
  } catch (error) {
    console.error('Error getting/creating user:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to get user information',
    });
  }
});

/**
 * GET /api/users/by-auth/:authId
 * Get user by Auth0 ID
 */
router.get('/by-auth/:authId', async (req, res) => {
  try {
    const { authId } = req.params;
    const { user } = req;
    
    // Only allow users to query their own auth ID (or admins)
    if (user.id !== authId && user.userType !== 'admin') {
      return res.status(403).json({
        ok: false,
        error: 'Access denied',
      });
    }
    
    const canisterUser = await dfinity.getUserByAuthId(authId);
    
    if (!canisterUser) {
      return res.status(404).json({
        ok: false,
        error: 'User not found',
      });
    }
    
    return res.json({
      ok: true,
      data: canisterUser,
    });
  } catch (error) {
    console.error('Error getting user by authId:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to get user',
    });
  }
});

module.exports = router;
