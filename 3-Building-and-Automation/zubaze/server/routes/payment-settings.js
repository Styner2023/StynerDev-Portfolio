const express = require('express');
const router = express.Router();
const dfinity = require('../services/dfinityIntegration');

// Get payment settings for a developer
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const settings = await dfinity.getPaymentSettings(userId);
    res.json({ ok: true, settings: settings || {} });
  } catch (error) {
    console.error('Error fetching payment settings:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Update payment settings for a developer
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { cashapp, venmo, zelle, paypal } = req.body;
    
    await dfinity.updatePaymentSettings(userId, { cashapp, venmo, zelle, paypal });
    res.json({ ok: true, message: 'Payment settings updated' });
  } catch (error) {
    console.error('Error updating payment settings:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
