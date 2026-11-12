/**
 * Admin API Routes
 * Cycles management and admin-only operations
 */

const express = require('express');
const router = express.Router();
const { checkJwt, extractUserInfo, requireUserType } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(checkJwt);
router.use(extractUserInfo);

const dfinity = require('../services/dfinityIntegration');

/**
 * GET /api/admin/cycles
 * Get canister cycle status
 * Authorization: Developer or Admin
 */
router.get('/cycles', async (req, res) => {
  try {
    const { user } = req;
    
    // Allow developers and admins to view cycle status
    if (user.userType !== 'developer' && user.userType !== 'admin') {
      return res.status(403).json({
        ok: false,
        error: 'Access denied. Requires developer or admin access.',
      });
    }
    
    const status = await dfinity.getCycleStatus();
    
    return res.json({
      ok: true,
      data: status,
    });
  } catch (error) {
    console.error('Error getting cycle status:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to get cycle status',
    });
  }
});

/**
 * POST /api/admin/drain
 * Emergency cycle drain
 * Authorization: Admin only with confirmation
 */
router.post('/drain', requireUserType('admin'), async (req, res) => {
  try {
    const { confirmed } = req.body;
    
    if (!confirmed) {
      return res.status(400).json({
        ok: false,
        error: 'Confirmation required for drain operation',
      });
    }
    
    // This is a dangerous operation - add additional safety checks
    console.warn('⚠️  DRAIN OPERATION INITIATED BY:', req.user.id);
    
    // Call canister drain method
    const result = await dfinity.actor.drainToBusiness();
    
    if ('ok' in result) {
      return res.json({
        ok: true,
        data: result.ok,
      });
    } else {
      return res.status(500).json({
        ok: false,
        error: result.err,
      });
    }
  } catch (error) {
    console.error('Error draining cycles:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to drain cycles',
    });
  }
});

/**
 * POST /api/admin/emergency-drain
 * Emergency master drain
 * Authorization: Admin only with double confirmation
 */
router.post('/emergency-drain', requireUserType('admin'), async (req, res) => {
  try {
    const { confirmed, emergencyConfirmed } = req.body;
    
    if (!confirmed || !emergencyConfirmed) {
      return res.status(400).json({
        ok: false,
        error: 'Double confirmation required for emergency drain',
      });
    }
    
    // This is THE MOST dangerous operation
    console.error('🚨 EMERGENCY DRAIN INITIATED BY:', req.user.id);
    
    // Call canister emergency drain method
    const result = await dfinity.actor.emergencyDrainToMaster();
    
    if ('ok' in result) {
      return res.json({
        ok: true,
        data: result.ok,
      });
    } else {
      return res.status(500).json({
        ok: false,
        error: result.err,
      });
    }
  } catch (error) {
    console.error('Error in emergency drain:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to execute emergency drain',
    });
  }
});

module.exports = router;
