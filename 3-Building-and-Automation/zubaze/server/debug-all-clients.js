/**
 * Debug script to fetch all clients from DFINITY and see their structure
 */

const { actor, getClientsByDeveloper } = require('./services/dfinityIntegration');

async function debugAllClients() {
  console.log('🔍 Debugging all clients in DFINITY...');
  
  try {
    // Get all clients using actor
    const allClients = await actor.getAllClients();
    console.log('📊 Total clients in DFINITY:', allClients?.length || 0);
    
    if (allClients && allClients.length > 0) {
      console.log('\n📋 All clients:');
      allClients.forEach((client, i) => {
        console.log(`\nClient ${i + 1}:`);
        console.log(`  ID: ${client.id || 'undefined'}`);
        console.log(`  Name: ${client.name || 'undefined'}`);
        console.log(`  Email: ${client.email || 'undefined'}`);
        console.log(`  Dashboard URL: ${client.dashboardUrl || 'undefined'}`);
        console.log(`  Developer ID: ${client.developerId || 'undefined'}`);
        console.log(`  Projects: ${client.projects?.length || 0} items`);
        console.log(`  Raw data:`, client);
      });
      
      // Also test specific developer lookup
      console.log('\n🔍 Testing developer-specific lookups:');
      const uniqueDeveloperIds = [...new Set(allClients.map(c => c.developerId).filter(Boolean))];
      console.log('Unique developer IDs:', uniqueDeveloperIds);
      
      for (const devId of uniqueDeveloperIds.slice(0, 3)) { // Test first 3
        try {
          console.log(`\n👨‍💻 Clients for developer ${devId}:`);
          const devClients = await getClientsByDeveloper(devId);
          console.log(`  Found ${devClients?.length || 0} clients`);
          if (devClients && devClients.length > 0) {
            devClients.forEach(client => {
              console.log(`    - ${client.name} (${client.dashboardUrl})`);
            });
          }
        } catch (error) {
          console.error(`  ❌ Error for developer ${devId}:`, error.message);
        }
      }
      
      // Find clients with specific dashboard URLs we're testing
      console.log('\n🎯 Looking for specific dashboard URLs:');
      const testUrls = ['francisco-herrera-dashboard', 'test-dashboard', 'john-doe-dashboard'];
      testUrls.forEach(url => {
        const matchingClients = allClients.filter(c => c.dashboardUrl === url);
        console.log(`  "${url}": ${matchingClients.length} matches`);
        matchingClients.forEach(client => {
          console.log(`    - ${client.name} (Developer: ${client.developerId})`);
        });
      });
      
    } else {
      console.log('📭 No clients found in DFINITY');
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
    console.error('Stack:', error.stack);
  }
  
  console.log('\n✅ Debug complete');
}

debugAllClients();