const dfinity = require('./services/dfinityIntegration');

async function purgeDeletedClients() {
  console.log('🔥 PURGING ALL [DELETED] CLIENTS FROM CANISTER...');
  
  try {
    const allClients = await dfinity.actor.getAllClients();
    console.log(`📊 Total clients in canister: ${allClients.length}`);
    
    const deletedClients = allClients.filter(c => c.name.startsWith('[DELETED]'));
    console.log(`🗑️  Found ${deletedClients.length} [DELETED] clients to purge`);
    
    if (deletedClients.length === 0) {
      console.log('✅ No deleted clients to purge');
      return;
    }
    
    for (const client of deletedClients) {
      console.log(`🔥 Permanently deleting: ${client.name} (${client.id})`);
      await dfinity.actor.deleteClient(client.id);
      console.log(`✅ Deleted: ${client.id}`);
    }
    
    console.log('🎉 ALL [DELETED] CLIENTS PERMANENTLY PURGED FROM CANISTER');
    
    const remaining = await dfinity.actor.getAllClients();
    console.log(`📊 Remaining clients: ${remaining.length}`);
    
  } catch (error) {
    console.error('❌ Error purging deleted clients:', error);
    process.exit(1);
  }
}

purgeDeletedClients();
