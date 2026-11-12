/**
 * Script to add projects to the existing Francisco Herrera client for testing
 */

const { 
  getClientsByDeveloper, 
  createProject, 
  updateClient, 
  getClientById
} = require('./services/dfinityIntegration');

async function addProjectsToFranciscoClient() {
  console.log('🔧 Adding projects to Francisco Herrera client...');
  
  try {
    const developerId = 'google-oauth2|103149473092394174759';
    
    // Find Francisco Herrera client
    const clients = await getClientsByDeveloper(developerId);
    const franciscoClient = clients.find(c => 
      c.name === 'Francisco Herrera' && 
      c.dashboardUrl === 'francisco-herrera-dashboard'
    );
    
    if (!franciscoClient) {
      console.log('❌ Francisco Herrera client not found');
      return;
    }
    
    console.log('✅ Found client:', franciscoClient.name, franciscoClient.id);
    
    // Create some test projects
    const projectsToAdd = [
      {
        id: `project_${Date.now()}_portfolio`,
        name: "Francisco's Portfolio Website",
        url: "https://franciscoherrera.com",
        adminUrl: "https://franciscoherrera.com/admin",
        developerId: developerId,
        clientId: franciscoClient.id,
        thumbnail: "https://franciscoherrera.com/thumbnail.jpg",
        projectType: "portfolio",
        status: "active",
        clientDashboardUrl: "",
      },
      {
        id: `project_${Date.now() + 1}_business`,
        name: "Guitar Lessons Site",
        url: "https://franciscoguitar.com",
        adminUrl: "https://franciscoguitar.com/wp-admin",
        developerId: developerId,
        clientId: franciscoClient.id,
        thumbnail: "https://franciscoguitar.com/thumbnail.jpg", 
        projectType: "business",
        status: "active",
        clientDashboardUrl: "",
      },
      {
        id: `project_${Date.now() + 2}_blog`,
        name: "Music Blog",
        url: "https://franciscomusic.blog",
        adminUrl: "https://franciscomusic.blog/cms",
        developerId: developerId,
        clientId: franciscoClient.id,
        thumbnail: "https://franciscomusic.blog/thumbnail.jpg",
        projectType: "blog", 
        status: "active",
        clientDashboardUrl: "",
      }
    ];
    
    // Create projects in DFINITY
    const createdProjects = [];
    for (const projectData of projectsToAdd) {
      try {
        console.log('📝 Creating project:', projectData.name);
        const project = await createProject(projectData);
        createdProjects.push(project);
        console.log('✅ Created:', project.name);
      } catch (error) {
        console.error('❌ Failed to create project:', projectData.name, error.message);
      }
    }
    
    if (createdProjects.length === 0) {
      console.log('❌ No projects were created');
      return;
    }
    
    // Update client with the new projects
    console.log('🔗 Linking projects to client...');
    const existingProjects = franciscoClient.projects || [];
    const allProjects = [...existingProjects, ...createdProjects];
    
    const updatedClient = await updateClient(franciscoClient.id, {
      projects: allProjects
    });
    
    console.log('✅ Updated client with projects');
    console.log(`📊 Client now has ${updatedClient.projects?.length || 0} projects`);
    
    // Verify the result
    const verifyClient = await getClientById(franciscoClient.id);
    console.log('🔍 Verification - Client projects:', verifyClient.projects?.length || 0);
    
    if (verifyClient.projects && verifyClient.projects.length > 0) {
      console.log('📋 Projects:');
      verifyClient.projects.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.name} (${p.url})`);
      });
    }
    
    console.log('\n✅ Success! Now test the client dashboard:');
    console.log('🔗 http://localhost:3000/client-dashboard/francisco-herrera-dashboard');
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Stack:', error.stack);
  }
}

addProjectsToFranciscoClient();