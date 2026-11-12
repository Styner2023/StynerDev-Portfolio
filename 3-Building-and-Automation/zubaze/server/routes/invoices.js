/**
 * Invoices API Routes
 * Handles all invoice-related endpoints with Auth0 verification
 */

const express = require('express');
const router = express.Router();
const { checkJwt, extractUserInfo, requireUserType } = require('../middleware/auth');
const dfinity = require('../services/dfinityIntegration');

router.use(checkJwt);
router.use(extractUserInfo);

/**
 * GET /api/invoices
 * Fetch all invoices for the developer
 */
router.get('/', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const invoices = await dfinity.getInvoicesByDeveloper(user.id);
    
    return res.json({
      ok: true,
      data: invoices,
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch invoices',
    });
  }
});

/**
 * POST /api/invoices
 * Create a new invoice
 */
router.post('/', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const invoiceData = {
      ...req.body,
      id: `invoice_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      developerId: user.id,
      date: Date.now(),
    };

    const createdInvoice = await dfinity.createInvoice(invoiceData);

    return res.status(201).json({
      ok: true,
      data: createdInvoice,
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to create invoice',
    });
  }
});

/**
 * PATCH /api/invoices/:id
 * Update an invoice
 */
router.patch('/:id', requireUserType('developer'), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInvoice = await dfinity.updateInvoice(id, req.body);

    return res.json({
      ok: true,
      data: updatedInvoice,
    });
  } catch (error) {
    console.error('Error updating invoice:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to update invoice',
    });
  }
});

/**
 * DELETE /api/invoices/:id
 * Delete an invoice
 */
router.delete('/:id', requireUserType('developer'), async (req, res) => {
  try {
    const { id } = req.params;
    await dfinity.deleteInvoice(id);

    return res.json({
      ok: true,
      data: { message: 'Invoice deleted successfully' },
    });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to delete invoice',
    });
  }
});

module.exports = router;
