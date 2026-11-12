require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3002;

// CORS middleware - allow all Vercel preview deployments
const corsOptions = {
  origin: function (origin, callback) {
    // Log for debugging
    console.log('🔍 CORS check for origin:', origin);
    
    const allowedOrigins = [
      'https://zubaz-react.vercel.app',
      'https://app.zubaze.com',
      'https://www.zubaze.com',
      'https://zubaze.com',
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.FRONTEND_URL
    ].filter(Boolean); // Remove undefined values
    
    // Allow all Vercel preview deployments (*.vercel.app)
    const isVercelDeploy = origin && (origin.includes('.vercel.app') || origin.includes('vercel.app'));
    
    // Allow if no origin (server-to-server), in allowed list, or is Vercel deploy
    if (!origin || allowedOrigins.includes(origin) || isVercelDeploy) {
      console.log('✅ CORS allowed for:', origin);
      callback(null, true);
    } else {
      console.log('❌ CORS rejected for:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

// Log all API calls
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    console.log(`[API] ${req.method} ${req.path}`);
  }
  next();
});

// Import routes
const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/projects');
const clientsRouter = require('./routes/clients');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const dashboardContentRouter = require('./routes/dashboard-content');
const collaborationScoreRouter = require('./routes/collaboration-score');
const tasksRouter = require('./routes/tasks');
const invoicesRouter = require('./routes/invoices');
const documentsRouter = require('./routes/documents');
const paymentSettingsRouter = require('./routes/payment-settings');

// Mount routers
app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/dashboard-content', dashboardContentRouter);
app.use('/api', collaborationScoreRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/payment-settings', paymentSettingsRouter);

// Image proxy to bypass CORS
app.get('/api/proxy-image', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 10000
    });

    res.set('Content-Type', response.headers['content-type'] || 'image/png');
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// Legacy thumbnail endpoint (no auth required)
app.post('/api/fetch-thumbnail', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    let thumbnail = $('meta[property="og:image"]').attr('content') ||
                   $('meta[name="twitter:image"]').attr('content');

    if (thumbnail && !thumbnail.startsWith('http')) {
      const urlObj = new URL(url);
      thumbnail = `${urlObj.protocol}//${urlObj.host}${thumbnail}`;
    }

    res.json({ thumbnail: thumbnail || null, success: !!thumbnail });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch', success: false });
  }
});

// Upload thumbnail to DFINITY blob storage
app.post('/api/upload-thumbnail', async (req, res) => {
  const { base64Data, filename, contentType, userId } = req.body;

  if (!base64Data || !filename || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const dfinity = require('./services/dfinityIntegration');
    
    // Convert base64 to buffer
    const base64WithoutPrefix = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64WithoutPrefix, 'base64');
    
    // Generate unique asset ID
    const assetId = `thumbnail_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    console.log('📤 Uploading to DFINITY:', { assetId, size: buffer.length, contentType });
    
    // Upload to DFINITY
    const result = await dfinity.uploadAsset(assetId, buffer, contentType || 'image/png', filename, userId);
    
    console.log('✅ DFINITY upload successful:', result);
    
    res.json({ 
      success: true, 
      assetId,
      url: `/thumbnail/${assetId}` // Relative to /api base
    });
  } catch (error) {
    console.error('❌ Thumbnail upload error:', error);
    // Return success anyway and use base64 fallback on frontend
    res.status(500).json({ error: error.message || 'Failed to upload thumbnail', success: false });
  }
});

// Get thumbnail from DFINITY blob storage
app.get('/api/thumbnail/:assetId', async (req, res) => {
  const { assetId } = req.params;
  
  try {
    const dfinity = require('./services/dfinityIntegration');
    console.log('🔍 Retrieving thumbnail from DFINITY:', assetId);
    
    const asset = await dfinity.getAsset(assetId);
    
    if (!asset) {
      console.log('❌ Thumbnail not found in DFINITY:', assetId);
      return res.status(404).json({ error: 'Thumbnail not found' });
    }
    
    console.log('✅ Thumbnail retrieved:', { assetId, contentType: asset.contentType, size: asset.data?.length });
    
    // Set CORS headers for cross-origin image loading
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Content-Type', asset.contentType);
    res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.send(Buffer.from(asset.data));
  } catch (error) {
    console.error('❌ Thumbnail retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve thumbnail' });
  }
});

// Health check endpoint
// Used to warm up the API/canister before running tests
app.get('/api/health', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  res.json({ 
    ok: true, 
    status: 'ready',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime)}s`,
    memory: {
      used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
    },
    environment: process.env.NODE_ENV || 'development',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      ok: false,
      error: 'Invalid or expired authentication token',
    });
  }
  
  res.status(500).json({
    ok: false,
    error: 'Internal server error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: 'Endpoint not found',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Zubaze API Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🔐 Auth0 Domain: ${process.env.AUTH0_DOMAIN || 'dev-yprosf8bapwtcvyi.us.auth0.com'}`);
  console.log(`🌐 DFINITY Canister: ${process.env.CANISTER_ID || 'NOT SET'}`);
  console.log(`🌐 DFINITY Host: ${process.env.IC_HOST || 'NOT SET'}`);
  console.log(`✅ Server Version: 3.0.0 (PRODUCTION READY)`);
});
