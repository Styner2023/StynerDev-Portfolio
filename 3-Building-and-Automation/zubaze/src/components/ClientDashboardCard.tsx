/**
 * Client Dashboard Card Component
 * 
 * Displays client information with website thumbnail, actions, and dashboard access
 * Used in Developer Dashboard (Tab A) - the only place with delete functionality
 */

import { useState } from 'react';
import { Client } from '../api/schemas';
import { getWebsiteThumbnail, handleThumbnailError } from '../services/thumbnailService';
import { toast } from 'sonner';

interface ClientDashboardCardProps {
  client: Client;
  projectCount: number;
  dashboardUrl?: string;
  onDelete?: (clientId: string) => void;
}

export default function ClientDashboardCard({
  client,
  projectCount,
  dashboardUrl,
  onDelete,
}: ClientDashboardCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get website URL from client data
  const websiteUrl = client.websiteUrl || '';
  const thumbnailUrl = getWebsiteThumbnail(websiteUrl);

  // Generate full dashboard URL
  const fullDashboardUrl = dashboardUrl 
    ? `${window.location.origin}/client-dashboard/${dashboardUrl}?preview=developer`
    : undefined;

  // Copy share URL to clipboard
  const handleCopyShareUrl = async () => {
    if (!fullDashboardUrl) {
      toast.error('Dashboard URL not available');
      return;
    }

    // Remove preview parameter for client share URL
    const shareUrl = fullDashboardUrl.replace('?preview=developer', '');

    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Share URL copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy URL');
      console.error('Copy failed:', error);
    }
  };

  // Handle delete with confirmation
  const handleDelete = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(client.id);
      toast.success(`Client "${client.name}" deleted successfully`);
      setShowDeleteConfirm(false);
    } catch (error) {
      toast.error('Failed to delete client');
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-all duration-300 group">
        {/* Website Thumbnail - 16:9 Aspect Ratio */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <img
            src={thumbnailUrl}
            alt={`${client.name} website preview`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => handleThumbnailError(e, websiteUrl || client.name)}
            loading="lazy"
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Card Content */}
        <div className="px-4 py-5 sm:p-6">
          {/* Client Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate" title={client.name}>
            {client.name}
          </h3>

          {/* Client Email */}
          {client.email && (
            <p className="text-sm text-gray-600 mb-3 truncate" title={client.email}>
              {client.email}
            </p>
          )}

          {/* Website Name (if different from URL) */}
          {websiteUrl && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Website</p>
              <a
                href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate block"
                title={websiteUrl}
              >
                {websiteUrl.replace(/^https?:\/\//, '').split('/')[0]}
              </a>
            </div>
          )}

          {/* Project Count */}
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <p className="text-sm text-gray-500">
              {projectCount} {projectCount === 1 ? 'project' : 'projects'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {/* View Client Dashboard Button */}
            {fullDashboardUrl ? (
              <a
                href={fullDashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Client Dashboard
              </a>
            ) : (
              <div className="text-sm text-gray-400 text-center py-2">
                Dashboard URL not available
              </div>
            )}

            {/* Copy Share URL Button */}
            {fullDashboardUrl && (
              <button
                onClick={handleCopyShareUrl}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Share URL
              </button>
            )}

            {/* Delete Button (Only in Tab A - Developer Dashboard) */}
            {onDelete && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => !isDeleting && setShowDeleteConfirm(false)}
            />

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Delete Client Dashboard
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete <strong>{client.name}'s</strong> dashboard? 
                      This will remove the client card and their dashboard access. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
