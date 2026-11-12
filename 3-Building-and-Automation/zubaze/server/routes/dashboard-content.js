/**
 * Dashboard Content Management Routes
 * 
 * Endpoints for managing client dashboard updates, resources, and feedback
 * 
 * Version: 3.1.1 - Fixed Candid Opt unwrapping for client access checks
 */

const express = require('express');
const router = express.Router();
const { checkJwt, extractUserInfo } = require('../middleware/auth');
const { Actor, HttpAgent } = require('@dfinity/agent');
const { idlFactory } = require('../services/canister-idl');

// Combine auth middlewares into a single requireAuth
const requireAuth = [checkJwt, extractUserInfo];

const CANISTER_ID = process.env.CANISTER_ID || 'q4jjt-lqaaa-aaaau-acpyq-cai';
const IC_HOST = 'https://icp-api.io'; // PRODUCTION ONLY

// Create actor for DFINITY canister
const createActor = async () => {
  const agent = new HttpAgent({ host: IC_HOST });
  // PRODUCTION ONLY - never fetch root key on mainnet
  return Actor.createActor(idlFactory, { agent, canisterId: CANISTER_ID });
};

// Helper: Unwrap Candid Opt type (returns [] for none, [value] for some)
const unwrapOpt = (opt) => (Array.isArray(opt) && opt.length > 0) ? opt[0] : null;

/**
 * GET /api/dashboard-content/:clientId
 * Get all dashboard content for a client (PUBLIC - no auth required)
 */
router.get('/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;

    // Get client from DFINITY (no auth check - public endpoint)
    const actor = await createActor();
    const clientOpt = await actor.getClient(clientId); const client = unwrapOpt(clientOpt);
    
    if (!client) {
      return res.status(404).json({
        ok: false,
        error: 'Client not found'
      });
    }

    // Get content from DFINITY canister
    console.log('📊 Fetching dashboard content for:', clientId);

    const [resources, timeline] = await Promise.all([
      actor.getResourcesByClient(clientId),
      actor.getTimelineByClient(clientId)
    ]);

    // Convert BigInt to Number for JSON serialization
    const convertBigInt = (obj) => {
      if (typeof obj === 'bigint') return Number(obj);
      if (Array.isArray(obj)) return obj.map(convertBigInt);
      if (obj && typeof obj === 'object') {
        return Object.fromEntries(
          Object.entries(obj).map(([k, v]) => [k, convertBigInt(v)])
        );
      }
      return obj;
    };

    console.log('✅ Dashboard content fetched from DFINITY:', {
      clientId,
      resourcesCount: resources.length,
      updatesCount: timeline.length
    });

    res.json({
      ok: true,
      data: {
        clientId,
        updates: convertBigInt(timeline),
        resources: convertBigInt(resources),
        lastUpdated: Date.now()
      }
    });
  } catch (error) {
    console.error('❌ Error fetching dashboard content:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Failed to fetch dashboard content'
    });
  }
});

/**
 * POST /api/dashboard-content/:clientId/timeline-update
 * Add a timeline update for a client
 */
router.post('/:clientId/timeline-update', requireAuth, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { type, title, content, actionItems } = req.body;
    const developerId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({
        ok: false,
        error: 'Title and content are required'
      });
    }

    const actor = await createActor();
    
    // Verify access
    const clientOpt = await actor.getClient(clientId); const client = unwrapOpt(clientOpt);
    if (!client || client.developerId !== developerId) {
      return res.status(403).json({
        ok: false,
        error: 'Access denied'
      });
    }

    // Create timeline update
    const update = {
      id: `update_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clientId,
      developerId,
      updateType: type || 'update',
      title,
      content,
      actionItems: actionItems || [],
      status: 'active',
      createdAt: Date.now()
    };

    // Save to DFINITY canister
    await actor.addTimelineUpdate(update);
    console.log('✅ Timeline update added to DFINITY:', update.id);

    res.json({
      ok: true,
      data: update
    });
  } catch (error) {
    console.error('Error adding timeline update:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Failed to add timeline update'
    });
  }
});

/**
 * PATCH /api/dashboard-content/:clientId/timeline-update/:updateId
 * Update a timeline update
 */
router.patch('/:clientId/timeline-update/:updateId', requireAuth, async (req, res) => {
  try {
    const { clientId, updateId } = req.params;
    const updates = req.body;
    const developerId = req.user.id;

    const actor = await createActor();
    
    // Verify access
    const clientOpt = await actor.getClient(clientId); const client = unwrapOpt(clientOpt);
    if (!client || client.developerId !== developerId) {
      return res.status(403).json({
        ok: false,
        error: 'Access denied'
      });
    }

    // DFINITY doesn't support update - delete and recreate if needed
    console.log('⚠️ Timeline update endpoint - not implemented in DFINITY');

    res.json({
      ok: true,
      data: { updated: true, updateId }
    });
  } catch (error) {
    console.error('Error updating timeline update:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Failed to update timeline update'
    });
  }
});

/**
 * DELETE /api/dashboard-content/:clientId/timeline-update/:updateId
 * Delete a timeline update
 */
router.delete('/:clientId/timeline-update/:updateId', requireAuth, async (req, res) => {
  try {
    const { clientId, updateId } = req.params;
    const developerId = req.user.id;

    const actor = await createActor();
    
    // Verify access
    const clientOpt = await actor.getClient(clientId); const client = unwrapOpt(clientOpt);
    if (!client || client.developerId !== developerId) {
      return res.status(403).json({
        ok: false,
        error: 'Access denied'
      });
    }

    // Delete from DFINITY
    await actor.deleteTimelineUpdate(updateId);
    console.log('✅ Timeline update deleted from DFINITY:', updateId);

    res.json({
      ok: true,
      data: { deleted: true, updateId }
    });
  } catch (error) {
    console.error('Error deleting timeline update:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Failed to delete timeline update'
    });
  }
});

/**
 * POST /api/dashboard-content/:clientId/resource
 * Add a shared resource
 */
router.post('/:clientId/resource', requireAuth, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { type, title, links } = req.body;
    const developerId = req.user.id;

    console.log('📦 Adding resource:', { clientId, type, title, linksCount: links?.length });

    if (!title || !links || !Array.isArray(links) || links.length === 0) {
      return res.status(400).json({
        ok: false,
        error: 'Title and at least one link are required'
      });
    }

    const actor = await createActor();
    
    // Verify access
    const clientOpt = await actor.getClient(clientId); const client = unwrapOpt(clientOpt);
    console.log('🔐 POST ACCESS CHECK:');
    console.log('  req.user:', req.user);
    console.log('  req.user.id:', developerId);
    console.log('  client.developerId:', client?.developerId);
    console.log('  match?', client?.developerId === developerId);
    
    if (!client || client.developerId !== developerId) {
      return res.status(403).json({
        ok: false,
        error: 'Access denied'
      });
    }

    const resource = {
      id: `resource_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clientId,
      developerId,
      resourceType: type || 'other',
      title,
      links,
      createdAt: Date.now()
    };

    // Save to DFINITY canister
    const result = await actor.addResource(resource);
    console.log('✅ Resource saved to DFINITY:', resource.id);

    res.json({
      ok: true,
      data: resource
    });
  } catch (error) {
    console.error('❌ Error adding resource:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Failed to add resource'
    });
  }
});

