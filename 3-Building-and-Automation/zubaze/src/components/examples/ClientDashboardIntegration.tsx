/**
 * Client Dashboard Integration Example
 * 
 * This shows how to integrate timeline updates and rating dialogs
 * into any client dashboard page.
 */

import { useState } from 'react';
import { useDashboardContent } from '../../api/hooks/useDashboardContent';
import { DeveloperRatingDialog, TemplateRatingDialog } from '../common/RatingDialogs';

interface ClientDashboardIntegrationProps {
  clientId: string;
}

export function ClientDashboardIntegration({ clientId }: ClientDashboardIntegrationProps) {
  const { data: content, isLoading } = useDashboardContent(clientId);
  const [showDevRating, setShowDevRating] = useState(false);
  const [showTemplateRating, setShowTemplateRating] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ id: string; name: string } | null>(null);

  if (isLoading) {
    return <div className="text-center py-8">Loading updates...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Latest Updates Section */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="material-icons text-primary">notifications</span>
            Latest Updates
          </h2>
          <button
            onClick={() => setShowDevRating(true)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center gap-2"
          >
            <span className="material-icons text-sm">star</span>
            Rate Developer
          </button>
        </div>

        {/* Timeline Updates */}
        <div className="space-y-4">
          {content?.updates && content.updates.length > 0 ? (
            content.updates
              .filter(u => u.status === 'active')
              .slice(0, 5) // Show latest 5
              .map((update) => (
                <div
                  key={update.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-primary"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {update.type === 'update' && '📢'}
                        {update.type === 'action-item' && '✅'}
                        {update.type === 'note' && '📝'}
                      </span>
                      <h3 className="font-bold text-lg">{update.title}</h3>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(update.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {update.content}
                  </p>
                  
                  {/* Action Items */}
                  {update.actionItems && update.actionItems.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-yellow-400">
                      <p className="font-semibold text-sm text-yellow-700 dark:text-yellow-500 mb-2">
                        Action Items for You:
                      </p>
                      <ul className="space-y-1">
                        {update.actionItems.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <span className="material-icons text-yellow-600 text-xs">arrow_right</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No updates yet. Your developer will post updates here.
            </p>
          )}
        </div>
      </section>

      {/* Shared Resources Section */}
      {content?.resources && content.resources.length > 0 && (
        <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="material-icons text-primary">folder_shared</span>
            Shared Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.resources.map((resource) => (
              <div
                key={resource.id}
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">
                    {resource.type === 'google-docs' && '📄'}
                    {resource.type === 'google-sheets' && '📊'}
                    {resource.type === 'google-slides' && '📽️'}
                    {resource.type === 'google-drive' && '📁'}
                  </span>
                  <h3 className="font-bold text-lg">{resource.title}</h3>
                </div>
                
                <div className="space-y-2">
                  {resource.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition group"
                    >
                      <span className="material-icons text-blue-600 text-sm">insert_link</span>
                      <span className="flex-1 text-sm font-medium group-hover:underline">
                        {link.name}
                      </span>
                      <span className="material-icons text-xs text-gray-400">open_in_new</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Website Cards with Rating Buttons */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="material-icons text-primary">web</span>
          Your Websites
        </h2>
        
        {/* Example website card - replace with your actual website data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-900" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">My Business Website</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Your professional business website
              </p>
              <div className="flex gap-2">
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-center text-sm font-semibold"
                >
                  Visit Site
                </a>
                <button
                  onClick={() => {
                    setSelectedProject({ id: 'project_1', name: 'My Business Website' });
                    setShowTemplateRating(true);
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center gap-1"
                  title="Rate this website"
                >
                  <span className="material-icons text-sm">star</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Score */}
      {content?.collaborationScore && (
        <section className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Collaboration Score</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Based on communication and responsiveness
              </p>
            </div>
            <div className="text-5xl font-bold text-green-600">
              {content.collaborationScore}
              <span className="text-2xl text-gray-500">/100</span>
            </div>
          </div>
        </section>
      )}

      {/* Rating Dialogs */}
      <DeveloperRatingDialog
        clientId={clientId}
        isOpen={showDevRating}
        onClose={() => setShowDevRating(false)}
      />
      
      {selectedProject && (
        <TemplateRatingDialog
          clientId={clientId}
          projectId={selectedProject.id}
          projectName={selectedProject.name}
          isOpen={showTemplateRating}
          onClose={() => {
            setShowTemplateRating(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}

/**
 * INTEGRATION INSTRUCTIONS
 * 
 * 1. Import this component into your client dashboard page:
 *    import { ClientDashboardIntegration } from '../components/examples/ClientDashboardIntegration';
 * 
 * 2. Get the clientId from your auth or URL params
 * 
 * 3. Render the component:
 *    <ClientDashboardIntegration clientId={clientId} />
 * 
 * 4. Customize the styling to match your design
 * 
 * 5. Replace the example website card with your actual website data
 * 
 * That's it! The component handles:
 *   - Fetching and displaying timeline updates
 *   - Showing shared resources
 *   - Rating dialogs for developer and templates
 *   - Collaboration score display
 */
