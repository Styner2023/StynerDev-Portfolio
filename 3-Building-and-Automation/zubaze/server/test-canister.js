/**
 * Test script to verify DFINITY canister connection
 * Run with: node test-canister.js
 */

require('dotenv').config();
const dfinity = require('./services/dfinityIntegration');

async function testCanisterConnection() {
  console.log('🧪 Testing DFINITY Canister Connection...');
  console.log(`📍 Canister ID: ${process.env.CANISTER_ID}`);
  console.log(`🌐 IC Host: ${process.env.IC_HOST}\n`);

  try {
    // Test 1: Health check
    console.log('1️⃣  Testing health check...');
    const health = await dfinity.health();
    console.log(`✅ Health: ${health}\n`);

    // Test 2: Get cycle status
    console.log('2️⃣  Testing cycle status...');
    const cycleStatus = await dfinity.getCycleStatus();
    console.log(`✅ Cycle Status:`, cycleStatus, '\n');

    // Test 3: Get all projects
    console.log('3️⃣  Testing getAllProjects...');
    const projects = await dfinity.getAllProjects();
    console.log(`✅ Found ${projects.length} projects\n`);

    // Test 4: Get all clients
    console.log('4️⃣  Testing getAllClients...');
    const clients = await dfinity.getClientsByDeveloper('test-developer');
    console.log(`✅ Found ${clients.length} clients\n`);

    console.log('🎉 All tests passed! Canister is accessible.');
    console.log('\n📝 Next steps:');
    console.log('   1. Start the server: npm start');
    console.log('   2. Test API endpoints with Auth0 tokens');
    console.log('   3. Bootstrap a user on first login\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   - Check CANISTER_ID is correct: q4jjt-lqaaa-aaaau-acpyq-cai');
    console.error('   - Check IC_HOST is accessible: https://icp-api.io');
    console.error('   - Verify canister is deployed and running');
    console.error('   - Check network connectivity\n');
    process.exit(1);
  }
}

testCanisterConnection();
