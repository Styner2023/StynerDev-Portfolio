/**
 * Documents API Routes
 * Handles all document-related endpoints with Auth0 verification
 * Updated: Using in-memory storage
 */

const express = require('express');
const router = express.Router();
const { checkJwt, extractUserInfo, requireUserType } = require('../middleware/auth');
const dfinity = require('../services/dfinityIntegration');

// Temporary in-memory storage until DFINITY canister is updated
const documentsStore = new Map();

router.use(checkJwt);
router.use(extractUserInfo);

/**
 * GET /api/documents
 * Fetch documents - filter by clientId if provided
 */
router.get('/', async (req, res) => {
  try {
    const { clientId } = req.query;
    const { user } = req;
    
    // Try DFINITY with 5s timeout
    try {
      const developerId = user?.id || '';
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('DFINITY timeout')), 5000)
      );
      const dfinityDocs = await Promise.race([
        dfinity.getDocumentsByDeveloper(developerId),
        timeoutPromise
      ]);
      
      if (clientId) {
        const filtered = dfinityDocs.filter(doc => doc.clientId === clientId);
        return res.json({ ok: true, data: filtered });
      }
      
      return res.json({ ok: true, data: dfinityDocs });
    } catch (dfinityError) {
      console.warn('⚠️ DFINITY fetch failed, using memory:', dfinityError.message);
      
      // Fallback to memory
      const allDocs = Array.from(documentsStore.values());
      
      if (clientId) {
        const filtered = allDocs.filter(doc => doc.clientId === clientId && doc.developerId === user?.id);
        return res.json({ ok: true, data: filtered });
      }
      
      if (!user || user.userType !== 'developer') {
        return res.status(403).json({ ok: false, error: 'Developer access required' });
      }
      
      const documents = allDocs.filter(doc => doc.developerId === user.id);
      return res.json({ ok: true, data: documents });
    }
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).json({ ok: false, error: 'Failed to fetch documents' });
  }
});

/**
 * POST /api/documents
 * Upload a new document
 */
router.post('/', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const documentData = {
      ...req.body,
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      developerId: user.id,
      uploadedAt: Date.now(),
    };

    // Try DFINITY first, fallback to memory
    try {
      const result = await dfinity.createDocument(documentData);
      console.log('✅ Document created in DFINITY:', documentData.id);
      return res.status(201).json({ ok: true, data: result });
    } catch (dfinityError) {
      console.warn('⚠️ DFINITY failed, using memory:', dfinityError.message);
      documentsStore.set(documentData.id, documentData);
      console.log('✅ Document created in memory:', documentData.id);
      return res.status(201).json({ ok: true, data: documentData });
    }
  } catch (error) {
    console.error('Error creating document:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to create document',
    });
  }
});

/**
 * DELETE /api/documents/:id
 * Delete a document
 */
router.delete('/:id', requireUserType('developer'), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try DFINITY first
    try {
      await dfinity.deleteDocument(id);
      console.log('✅ Document deleted from DFINITY:', id);
    } catch (dfinityError) {
      console.warn('⚠️ DFINITY delete failed:', dfinityError.message);
    }
    
    // Also delete from memory
    documentsStore.delete(id);
    console.log('✅ Document deleted from memory:', id);

    return res.json({
      ok: true,
      data: { message: 'Document deleted successfully' },
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to delete document',
    });
  }
});

module.exports = router;
