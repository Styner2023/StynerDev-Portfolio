import { useState } from 'react';
import { useClients } from '../../api/hooks/useClients';

interface GoogleResource {
  type: 'docs' | 'drive' | 'keep' | 'sheets';
  name: string;
  url: string;
}

interface ClientCard {
  id: string;
  name: string;
  email: string;
  resources: GoogleResource[];
}

export default function UpdatesDashboard() {
  const { clients } = useClients();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientCard | null>(null);
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [newResource, setNewResource] = useState<GoogleResource>({
    type: 'docs',
    name: '',
    url: ''
  });

  // Filter clients based on search
  const filteredClients = clients?.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getResourceIcon = (type: string) => {
    const icons = {
      docs: '/assets/google-suit-icons/docs_2020q4_48dp.png',
      drive: '/assets/google-suit-icons/google-drive.png',
      keep: '/assets/images/tools/google.png',
      sheets: '/assets/google-suit-icons/sheets_2020q4_48dp.png'
    };
    return icons[type as keyof typeof icons] || icons.docs;
  };

  const handleAddResource = () => {
    if (!selectedClient || !newResource.name || !newResource.url) return;
    
    // Add resource logic here
    setIsAddResourceOpen(false);
    setNewResource({ type: 'docs', name: '', url: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Client Resources Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage client access to Google Docs, Drive, Keep, and Sheets
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="material-icons absolute left-4 top-3.5 text-gray-400">search</span>
        </div>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 dark:border-gray-700"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="material-icons text-3xl">person</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold truncate">{client.name}</h3>
                  <p className="text-blue-100 text-sm truncate">{client.email}</p>
                </div>
              </div>
            </div>

            {/* Google Resources */}
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <span className="material-icons text-lg">folder_shared</span>
                Quick Access
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {/* Google Docs */}
                <button
                  onClick={() => window.open(`https://docs.google.com`, '_blank')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all group"
                >
                  <img
                    src="/assets/google-suit-icons/docs_2020q4_48dp.png"
                    alt="Google Docs"
                    className="w-10 h-10 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Docs</span>
                </button>

                {/* Google Drive */}
                <button
                  onClick={() => window.open(`https://drive.google.com`, '_blank')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all group"
                >
                  <img
                    src="/assets/google-suit-icons/google-drive.png"
                    alt="Google Drive"
                    className="w-10 h-10 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Drive</span>
                </button>

                {/* Google Keep */}
                <button
                  onClick={() => window.open(`https://keep.google.com`, '_blank')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all group"
                >
                  <img
                    src="/assets/images/tools/google.png"
                    alt="Google Keep"
                    className="w-10 h-10 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Keep</span>
                </button>

                {/* Google Sheets */}
                <button
                  onClick={() => window.open(`https://sheets.google.com`, '_blank')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all group"
                >
                  <img
                    src="/assets/google-suit-icons/sheets_2020q4_48dp.png"
                    alt="Google Sheets"
                    className="w-10 h-10 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Sheets</span>
                </button>
              </div>

              {/* View Dashboard Button */}
              <button
                onClick={() => {
                  const dashboardUrl = client.dashboardUrl || `${client.name.toLowerCase().replace(/\s+/g, '-')}-dashboard`;
                  window.open(`/client-dashboard/${dashboardUrl}`, '_blank');
                }}
                className="w-full mt-4 px-4 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-icons text-sm">dashboard</span>
                View Client Dashboard
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-5xl text-gray-400">search_off</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No clients found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery ? 'Try a different search term' : 'Add your first client to get started'}
          </p>
        </div>
      )}

      {/* Add Resource Modal */}
      {isAddResourceOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Add Resource Link
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resource Type
                </label>
                <select
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="docs">Google Docs</option>
                  <option value="drive">Google Drive</option>
                  <option value="keep">Google Keep</option>
                  <option value="sheets">Google Sheets</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resource Name
                </label>
                <input
                  type="text"
                  value={newResource.name}
                  onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                  placeholder="e.g., Project Proposal"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  placeholder="https://docs.google.com/..."
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsAddResourceOpen(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddResource}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