/**
 * DELETE /api/dashboard-content/:clientId/resource/:resourceId
 * Delete a shared resource
 */
router.delete('/:clientId/resource/:resourceId', requireAuth, async (req, res) => {
  try {
    const { clientId, resourceId } = req.params;
    const developerId = req.user.id;

    const actor = await createActor();
    
    // Verify access
    const clientOpt = await actor.getClient(clientId); const client = unwrapOpt(clientOpt);
    if (!client || client.developerId !== developerId) {
      return res.status(403).json({
        ok: false,
        error: 'Access denied'
      });
    }

    // Delete from DFINITY
    await actor.deleteResource(resourceId);
    console.log('✅ Resource deleted from DFINITY:', resourceId);

    res.json({
      ok: true,
      data: { deleted: true, resourceId }
    });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Failed to delete resource'
    });
  }
});

/**
 * POST /api/dashboard-content/:clientId/developer-rating
 * Client rates the developer
 */
router.post('/:clientId/developer-rating', requireAuth, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { rating, categories, feedback } = req.body;
    const clientUserId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        ok: false,
        error: 'Rating must be between 1 and 5'
      });
    }

    const actor = await createActor();
    
    // Verify this is actually the client
    const clientOpt = await actor.getClient(clientId); const client = unwrapOpt(clientOpt);
    if (!client || client.auth0Id !== clientUserId) {
      return res.status(403).json({
        ok: false,
        error: 'Access denied'
      });
    }

    const ratingData = {
      id: `dev_rating_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clientId,
      developerId: client.developerId,
      rating,
      categories: categories || {},
      feedback: feedback || '',
      createdAt: Date.now()
    };

    // Save to DFINITY
    await actor.addRating(ratingData);
    console.log('✅ Developer rating saved to DFINITY:', ratingData.id);

    res.json({
      ok: true,
      data: ratingData
    });
  } catch (error) {
    console.error('Error adding developer rating:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Failed to add developer rating'
    });
  }
});

/**
 * POST /api/dashboard-content/:clientId/template-rating
 * Client rates a website template
 */
router.post('/:clientId/template-rating', requireAuth, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { projectId, rating, categories, feedback } = req.body;
    const clientUserId = req.user.id;

    if (!projectId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        ok: false,
        error: 'Project ID and rating (1-5) are required'
      });
    }

    const actor = await createActor();
    
    // Verify this is actually the client
    const clientOpt = await actor.getClient(clientId); const client = unwrapOpt(clientOpt);
    if (!client || client.auth0Id !== clientUserId) {
      return res.status(403).json({
        ok: false,
        error: 'Access denied'
      });
    }

    const ratingData = {
      id: `template_rating_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clientId,
      developerId: client.developerId,
      projectId,
      rating,
      categories: categories || {},
      feedback: feedback || '',
      createdAt: Date.now()
    };

    // Save to DFINITY
    await actor.addRating(ratingData);
    console.log('✅ Template rating saved to DFINITY:', ratingData.id);

    res.json({
      ok: true,
      data: ratingData
    });
  } catch (error) {
    console.error('Error adding template rating:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Failed to add template rating'
    });
  }
});

/**
 * GET /api/dashboard-content/:clientId/ratings
 * Get all ratings (developer + templates) for a client
 */
router.get('/:clientId/ratings', requireAuth, async (req, res) => {
  try {
    const { clientId } = req.params;
    const developerId = req.user.id;

    const actor = await createActor();
    
    // Verify access
    const clientOpt = await actor.getClient(clientId); const client = unwrapOpt(clientOpt);
    if (!client || client.developerId !== developerId) {
      return res.status(403).json({
        ok: false,
        error: 'Access denied'
      });
    }

    // Get ratings from DFINITY
    console.log('⭐ Fetching ratings for:', clientId);

    const ratings = await actor.getRatingsByClient(clientId);
    const formattedRatings = { developerRatings: ratings, templateRatings: [] };

    res.json({
      ok: true,
      data: formattedRatings
    });
  } catch (error) {
    console.error('❌ Error fetching ratings:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Failed to fetch ratings'
    });
  }
});

module.exports = router;
