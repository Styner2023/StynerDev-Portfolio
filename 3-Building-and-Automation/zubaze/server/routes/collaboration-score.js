const express = require('express');
const router = express.Router();

// Calculate collaboration score
function calculateCollaborationScore(client) {
  const m = client.metrics || {};
  
  // Task Completion (30%)
  const taskScore = m.totalActionItems > 0
    ? (m.completedActionItems / m.totalActionItems) * 100
    : 100;
  
  // Response Time (30%)
  let responseScore = 100;
  if (m.averageResponseTimeHours > 0) {
    if (m.averageResponseTimeHours < 24) responseScore = 100;
    else if (m.averageResponseTimeHours < 48) responseScore = 85;
    else if (m.averageResponseTimeHours < 72) responseScore = 70;
    else responseScore = 50;
  }
  
  // Requirements Quality (20%)
  let qualityScore = 0;
  const feedbackScore = Math.min(100, (m.totalFeedbackSubmitted || 0) / 10 * 100);
  qualityScore += feedbackScore * 0.5;
  const formsScore = m.googleFormsSubmitted > 0
    ? (m.googleFormsCompleted / m.googleFormsSubmitted) * 100
    : 100;
  qualityScore += formsScore * 0.5;
  
  // Engagement (20%)
  let engagementScore = 0;
  const visitScore = Math.min(100, (m.dashboardVisits || 0) / 20 * 100);
  engagementScore += visitScore * 0.4;
  const ratingScore = Math.min(100, (m.totalRatingsSubmitted || 0) / 5 * 100);
  engagementScore += ratingScore * 0.3;
  const feedbackEngScore = Math.min(100, (m.totalFeedbackSubmitted || 0) / 10 * 100);
  engagementScore += feedbackEngScore * 0.3;
  
  const overall = Math.round(
    (taskScore * 0.30) +
    (responseScore * 0.30) +
    (qualityScore * 0.20) +
    (engagementScore * 0.20)
  );
  
  return {
    overall,
    taskCompletion: Math.round(taskScore),
    responseTime: Math.round(responseScore),
    requirementsQuality: Math.round(qualityScore),
    engagement: Math.round(engagementScore),
    lastCalculated: new Date().toISOString()
  };
}

// GET collaboration score
router.get('/clients/:clientId/collaboration-score', async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await req.app.locals.clientService.getClient(clientId);
    
    if (!client) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }
    
    const score = calculateCollaborationScore(client);
    
    // Update client with new score
    await req.app.locals.clientService.updateClient(clientId, {
      collaborationScore: score
    });
    
    res.json({ success: true, data: score });
  } catch (error) {
    console.error('Error calculating collaboration score:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST track activity
router.post('/clients/:clientId/track-activity', async (req, res) => {
  try {
    const { clientId } = req.params;
    const { type, data } = req.body;
    
    const client = await req.app.locals.clientService.getClient(clientId);
    if (!client) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }
    
    const metrics = client.metrics || {
      totalActionItems: 0,
      completedActionItems: 0,
      averageResponseTimeHours: 0,
      responseHistory: [],
      totalRatingsSubmitted: 0,
      totalFeedbackSubmitted: 0,
      dashboardVisits: 0,
      lastVisit: null,
      googleFormsSubmitted: 0,
      googleFormsCompleted: 0
    };
    
    switch(type) {
      case 'dashboard_visit':
        metrics.dashboardVisits = (metrics.dashboardVisits || 0) + 1;
        metrics.lastVisit = new Date().toISOString();
        break;
        
      case 'rating_submitted':
        metrics.totalRatingsSubmitted = (metrics.totalRatingsSubmitted || 0) + 1;
        break;
        
      case 'feedback_submitted':
        metrics.totalFeedbackSubmitted = (metrics.totalFeedbackSubmitted || 0) + 1;
        break;
        
      case 'action_item_response':
        if (!metrics.responseHistory) metrics.responseHistory = [];
        metrics.responseHistory.push({
          updateId: data?.updateId,
          sentAt: data?.sentAt,
          respondedAt: new Date().toISOString(),
          hoursToRespond: data?.hoursToRespond || 0
        });
        const totalHours = metrics.responseHistory.reduce((sum, r) => sum + (r.hoursToRespond || 0), 0);
        metrics.averageResponseTimeHours = totalHours / metrics.responseHistory.length;
        break;
        
      case 'google_form_submitted':
        metrics.googleFormsSubmitted = (metrics.googleFormsSubmitted || 0) + 1;
        break;
        
      case 'google_form_completed':
        metrics.googleFormsCompleted = (metrics.googleFormsCompleted || 0) + 1;
        break;
    }
    
    await req.app.locals.clientService.updateClient(clientId, { metrics });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking activity:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH update metrics
router.patch('/clients/:clientId/update-metrics', async (req, res) => {
  try {
    const { clientId } = req.params;
    const updates = req.body;
    
    const client = await req.app.locals.clientService.getClient(clientId);
    if (!client) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }
    
    const metrics = { ...client.metrics, ...updates };
    await req.app.locals.clientService.updateClient(clientId, { metrics });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating metrics:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
