/**
 * Debug script to check client data structure in DFINITY
 * Run with: node debug-client-data.js
 */

require('dotenv').config();
const dfinity = require('./services/dfinityIntegration');

async function debugClientData() {
  console.log('🔍 Debugging Client Data Structure...\n');

  try {
    // Get all clients - try different methods
    console.log('1️⃣  Fetching clients from DFINITY...');
    
    // First, try getting all projects to find client-dashboard types
    const allProjects = await dfinity.getAllProjects();
    const clientDashboards = allProjects.filter(p => p.type === 'client-dashboard' || p.projectType === 'client-dashboard');
    
    console.log(`📊 Found ${allProjects.length} total projects`);
    console.log(`📊 Found ${clientDashboards.length} client-dashboard projects`);
    
    // Try to get clients by looking at unique developer IDs
    const developerIds = [...new Set(clientDashboards.map(p => p.developerId))];
    console.log(`👥 Found ${developerIds.length} unique developers\n`);
    
    let allClients = [];
    for (const devId of developerIds) {
      try {
        const clients = await dfinity.getClientsByDeveloper(devId);
        allClients.push(...clients);
      } catch (e) {
        console.log(`⚠️  Could not fetch clients for developer ${devId}`);
      }
    }
    
    console.log(`✅ Found ${allClients.length} total clients\n`);

    if (allClients.length === 0) {
      console.log('⚠️  No clients found in DFINITY');
      return;
    }

    // Inspect each client
    allClients.forEach((client, index) => {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`CLIENT ${index + 1}: ${client.name}`);
      console.log(`${'='.repeat(60)}`);
      console.log('📋 Basic Info:');
      console.log('  - ID:', client.id);
      console.log('  - Name:', client.name);
      console.log('  - Email:', client.email);
      console.log('  - Developer ID:', client.developerId);
      
      console.log('\n🔗 Dashboard URL:');
      console.log('  - Value:', client.dashboardUrl);
      console.log('  - Type:', typeof client.dashboardUrl);
      console.log('  - Is Array?:', Array.isArray(client.dashboardUrl));
      if (Array.isArray(client.dashboardUrl)) {
        console.log('  - Array Length:', client.dashboardUrl.length);
        console.log('  - Array Contents:', client.dashboardUrl);
      }

      console.log('\n📦 Projects:');
      console.log('  - Value:', client.projects);
      console.log('  - Type:', typeof client.projects);
      console.log('  - Is Array?:', Array.isArray(client.projects));
      
      if (Array.isArray(client.projects)) {
        console.log('  - Projects Count:', client.projects.length);
        client.projects.forEach((proj, i) => {
          console.log(`\n  PROJECT ${i + 1}:`);
          console.log('    - Type:', typeof proj);
          if (typeof proj === 'string') {
            console.log('    ❌ PROBLEM: Project is just an ID string:', proj);
          } else if (typeof proj === 'object') {
            console.log('    ✅ Project is an object:');
            console.log('      - ID:', proj.id);
            console.log('      - Name:', proj.name);
            console.log('      - URL:', proj.url);
            console.log('      - Thumbnail:', proj.thumbnail?.substring(0, 50) + '...');
            console.log('      - Admin URL:', proj.adminUrl);
          }
        });
      }

      console.log('\n🖼️  Website URL:');
      console.log('  - Value:', client.websiteUrl);
      console.log('  - Type:', typeof client.websiteUrl);
      console.log('  - Is Array?:', Array.isArray(client.websiteUrl));
    });

    console.log(`\n${'='.repeat(60)}`);
    console.log('📊 SUMMARY');
    console.log(`${'='.repeat(60)}`);
    
    const clientsWithStringProjects = allClients.filter(c => 
      Array.isArray(c.projects) && c.projects.length > 0 && typeof c.projects[0] === 'string'
    );
    
    const clientsWithObjectProjects = allClients.filter(c => 
      Array.isArray(c.projects) && c.projects.length > 0 && typeof c.projects[0] === 'object'
    );

    console.log(`\n✅ Clients with OBJECT projects (correct): ${clientsWithObjectProjects.length}`);
    console.log(`❌ Clients with STRING projects (wrong): ${clientsWithStringProjects.length}`);

    if (clientsWithStringProjects.length > 0) {
      console.log('\n⚠️  PROBLEM DETECTED:');
      console.log('Some clients have project IDs instead of full project objects!');
      console.log('These clients were created with old backend code.');
      console.log('Solution: Delete and recreate these clients after Railway redeploys.');
    }

    if (clientsWithObjectProjects.length > 0) {
      console.log('\n✅ GOOD NEWS:');
      console.log('Some clients have full project objects with thumbnails!');
      console.log('These should display correctly in client dashboards.');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
  }
}

debugClientData();
