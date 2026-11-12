"use client"

import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Select from "@radix-ui/react-select"
import { useCurrentUser, useAuth } from "../../utils/auth"
import { useApiClient } from "../../api/client"
import { useQueryClient } from "@tanstack/react-query"
import { useClients } from "../../api/hooks/useClients"
import { 
  useDashboardContent,
  useAddTimelineUpdate,
  useUpdateTimelineUpdate,
  useDeleteTimelineUpdate,
  useAddResource,
  useDeleteResource,
  useClientRatings
} from "../../api/hooks/useDashboardContent"
// Tab components are available but not currently used in this implementation
// import DashboardTab from "./tabs/DashboardTab"
// import ActionItemsTab from "./tabs/ActionItemsTab"
// import CalendarTab from "./tabs/CalendarTab"
// import ClientsTab from "./tabs/ClientsTab"
// import InvoicesTab from "./tabs/InvoicesTab"
// import DocumentsTab from "./tabs/DocumentsTab"
// import UpdatesTab from "./tabs/UpdatesTab"

// Small component to fetch and display resource count for a client
const ClientResourceCount = ({ clientId }: { clientId: string }) => {
  const { data } = useDashboardContent(clientId);
  return (
    <p className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
      {data?.resources?.length || 0}
    </p>
  );
};

// Component to display client resources with proper hook usage
const ClientResourcesSection = ({ clientId }: { clientId: string }) => {
  const { data: dashboardData } = useDashboardContent(clientId);
  const deleteResource = useDeleteResource(clientId);
  const resources = dashboardData?.resources || [];
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
        <span className="material-icons text-primary">folder_shared</span>
        Resources Shared
        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full">
          {resources.length}
        </span>
      </label>
      
      {resources.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}>
          {resources.map((resource: any, idx: number) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {resource.resourceType === 'google-docs' && <img src="/assets/google-suit-icons/docs_2020q4_48dp.png" alt="Docs" className="w-5 h-5" />}
                  {resource.resourceType === 'google-sheets' && <img src="/assets/google-suit-icons/sheets_2020q4_48dp.png" alt="Sheets" className="w-5 h-5" />}
                  {resource.resourceType === 'google-slides' && <img src="/assets/google-suit-icons/slides_2020q4_48dp.png" alt="Slides" className="w-5 h-5" />}
                  {resource.resourceType === 'google-drive' && <img src="/assets/google-suit-icons/google-drive.png" alt="Drive" className="w-5 h-5" />}
                  {resource.resourceType === 'google-keep' && <img src="/assets/google-suit-icons/keep_48dp.png" alt="Keep" className="w-5 h-5" />}
                  {resource.resourceType && !resource.resourceType.startsWith('google-') && <span className="material-icons text-primary">link</span>}
                  <h4 className="font-bold text-gray-900 dark:text-white">{resource.title}</h4>
                </div>
                <button
                  onClick={async () => {
                    if (confirm(`Delete resource "${resource.title}"?`)) {
                      try {
                        await deleteResource.mutateAsync(resource.id);
                      } catch (error) {
                        console.error('Failed to delete resource:', error);
                        alert('Failed to delete resource');
                      }
                    }
                  }}
                  className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  title="Delete resource"
                >
                  <span className="material-icons text-sm">delete</span>
                </button>
              </div>
              <div className="inline-flex items-center gap-2 mb-2">
                {resource.resourceType === 'google-docs' && <img src="/assets/google-suit-icons/docs_2020q4_48dp.png" alt="Docs" className="w-5 h-5" />}
                {resource.resourceType === 'google-sheets' && <img src="/assets/google-suit-icons/sheets_2020q4_48dp.png" alt="Sheets" className="w-5 h-5" />}
                {resource.resourceType === 'google-slides' && <img src="/assets/google-suit-icons/slides_2020q4_48dp.png" alt="Slides" className="w-5 h-5" />}
                {resource.resourceType === 'google-drive' && <img src="/assets/google-suit-icons/google-drive.png" alt="Drive" className="w-5 h-5" />}
                {resource.resourceType === 'google-keep' && <img src="/assets/google-suit-icons/keep_48dp.png" alt="Keep" className="w-5 h-5" />}
                {resource.resourceType && !resource.resourceType.startsWith('google-') && <span className="material-icons text-gray-500" style={{ fontSize: '20px' }}>link</span>}
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {resource.resourceType === 'google-docs' ? 'Google Docs' :
                   resource.resourceType === 'google-sheets' ? 'Google Sheets' :
                   resource.resourceType === 'google-slides' ? 'Google Slides' :
                   resource.resourceType === 'google-drive' ? 'Google Drive' :
                   resource.resourceType === 'google-keep' ? 'Google Keep' : 'Link'}
                </span>
              </div>
              {resource.links && resource.links.length > 0 && (
                <div className="space-y-2">
                  {resource.links.map((link: any, linkIdx: number) => (
                    <a
                      key={linkIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span className="material-icons text-xs">open_in_new</span>
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Added {new Date(resource.createdAt).toLocaleDateString()} at {new Date(resource.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-600">
          <span className="material-icons text-4xl text-gray-400 mb-2">folder_open</span>
          <p className="text-sm text-gray-500 dark:text-gray-400">No resources added yet</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Click "Add Resource" on the Updates tab to share files</p>
        </div>
      )}
    </div>
  );
};

const ClientRatingsSection = ({ clientId, clientProjects }: { clientId: string; clientProjects?: any[] }) => {
  const { data: ratingsData, isLoading: isLoadingRatings } = useClientRatings(clientId);
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
        Client Ratings & Feedback
      </label>
      
      {isLoadingRatings ? (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">Loading ratings...</div>
      ) : (
        <div className="space-y-4">
          {/* Website Template Ratings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-icons text-lg">web</span>
              Website Template Ratings
            </h4>
            {ratingsData?.templateRatings && ratingsData.templateRatings.length > 0 ? (
              <div className="space-y-3">
                {ratingsData.templateRatings.map((rating: any) => (
                  <div key={rating.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-3">
                      {rating.templateThumbnail && (
                        <img src={rating.templateThumbnail} alt={rating.templateName} className="w-16 h-16 object-cover rounded border border-gray-300 dark:border-gray-600 flex-shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">{rating.templateName || 'Website Template'}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <img key={i} src="/assets/images/icon/star-green.svg" alt="star" style={{ width: '16px', height: '16px', opacity: i < rating.rating ? 1 : 0.3 }} />
                            ))}
                            <span className="ml-1 text-sm font-bold text-gray-700 dark:text-gray-300">{rating.rating}/5</span>
                          </div>
                        </div>
                        {rating.feedback && <p className="text-xs text-gray-600 dark:text-gray-400 italic mb-1">"{rating.feedback}"</p>}
                        <p className="text-xs text-gray-500">{new Date(rating.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : clientProjects && clientProjects.length > 0 ? (
              <div className="space-y-3">
                {clientProjects.map((project: any) => (
                  <div key={project.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-3">
                      {project.thumbnail && (
                        <img src={project.thumbnail} alt={project.name} className="w-16 h-16 object-cover rounded border border-gray-300 dark:border-gray-600 flex-shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">{project.name}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <img key={i} src="/assets/images/icon/star-green.svg" alt="star" style={{ width: '16px', height: '16px', opacity: 0.3 }} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Not rated yet</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src="/assets/images/icon/star-green.svg" alt="star" style={{ width: '20px', height: '20px', opacity: 0.3 }} />
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">No websites to rate</p>
              </div>
            )}
          </div>

          {/* Developer Performance Ratings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-icons text-lg">person</span>
              Developer Performance Ratings
            </h4>
            {ratingsData?.developerRatings && ratingsData.developerRatings.length > 0 ? (
              <div className="space-y-3">
                {ratingsData.developerRatings.map((rating: any) => (
                  <div key={rating.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">Overall Performance</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <img key={i} src="/assets/images/icon/star-green.svg" alt="star" style={{ width: '16px', height: '16px', opacity: i < rating.rating ? 1 : 0.3 }} />
                        ))}
                        <span className="ml-1 text-sm font-bold text-gray-700 dark:text-gray-300">{rating.rating}/5</span>
                      </div>
                    </div>
                    {rating.feedback && <p className="text-xs text-gray-600 dark:text-gray-400 italic">"{rating.feedback}"</p>}
                    <p className="text-xs text-gray-500 mt-1">{new Date(rating.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src="/assets/images/icon/star-green.svg" alt="star" style={{ width: '20px', height: '20px', opacity: 0.3 }} />
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Not rated yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface Website {
  name: string
  url: string
  adminUrl: string
  thumbnail: string
  category: string
}

export default function DeveloperDashboard2() {
  const user = useCurrentUser()
  const { logout } = useAuth()
  const api = useApiClient()
  const queryClient = useQueryClient()
  const { clients, refetch: refetchClients } = useClients()
  
  // DEBUG: Log clients whenever they change
  console.log('🎯 DeveloperDashboard2 render - clients:', clients?.length || 0, clients)

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard') // dashboard | communication
  
  // ===== DASHBOARD TAB STATE (independent) =====
  // Recent Dashboards section
  const [dashboardRecentCurrentPage, setDashboardRecentCurrentPage] = useState(1)
  const [dashboardRecentItemsPerPage, _setDashboardRecentItemsPerPage] = useState(10)
  // Active Projects section
  const [dashboardActiveCurrentPage, setDashboardActiveCurrentPage] = useState(1)
  const [dashboardActiveItemsPerPage, _setDashboardActiveItemsPerPage] = useState(10)
  // Shared dashboard filters
  const [_dashboardViewMode, _setDashboardViewMode] = useState<'grid' | 'list'>('grid')
  const [dashboardSearchQuery, _setDashboardSearchQuery] = useState('')
  const [dashboardSortBy, _setDashboardSortBy] = useState<'name' | 'date' | 'status'>('date')
  const [dashboardFilterCategory, _setDashboardFilterCategory] = useState<string>('all')
  
  // ===== COMMUNICATION TAB STATE (independent) =====
  const [commCurrentPage, _setCommCurrentPage] = useState(1)
  const [commItemsPerPage, _setCommItemsPerPage] = useState(10)
  const [_commViewMode, _setCommViewMode] = useState<'timeline' | 'list'>('timeline')
  const [commSearchQuery, _setCommSearchQuery] = useState('')
  const [commSortBy, _setCommSortBy] = useState<'date' | 'type' | 'client'>('date')
  const [commFilterType, _setCommFilterType] = useState<string>('all')
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [isClientDetailsOpen, setIsClientDetailsOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedClientName, setEditedClientName] = useState("")
  const [editedClientEmail, setEditedClientEmail] = useState("")
  const [editedClientPhone, setEditedClientPhone] = useState("")
  const [editedClientContactPerson, setEditedClientContactPerson] = useState("")
  const [editedClientProfileImage, setEditedClientProfileImage] = useState("")
  const [editedCategory, setEditedCategory] = useState("Business")
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientContactPerson, setClientContactPerson] = useState("")
  const [dashboardUrl, setDashboardUrl] = useState("")
  const [category, setCategory] = useState("Business")
  const [websites, setWebsites] = useState<Website[]>([])
  const [isCreating, setIsCreating] = useState(false) // Prevent double submissions
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentWebsite, setCurrentWebsite] = useState<Website>({
    name: "",
    url: "",
    adminUrl: "",
    thumbnail: "",
    category: "Business",
  })

  // Project edit states
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null)
  const [editedProjectName, setEditedProjectName] = useState("")
  const [editedProjectUrl, setEditedProjectUrl] = useState("")
  const [editedProjectAdminUrl, setEditedProjectAdminUrl] = useState("")
  const [editedProjectThumbnail, setEditedProjectThumbnail] = useState("")
  const [isFetchingProjectThumbnail, setIsFetchingProjectThumbnail] = useState(false)
  const [isDeletingProject, setIsDeletingProject] = useState(false)
  
  // Add new website to existing client states
  const [isAddingNewWebsite, setIsAddingNewWebsite] = useState(false)
  const [newWebsiteName, setNewWebsiteName] = useState("")
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("")
  const [newWebsiteAdminUrl, setNewWebsiteAdminUrl] = useState("")
  const [newWebsiteThumbnail, setNewWebsiteThumbnail] = useState("")
  const [isFetchingNewWebsiteThumbnail, setIsFetchingNewWebsiteThumbnail] = useState(false)
  const [isAddingWebsiteLoading, setIsAddingWebsiteLoading] = useState(false)
  
  // Card-level edit mode (for Active Project Status cards)
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [editedProjects, setEditedProjects] = useState<any[]>([])
  const [expandedProjectEdit, setExpandedProjectEdit] = useState<number | null>(null)
  const [showRecentSampleCard, setShowRecentSampleCard] = useState(true)
  const [showActiveSampleCard, setShowActiveSampleCard] = useState(true)
  const [showSampleDeleteModal, setShowSampleDeleteModal] = useState(false)
  const [deleteSampleSection, setDeleteSampleSection] = useState<'recent' | 'active' | null>(null)

  // Task management states
  const [tasks, setTasks] = useState<any[]>([])
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [taskStatus, setTaskStatus] = useState('todo')
  const [taskAssignType, setTaskAssignType] = useState<'client' | 'project'>('client')
  const [taskAssignedTo, setTaskAssignedTo] = useState('')
  const [taskLinks, setTaskLinks] = useState<{type: string, name: string, url: string}[]>([])
  const [currentTaskLinkType, setCurrentTaskLinkType] = useState('google-docs')
  const [currentTaskLinkName, setCurrentTaskLinkName] = useState('')
  const [currentTaskLinkUrl, setCurrentTaskLinkUrl] = useState('')
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  // Invoice states - NO localStorage, DFINITY only
  const [invoices, setInvoices] = useState<any[]>([])
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState('')
  const [invoiceAmount, setInvoiceAmount] = useState('')
  const [invoiceStatus, setInvoiceStatus] = useState('pending')
  const [invoiceDescription, setInvoiceDescription] = useState('')
  const [invoiceDueDate, setInvoiceDueDate] = useState('')
  const [invoiceItems, setInvoiceItems] = useState<{description: string, amount: number}[]>([{description: '', amount: 0}])
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null)

  // Document states
  const [_documents, _setDocuments] = useState<any[]>([])
  const [_isDocumentModalOpen, _setIsDocumentModalOpen] = useState(false)
  const [_uploadingDocument, _setUploadingDocument] = useState(false)
  const [_documentFile, _setDocumentFile] = useState<File | null>(null)
  const [_documentClientId, _setDocumentClientId] = useState('')

  // Project Communication states
  const [selectedProjectForComm, setSelectedProjectForComm] = useState<any>(null)
  const [isCommCardExpanded, setIsCommCardExpanded] = useState(true) // Collapsible card state
  const [updateType, setUpdateType] = useState('update') // update | action-item | note
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateContent, setUpdateContent] = useState('')
  const [actionItems, setActionItems] = useState<string[]>([])
  const [currentActionItem, setCurrentActionItem] = useState('')
  const [resourceType, setResourceType] = useState('google-docs')
  const [resourceTitle, setResourceTitle] = useState('')
  const [resourceUrl, setResourceUrl] = useState('')
  const [resourceLinks, setResourceLinks] = useState<{name: string, url: string}[]>([])
  const [currentLinkName, setCurrentLinkName] = useState('')
  const [currentLinkUrl, setCurrentLinkUrl] = useState('')
  const [lastSavedUpdate, setLastSavedUpdate] = useState<{type: string, title: string, content: string} | null>(null)
  const [lastSavedResource, setLastSavedResource] = useState<{type: string, title: string, links: any[]} | null>(null)
  const [showUpdateForm, setShowUpdateForm] = useState(true)
  const [showResourceForm, setShowResourceForm] = useState(true)

  // Dashboard Content API hooks
  const { data: dashboardContent } = useDashboardContent(selectedProjectForComm?.id || '')
  const { data: clientRatings } = useClientRatings(selectedProjectForComm?.id || '')
  const addTimelineUpdate = useAddTimelineUpdate(selectedProjectForComm?.id || '')
  const updateTimelineUpdate = useUpdateTimelineUpdate(selectedProjectForComm?.id || '')
  const deleteTimelineUpdate = useDeleteTimelineUpdate(selectedProjectForComm?.id || '')
  const addResource = useAddResource(selectedProjectForComm?.id || '')
  const deleteResource = useDeleteResource(selectedProjectForComm?.id || '')

  const addWebsite = () => {
    if (currentWebsite.name && currentWebsite.url) {
      setWebsites([...websites, currentWebsite])
      setCurrentWebsite({
        name: "",
        url: "",
        adminUrl: "",
        thumbnail: "",
        category: "Business",
      })
    }
  }

  const handleFetchThumbnail = async () => {
    if (!currentWebsite.url) {
      alert('Please enter a website URL first');
      return;
    }

    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    try {
      // First, get the og:image from the website
      const response = await fetch(`${apiBase}/fetch-thumbnail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: currentWebsite.url })
      });
      const data = await response.json();

      if (data.success && data.thumbnail) {
        console.log('✅ Thumbnail fetched:', data.thumbnail);
        // Proxy R2 URLs through backend to avoid CORS
        const proxiedUrl = data.thumbnail.includes('r2.dev') 
          ? `${apiBase}/proxy-image?url=${encodeURIComponent(data.thumbnail)}`
          : data.thumbnail;
        setCurrentWebsite({ ...currentWebsite, thumbnail: proxiedUrl });
      } else {
        alert('⚠️ No thumbnail found. Please upload an image or paste an image URL.');
      }
    } catch (error) {
      console.error('❌ Fetch thumbnail error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      alert(`❌ Error fetching thumbnail: ${errorMsg}\n\n� Backend URL: ${apiBase}\n💡 Check browser console for details.`);
    }
  }

  const handleThumbnailFileUpload = async (file: File | null) => {
    if (!file) return;

    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

    // Convert file to base64 for upload
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;

      try {
        // Upload to DFINITY blob storage
        const uploadResponse = await fetch(`${apiBase}/upload-thumbnail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64Data: base64String,
            filename: file.name,
            contentType: file.type,
            userId: user?.id || 'anonymous'
          })
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.success && uploadData.assetId) {
          // ✅ CRITICAL FIX: Use DFINITY URL, NOT base64 data
          const dfinityThumbnailUrl = uploadData.url ? `${apiBase}${uploadData.url}` : `${apiBase}/thumbnail/${uploadData.assetId}`;
          console.log("✅ Thumbnail uploaded to DFINITY:", uploadData.assetId);
          console.log("🔗 Using DFINITY URL (not base64):", dfinityThumbnailUrl);
          setCurrentWebsite({ ...currentWebsite, thumbnail: dfinityThumbnailUrl });
        } else {
          // Fallback to base64 if upload fails - backend will handle it
          console.warn("⚠️ DFINITY upload failed, using base64 (backend will upload)");
          setCurrentWebsite({ ...currentWebsite, thumbnail: base64String });
        }
      } catch (error) {
        console.error('❌ Upload error:', error);
        // Fallback to base64 (will be filtered out before API call)
        console.warn("⚠️ Error during upload, using base64 fallback (will be filtered)");
        setCurrentWebsite({ ...currentWebsite, thumbnail: base64String });
      }
    };
    reader.readAsDataURL(file);
  }

  const handleCreateDashboard = async () => {
    if (!user?.id || !clientName || !clientEmail) {
      alert('Please fill in client name and email');
      return;
    }

    if (isCreating) {
      console.log('⚠️ Already creating dashboard, ignoring duplicate click');
      return;
    }

    setIsCreating(true);

    // Auto-add website from form if fields are filled but not added to list
    let finalProjects = [...websites];
    if (currentWebsite.name && currentWebsite.url && websites.length === 0) {
      finalProjects = [currentWebsite];
      console.log('✨ Auto-adding website from form fields:', currentWebsite);
    }

    if (finalProjects.length === 0) {
      const proceed = confirm('⚠️ Warning: You haven\'t added any websites yet!\n\nThe client dashboard will be empty until you add websites.\n\nDo you want to continue anyway?');
      if (!proceed) {
        setIsCreating(false);
        return;
      }
    }

    console.log('📦 Creating dashboard with websites:', finalProjects);
    console.log('📊 Number of websites:', finalProjects.length);
    finalProjects.forEach((proj, i) => {
      console.log(`Website ${i + 1}:`, proj);
    });

    // ✅ FIX: Keep ALL thumbnails - DFINITY can handle them
    // If thumbnail is base64, it will be uploaded by backend
    // If thumbnail is URL, it will be stored as-is
    const projectsForAPI = finalProjects.map(proj => ({
      ...proj,
      thumbnail: proj.thumbnail // Keep ALL thumbnails
    }));
    
    console.log('📤 Projects prepared for API (thumbnails filtered):', projectsForAPI.length);
    console.log('🎯 DEBUG - First project for API:', JSON.stringify(projectsForAPI[0], null, 2));

    // Auto-generate dashboard URL if not provided
    let generatedDashboardUrl = dashboardUrl;
    if (!generatedDashboardUrl) {
      // Generate URL from client name: "John Doe Company" -> "john-doe-company-dashboard"
      // Remove ALL special characters including colons, slashes, etc.
      const baseUrl = clientName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove ALL special characters (including : / \ etc)
        .trim() // Remove leading/trailing spaces
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

      // CRITICAL: Add timestamp to make URL globally unique and prevent collisions
      // This ensures if "john-dashboard" is deleted, a new "John" gets "john-1234567890-dashboard"
      const timestamp = Date.now();
      
      // Add suffix if not empty
      if (baseUrl) {
        generatedDashboardUrl = `${baseUrl}-${timestamp}-dashboard`;
      } else {
        // Fallback if name had only special characters
        generatedDashboardUrl = `client-${timestamp}-dashboard`;
      }

      console.log('🔗 Generated dashboard URL:', generatedDashboardUrl, 'from name:', clientName, '(timestamp:', timestamp, ')');
    }

    // Call the backend API to create the client
    console.log('🔄 Calling API to create client dashboard...');
    console.log('📡 API Base URL:', import.meta.env.VITE_API_BASE_URL);

    // Use first project's thumbnail image URL as the client's website thumbnail
    // And save the actual website URL for clicking
    // CRITICAL: Only set these if project has VALID URLs (not placeholders or empty)
    let websiteUrl: string | undefined = undefined;
    let originalWebsiteUrl: string | undefined = undefined;
    
    if (finalProjects.length > 0) {
      const firstProject = finalProjects[0];
      // Only use thumbnail if it's a real URL (not placeholder, not empty, not just "#")
      if (firstProject.thumbnail && 
          firstProject.thumbnail !== '' && 
          firstProject.thumbnail !== '#' && 
          !firstProject.thumbnail.includes('default-thumbnail')) {
        websiteUrl = firstProject.thumbnail;
      }
      // Only use URL if it's real (not empty, not just "#")
      if (firstProject.url && 
          firstProject.url !== '' && 
          firstProject.url !== '#') {
        originalWebsiteUrl = firstProject.url;
      }
    }

    console.log('🖼️ Thumbnail URL (websiteUrl):', websiteUrl);
    console.log('🌐 Actual Website URL (originalWebsiteUrl):', originalWebsiteUrl);

    // Shorten thumbnail URL if it's too long for display purposes (but keep the original website URL)
    // DFINITY can handle long URLs, this is just for better UX
    if (websiteUrl && websiteUrl.length > 100) {
      try {
        console.log('🔗 Thumbnail URL too long, attempting to shorten with is.gd...');
        const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(websiteUrl)}`);
        const data = await response.json();
        if (data.shorturl) {
          websiteUrl = data.shorturl;
          console.log('✅ Shortened thumbnail URL:', websiteUrl);
        } else {
          console.warn('⚠️ URL shortener response:', data);
          console.log('💡 Using original thumbnail URL instead');
        }
      } catch (error) {
        console.warn('⚠️ URL shortening failed, using original thumbnail URL:', error);
      }
    }

    console.log('🖼️ Final websiteUrl (thumbnail) to send:', websiteUrl);
    console.log('🌐 Final originalWebsiteUrl (clickable) to send:', originalWebsiteUrl);

    // CRITICAL FIX: Ensure we wait a moment for any pending operations
    // This prevents browser from cancelling the request
    await new Promise(resolve => setTimeout(resolve, 100));

    const requestBody = {
      name: clientName,
      email: clientEmail,
      phone: clientPhone || undefined,
      contactPerson: clientContactPerson || undefined,
      // profileImage: clientProfileImage || undefined, // Skip profile image on creation to prevent timeouts
      dashboardUrl: generatedDashboardUrl,
      websiteUrl: websiteUrl, // Thumbnail image URL for display
      originalWebsiteUrl: originalWebsiteUrl, // Actual website URL for clicking
      category: category.toLowerCase(),
      developerId: user.id,
      projects: projectsForAPI  // Use filtered projects without base64 thumbnails
    };

    console.log('📦 Request body size:', JSON.stringify(requestBody).length, 'bytes');
    console.log('📦 Request body:', JSON.stringify(requestBody, null, 2));

    api.post('/clients', requestBody).then(result => {
      if (result.ok) {
        console.log("✅ Created client dashboard:", result.data);
        console.log('📊 Total websites added:', finalProjects.length);
        console.log('🎯 DEBUG - Created client projects:', JSON.stringify((result.data as any)?.projects, null, 2));

        // Show success message with the dashboard URL
        const fullUrl = `${window.location.origin}/client-dashboard/${generatedDashboardUrl}`;
        alert(`✅ Client dashboard created successfully!
        
Client: ${clientName}
Dashboard URL: ${fullUrl}

The client can now access their dashboard at this URL.`);

        setIsDialogOpen(false);
        setClientName('');
        setClientEmail('');
        setClientPhone('');
        setClientContactPerson('');
        setDashboardUrl('');
        setCategory('Business');
        setWebsites([]);
        setCurrentWebsite({
          name: '',
          url: '',
          adminUrl: '',
          thumbnail: '',
          category: 'Business',
        });

        // 1. Instantly add to the list (optimistic update)
        if (result.data) {
          queryClient.setQueryData<any[]>(['clients'], (old) => {
            // Ensure old is always an array
            const oldArray = Array.isArray(old) ? old : [];
            const clientData = result.data as any;
            const exists = oldArray.some((c: any) => c.id === clientData?.id);
            if (exists) {
              return oldArray;
            }
            return [...oldArray, clientData];
          });
        }

        // 2. Mark list as stale so it re-fetches in background
        // Add small delay for DFINITY canister propagation
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['clients'] });
          queryClient.invalidateQueries({ queryKey: ['projects'] });
          refetchClients(); // Force refetch
        }, 600); // 600ms is usually enough for DFINITY
      } else {
        console.error('❌ API Error:', result.error);
        const errorMsg = result.error || 'Unknown error';

        // Provide helpful debugging info
        let helpText = '';
        if (errorMsg.includes('Not authenticated')) {
          helpText = '\n\n💡 You need to sign in with Auth0 first. Click "Sign In" in the header.';
        } else if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError')) {
          helpText = '\n\n💡 Cannot reach backend server. Check:\n- Railway deployment status\n- VITE_API_BASE_URL in environment variables\n- Network connection';
        } else if (errorMsg.includes('401') || errorMsg.includes('Unauthorized')) {
          helpText = '\n\n💡 Session expired. Please sign in again.';
        }

        alert(`❌ Failed to create client dashboard\n\nError: ${errorMsg}${helpText}`);
      }
    }).catch(error => {
      console.error('❌ Network Error:', error);
      
      if (error.name === 'AbortError' || error.message?.includes('timeout')) {
        const shouldRetry = window.confirm(
          '❌ Request Timeout\n\n' +
          'The server took too long to respond (>60 seconds).\n\n' +
          'This usually means:\n' +
          '1. DFINITY canister is slow or out of cycles\n' +
          '2. Network connection is unstable\n' +
          '3. Server is overloaded\n\n' +
          'Would you like to retry?'
        );
        if (shouldRetry) {
          console.log('🔄 Retrying client creation...');
          // Reset creating state and let user try again
          setIsCreating(false);
          return;
        }
      } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError') || error.message?.includes('interrupted')) {
        const shouldRetry = window.confirm(
          '❌ Network Error - Request Interrupted\n\n' +
          'The network request was interrupted. This can happen if:\n' +
          '• Browser tab became inactive during the request\n' +
          '• Computer went to sleep\n' +
          '• Network connection was unstable\n' +
          '• Ad blocker or browser extension interfered\n\n' +
          '💡 TIP: Keep this tab active and try again.\n\n' +
          'Would you like to retry?'
        );
        if (shouldRetry) {
          console.log('🔄 Retrying client creation...');
          setIsCreating(false);
          return;
        }
      } else {
        alert(`❌ Failed to create client dashboard\n\nError: ${error.message || 'Unknown error'}\n\nPlease try again.`);
      }
    }).finally(() => {
      setIsCreating(false);
    });
  }

  const handleUpdateClient = async () => {
    if (!selectedClient || !editedClientName || !editedClientEmail) {
      alert('Please fill in all required fields');
      return;
    }

    setIsUpdating(true);

    try {
      console.log('📝 Updating client:', selectedClient.id);

      const result = await api.patch(`/clients/${selectedClient.id}`, {
        name: editedClientName,
        email: editedClientEmail,
        phone: editedClientPhone || undefined,
        contactPerson: editedClientContactPerson || undefined,
        profileImage: editedClientProfileImage || undefined,
        category: editedCategory,
      });

      if (result.ok) {
        console.log('✅ Client updated successfully');
        alert(`✅ Client "${editedClientName}" updated successfully!`);

        // Update selectedClient with new values immediately
        setSelectedClient({
          ...selectedClient,
          name: editedClientName,
          email: editedClientEmail,
          phone: editedClientPhone || undefined,
          contactPerson: editedClientContactPerson || undefined,
          profileImage: editedClientProfileImage || undefined,
          category: editedCategory,
        });

        // Update local state
        queryClient.invalidateQueries({ queryKey: ['clients'] });
        refetchClients();

        // Exit edit mode but keep modal open to show updated values
        setIsEditMode(false);
        setEditedClientPhone('');
        setEditedClientContactPerson('');
        setEditedClientProfileImage('');
      } else {
        console.error('❌ Update failed:', result.error);
        alert(`❌ Failed to update client: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Update error:', error);
      alert('❌ Failed to update client. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateProject = async () => {
    if (!selectedClient || editingProjectIndex === null || !editedProjectName || !editedProjectUrl) {
      alert('Please fill in required fields (Name and URL)');
      return;
    }

    setIsUpdating(true);

    try {
      console.log('📝 Updating project at index:', editingProjectIndex);

      // Update the project in the projects array
      const updatedProjects = [...selectedClient.projects];
      updatedProjects[editingProjectIndex] = {
        ...updatedProjects[editingProjectIndex],
        name: editedProjectName,
        url: editedProjectUrl,
        adminUrl: editedProjectAdminUrl,
        thumbnail: editedProjectThumbnail,
      };

      // Call API to update the client with new projects array
      const result = await api.patch(`/clients/${selectedClient.id}`, {
        projects: updatedProjects,
      });

      if (result.ok) {
        console.log('✅ Project updated successfully');
        alert(`✅ Project "${editedProjectName}" updated successfully!`);

        // Update local state
        queryClient.invalidateQueries({ queryKey: ['clients'] });
        refetchClients();

        // Exit project edit mode
        setEditingProjectIndex(null);
        setEditedProjectName("");
        setEditedProjectUrl("");
        setEditedProjectAdminUrl("");
        setEditedProjectThumbnail("");
      } else {
        console.error('❌ Update failed:', result.error);
        alert(`❌ Failed to update project: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Update error:', error);
      alert('❌ Failed to update project. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handler to delete a specific website/project from a client
  const handleDeleteProject = async (projectIndex: number, projectName: string) => {
    if (!selectedClient) return;
    
    const confirmed = confirm(`Are you sure you want to delete "${projectName}"?\n\nThis will remove this website from the client's dashboard.`);
    if (!confirmed) return;

    setIsDeletingProject(true);

    try {
      console.log('🗑️ Deleting project at index:', projectIndex, 'from client:', selectedClient.id);

      // Remove the project from the array
      const updatedProjects = selectedClient.projects.filter((_: any, idx: number) => idx !== projectIndex);

      console.log('📦 Updated projects array (after deletion):', updatedProjects);

      // Call API to update the client with the new projects array
      const result = await api.patch(`/clients/${selectedClient.id}`, {
        projects: updatedProjects,
      });

      if (result.ok) {
        console.log('✅ Project deleted successfully');
        alert(`✅ Website "${projectName}" deleted successfully!`);

        // Update selectedClient with removed project
        setSelectedClient({
          ...selectedClient,
          projects: updatedProjects,
        });

        // Refresh clients data
        queryClient.invalidateQueries({ queryKey: ['clients'] });
        refetchClients();
      } else {
        console.error('❌ Delete failed:', result.error);
        alert(`❌ Failed to delete website: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Delete error:', error);
      alert('❌ Failed to delete website. Please try again.');
    } finally {
      setIsDeletingProject(false);
    }
  };

  const handleFetchProjectThumbnail = async () => {
    if (!editedProjectUrl) {
      alert('Please enter a website URL first');
      return;
    }

    setIsFetchingProjectThumbnail(true);

    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    try {
      const response = await fetch(`${apiBase}/fetch-thumbnail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: editedProjectUrl })
      });
      const data = await response.json();

      if (data.success && data.thumbnail) {
        setEditedProjectThumbnail(data.thumbnail);
        console.log('✅ Thumbnail fetched for project edit');
      } else {
        console.error('❌ Failed to fetch thumbnail');
        alert('Could not fetch thumbnail. You can still enter a custom URL.');
      }
    } catch (error) {
      console.error('❌ Thumbnail fetch error:', error);
      alert('Failed to fetch thumbnail. Please try again or enter manually.');
    } finally {
      setIsFetchingProjectThumbnail(false);
    }
  };

  // Handler to fetch thumbnail for new website being added to existing client
  const handleFetchNewWebsiteThumbnail = async () => {
    if (!newWebsiteUrl) {
      alert('Please enter a website URL first');
      return;
    }

    setIsFetchingNewWebsiteThumbnail(true);

    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    try {
      const response = await fetch(`${apiBase}/fetch-thumbnail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newWebsiteUrl })
      });
      const data = await response.json();

      if (data.success && data.thumbnail) {
        setNewWebsiteThumbnail(data.thumbnail);
        console.log('✅ Thumbnail fetched for new website');
      } else {
        console.error('❌ Failed to fetch thumbnail');
        // Generate screenshot URL as fallback
        const websiteToCapture = newWebsiteUrl.startsWith('http') ? newWebsiteUrl : `https://${newWebsiteUrl}`;
        const screenshotUrl = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
        setNewWebsiteThumbnail(screenshotUrl);
        console.log('📷 Using screenshot service as fallback');
      }
    } catch (error) {
      console.error('❌ Thumbnail fetch error:', error);
      // Generate screenshot URL as fallback
      const websiteToCapture = newWebsiteUrl.startsWith('http') ? newWebsiteUrl : `https://${newWebsiteUrl}`;
      const screenshotUrl = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
      setNewWebsiteThumbnail(screenshotUrl);
      console.log('📷 Using screenshot service as fallback');
    } finally {
      setIsFetchingNewWebsiteThumbnail(false);
    }
  };

  // Handler to add new website to existing client
  const handleAddNewWebsiteToClient = async () => {
    if (!selectedClient || !newWebsiteName || !newWebsiteUrl) {
      alert('Please fill in the website name and URL');
      return;
    }

    setIsAddingWebsiteLoading(true);

    try {
      console.log('➕ Adding new website to client:', selectedClient.id);

      // Generate thumbnail if not already set
      let thumbnailToUse = newWebsiteThumbnail;
      if (!thumbnailToUse) {
        const websiteToCapture = newWebsiteUrl.startsWith('http') ? newWebsiteUrl : `https://${newWebsiteUrl}`;
        thumbnailToUse = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
      }

      // Create new project object with all required fields
      const newProject = {
        id: `project_${Date.now()}`,
        name: newWebsiteName,
        url: newWebsiteUrl.startsWith('http') ? newWebsiteUrl : `https://${newWebsiteUrl}`,
        adminUrl: newWebsiteAdminUrl || newWebsiteUrl,
        thumbnail: thumbnailToUse,
        type: 'website',
        status: 'active',
        category: selectedClient.category || 'Business',
        developerId: selectedClient.developerId || user?.id, // Required for DFINITY
        clientId: selectedClient.id, // Link to client
      };

      console.log('📦 New project data:', newProject);
      console.log('📦 Updated projects array:', [...(selectedClient.projects || []), newProject]);

      // Add to existing projects array
      const updatedProjects = [...(selectedClient.projects || []), newProject];

      // Call API to update the client with new projects array
      console.log('🔄 Calling PATCH /clients/' + selectedClient.id);
      const result = await api.patch(`/clients/${selectedClient.id}`, {
        projects: updatedProjects,
      });

      console.log('📡 API Response:', result);

      if (result.ok) {
        console.log('✅ New website added successfully');
        alert(`✅ Website "${newWebsiteName}" added successfully!`);

        // Update selectedClient with new project
        setSelectedClient({
          ...selectedClient,
          projects: updatedProjects,
        });

        // Clear form and close add website mode
        setIsAddingNewWebsite(false);
        setNewWebsiteName("");
        setNewWebsiteUrl("");
        setNewWebsiteAdminUrl("");
        setNewWebsiteThumbnail("");

        // Refresh clients data
        queryClient.invalidateQueries({ queryKey: ['clients'] });
        refetchClients();
      } else {
        console.error('❌ Failed to add website:', result.error);
        alert(`❌ Failed to add website: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Add website error:', error);
      alert('❌ Failed to add website. Please try again.');
    } finally {
      setIsAddingWebsiteLoading(false);
    }
  };

  const handleDeleteClient = async (clientId: string, clientName: string) => {
    const confirmed = confirm(`Are you sure you want to delete "${clientName}"?\n\nThis will:\n• Remove the client dashboard\n• Delete all associated data\n• This action cannot be undone`);

    if (!confirmed) return;

    try {
      console.log('🗑️ Deleting client:', clientId);

      // Optimistically update UI BEFORE API call
      queryClient.setQueryData<any[]>(['clients'], (old) => {
        const oldArray = Array.isArray(old) ? old : [];
        return oldArray.filter((c: any) => c.id !== clientId);
      });

      const result = await api.delete(`/clients/${clientId}`);

      if (result.ok) {
        console.log('✅ Client deleted successfully');
        alert(`✅ Client "${clientName}" deleted successfully!`);

        // Force immediate refetch
        await refetchClients();
        queryClient.invalidateQueries({ queryKey: ['clients'] });
      } else {
        console.error('❌ Delete failed:', result.error);
        alert(`❌ Failed to delete client: ${result.error || 'Unknown error'}`);
        
        // Rollback on failure - refetch to restore
        await refetchClients();
      }
    } catch (error) {
      console.error('❌ Delete error:', error);
      alert('❌ Failed to delete client. Please try again.');
      
      // Rollback on error - refetch to restore
      await refetchClients();
    }
  }

  // ===== PAGINATION HELPER FUNCTIONS =====
  // Recent Dashboards section pagination
  const getRecentDashboardPaginatedClients = () => {
    console.log('🔍 getRecentDashboardPaginatedClients called');
    console.log('📊 Total clients:', clients?.length || 0);
    console.log('📋 Clients data:', clients);
    
    if (!clients || clients.length === 0) {
      console.log('⚠️ No clients found - returning empty array');
      return [];
    }
    
    // Filter clients (search, category, etc.)
    let filtered = clients.filter((client: any) => {
      // Show all clients
      
      // Search filter
      if (dashboardSearchQuery) {
        const query = dashboardSearchQuery.toLowerCase();
        return (
          client.name?.toLowerCase().includes(query) ||
          client.email?.toLowerCase().includes(query) ||
          client.category?.toLowerCase().includes(query)
        );
      }
      
      // Category filter
      if (dashboardFilterCategory !== 'all') {
        return client.category === dashboardFilterCategory;
      }
      
      return true;
    });
    
    // Sort
    if (dashboardSortBy === 'name') {
      filtered.sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
    } else if (dashboardSortBy === 'date') {
      filtered.sort((a: any, b: any) => {
        const dateA = a.createdAt || 0;
        const dateB = b.createdAt || 0;
        return dateB - dateA; // Newest first
      });
    }
    
    // Paginate
    const startIndex = (dashboardRecentCurrentPage - 1) * dashboardRecentItemsPerPage;
    const endIndex = startIndex + dashboardRecentItemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };
  
  const getTotalRecentDashboardPages = () => {
    if (!clients || clients.length === 0) return 1;
    const filtered = clients.filter((client: any) => {
      if (dashboardSearchQuery) {
        const query = dashboardSearchQuery.toLowerCase();
        return (
          client.name?.toLowerCase().includes(query) ||
          client.email?.toLowerCase().includes(query) ||
          client.category?.toLowerCase().includes(query)
        );
      }
      if (dashboardFilterCategory !== 'all') {
        return client.category === dashboardFilterCategory;
      }
      return true;
    });
    return Math.ceil(filtered.length / dashboardRecentItemsPerPage);
  };
  
  // Active Project Status section pagination
  const getActiveDashboardPaginatedClients = () => {
    if (!clients || clients.length === 0) return [];
    
    // Filter clients (same logic as recent)
    let filtered = clients.filter((client: any) => {
      
      if (dashboardSearchQuery) {
        const query = dashboardSearchQuery.toLowerCase();
        return (
          client.name?.toLowerCase().includes(query) ||
          client.email?.toLowerCase().includes(query) ||
          client.category?.toLowerCase().includes(query)
        );
      }
      
      if (dashboardFilterCategory !== 'all') {
        return client.category === dashboardFilterCategory;
      }
      
      return true;
    });
    
    // Sort
    if (dashboardSortBy === 'name') {
      filtered.sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
    } else if (dashboardSortBy === 'date') {
      filtered.sort((a: any, b: any) => {
        const dateA = a.createdAt || 0;
        const dateB = b.createdAt || 0;
        return dateB - dateA;
      });
    }
    
    // Paginate
    const startIndex = (dashboardActiveCurrentPage - 1) * dashboardActiveItemsPerPage;
    const endIndex = startIndex + dashboardActiveItemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };
  
  const getTotalActiveDashboardPages = () => {
    if (!clients || clients.length === 0) return 1;
    const filtered = clients.filter((client: any) => {
      if (dashboardSearchQuery) {
        const query = dashboardSearchQuery.toLowerCase();
        return (
          client.name?.toLowerCase().includes(query) ||
          client.email?.toLowerCase().includes(query) ||
          client.category?.toLowerCase().includes(query)
        );
      }
      if (dashboardFilterCategory !== 'all') {
        return client.category === dashboardFilterCategory;
      }
      return true;
    });
    return Math.ceil(filtered.length / dashboardActiveItemsPerPage);
  };
  
  // Communication tab pagination
  // @ts-expect-error - Reserved for future Communication tab pagination feature
  const _getCommPaginatedUpdates = () => {
    if (!dashboardContent?.updates || dashboardContent.updates.length === 0) return [];
    
    let filtered = dashboardContent.updates.filter((update: any) => {
      // Filter by type
      if (commFilterType !== 'all' && update.type !== commFilterType) return false;
      
      // Search filter
      if (commSearchQuery) {
        const query = commSearchQuery.toLowerCase();
        return (
          update.title?.toLowerCase().includes(query) ||
          update.content?.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
    
    // Sort
    if (commSortBy === 'date') {
      filtered.sort((a: any, b: any) => {
        const dateA = a.createdAt || 0;
        const dateB = b.createdAt || 0;
        return dateB - dateA;
      });
    }
    
    // Paginate
    const startIndex = (commCurrentPage - 1) * commItemsPerPage;
    const endIndex = startIndex + commItemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };
  
  // @ts-expect-error - Reserved for future Communication tab pagination feature
  const _getTotalCommPages = () => {
    if (!dashboardContent?.updates || dashboardContent.updates.length === 0) return 1;
    const filtered = dashboardContent.updates.filter((update: any) => {
      if (commFilterType !== 'all' && update.type !== commFilterType) return false;
      if (commSearchQuery) {
        const query = commSearchQuery.toLowerCase();
        return (
          update.title?.toLowerCase().includes(query) ||
          update.content?.toLowerCase().includes(query)
        );
      }
      return true;
    });
    return Math.ceil(filtered.length / commItemsPerPage);
  };


  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex h-screen bg-background-light dark:bg-background-dark font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-card-light dark:bg-card-dark flex flex-col py-6 px-4 shadow-lg">
          <div className="flex items-center justify-center mb-8 px-2">
            <img
              src="/assets/images/logo/logo-dark.svg"
              alt="Zubaze"
              className="h-10 dark:hidden"
            />
            <img
              src="/assets/images/logo/logo-white.svg"
              alt="Zubaze"
              className="h-10 hidden dark:block"
            />
          </div>

          <nav className="flex flex-col space-y-2">
            <button 
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                activeTab === 'dashboard' 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="material-icons">dashboard</span>
              <span className="font-medium">Dashboard</span>
            </button>
            <button 
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                activeTab === 'communication' 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('communication')}
            >
              <span className="material-icons">forum</span>
              <span className="font-medium">Action Items</span>
            </button>
            <button
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                activeTab === 'calendar' 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('calendar')}
            >
              <span className="material-icons">calendar_today</span>
              <span className="font-medium">Calendar</span>
            </button>
            <button
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                activeTab === 'clients' 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('clients')}
            >
              <span className="material-icons">people_alt</span>
              <span className="font-medium">Clients</span>
            </button>
            <button
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                activeTab === 'invoices' 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('invoices')}
            >
              <span className="material-icons">request_quote</span>
              <span className="font-medium">Invoices</span>
            </button>
            <button
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                activeTab === 'analytics' 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              <span className="material-icons">analytics</span>
              <span className="font-medium">Analytics</span>
            </button>
            <button
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                activeTab === 'updates' 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('updates')}
            >
              <span className="material-icons">autorenew</span>
              <span className="font-medium">Updates</span>
            </button>
            <button
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                activeTab === 'payments' 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('payments')}
            >
              <span className="material-icons">payments</span>
              <span className="font-medium">Payments</span>
            </button>
          </nav>

          <div className="mt-auto space-y-3">
            {/* User Profile Section */}
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="material-icons text-white text-xl">person</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-text-light-primary dark:text-text-dark-primary truncate">
                    {user?.name || 'Developer'}
                  </p>
                  <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary truncate">
                    {user?.email || 'developer@zubaze.com'}
                  </p>
                </div>
              </div>
              <button
                className="w-full flex items-center justify-center gap-2 p-2.5 text-white rounded-lg cursor-pointer transition-colors font-medium"
                style={{ backgroundColor: '#1E2939' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a3f57'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E2939'}
                onClick={() => logout()}
              >
                <span className="material-icons text-lg">logout</span>
                <span>Logout</span>
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              className="w-full flex items-center justify-center gap-2 p-3 text-text-light-secondary dark:text-text-dark-secondary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <span className="material-icons">{isDarkMode ? "light_mode" : "dark_mode"}</span>
              <span className="font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
              {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'communication' ? 'Action Items' : activeTab === 'calendar' ? 'Calendar' : activeTab === 'clients' ? 'Clients' : activeTab === 'invoices' ? 'Invoices' : activeTab === 'analytics' ? 'Analytics' : activeTab === 'updates' ? 'Updates' : activeTab === 'payments' ? 'Payments' : 'Dashboard'}
            </h1>
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              {activeTab === 'dashboard' && (
                <Dialog.Trigger asChild>
                  <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-primary/90 transition-colors">
                    Add New Dashboard
                  </button>
                </Dialog.Trigger>
              )}
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden z-50 animate-in zoom-in-95 duration-200">
                  <div className="sticky top-0 bg-gradient-to-r from-primary to-primary/80 px-8 py-6 border-b border-primary/20">
                    <Dialog.Title className="text-3xl font-bold text-white flex items-center gap-3">
                      <span className="material-icons text-4xl">dashboard_customize</span>
                      Create Client Dashboard
                    </Dialog.Title>
                    <p className="text-white/80 mt-2 text-sm">Set up a personalized dashboard for your client</p>
                  </div>

                  <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}>
                    <div className="space-y-10">
                      {/* Client Name */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>person</span>
                          <span>Client Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter client name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                        />
                      </div>

                      {/* Client Email */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>email</span>
                          <span>Client Email</span>
                        </label>
                        <input
                          type="email"
                          placeholder="client@example.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                        />
                      </div>

                      {/* Client Phone */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>phone</span>
                          <span>Phone Number</span>
                          <span className="ml-auto text-xs text-gray-500 font-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                        />
                      </div>

                      {/* Best Person to Contact */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>contact_phone</span>
                          <span>Best Person to Contact</span>
                          <span className="ml-auto text-xs text-gray-500 font-normal">(optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., John Doe (CEO)"
                          value={clientContactPerson}
                          onChange={(e) => setClientContactPerson(e.target.value)}
                          className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                        />
                      </div>



                      {/* Dashboard URL */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>link</span>
                          <span>Dashboard URL</span>
                          <span className="ml-auto text-xs text-gray-500 font-normal">(optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Leave empty to auto-generate"
                          value={dashboardUrl}
                          onChange={(e) => setDashboardUrl(e.target.value)}
                          className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                        />
                      </div>

                      {/* Category */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>category</span>
                          <span>Category</span>
                        </label>
                        <Select.Root value={category} onValueChange={setCategory}>
                          <Select.Trigger className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white flex justify-between items-center transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
                            <Select.Value />
                            <Select.Icon>
                              <span className="material-icons text-lg text-gray-400">expand_more</span>
                            </Select.Icon>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                              <Select.Viewport className="p-2">
                                <Select.Item
                                  value="Business"
                                  className="px-4 py-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white rounded-lg transition-colors outline-none"
                                >
                                  <Select.ItemText>Business</Select.ItemText>
                                </Select.Item>
                                <Select.Item
                                  value="E-commerce"
                                  className="px-4 py-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white rounded-lg transition-colors outline-none"
                                >
                                  <Select.ItemText>E-commerce</Select.ItemText>
                                </Select.Item>
                                <Select.Item
                                  value="Portfolio"
                                  className="px-4 py-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white rounded-lg transition-colors outline-none"
                                >
                                  <Select.ItemText>Portfolio</Select.ItemText>
                                </Select.Item>
                                <Select.Item
                                  value="Blog"
                                  className="px-4 py-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white rounded-lg transition-colors outline-none"
                                >
                                  <Select.ItemText>Blog</Select.ItemText>
                                </Select.Item>
                                <Select.Item
                                  value="Other"
                                  className="px-4 py-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white rounded-lg transition-colors outline-none"
                                >
                                  <Select.ItemText>Other</Select.ItemText>
                                </Select.Item>
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                      </div>

                      {/* Client Websites Section */}
                      <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-8 mt-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="material-icons text-primary" style={{ fontSize: '24px' }}>language</span>
                            <span>Client Websites</span>
                            <span className="ml-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                              {websites.length}
                            </span>
                          </h3>
                        </div>

                        {/* Instructions banner */}
                        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                          <div className="flex items-start gap-3">
                            <span className="material-icons text-blue-600 dark:text-blue-400 mt-0.5" style={{ fontSize: '20px' }}>info</span>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                                💡 You can add multiple websites to this client dashboard
                              </p>
                              <p className="text-xs text-gray-700 dark:text-gray-300">
                                The <strong>first website's thumbnail</strong> will be displayed as the main card image in "Recent Client Dashboards Created"
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Website Form */}
                        <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="Website Name (e.g., My E-commerce Store)"
                              value={currentWebsite.name}
                              onChange={(e) =>
                                setCurrentWebsite({ ...currentWebsite, name: e.target.value })
                              }
                              className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                            />
                          </div>

                          <div className="flex gap-3 mb-4">
                            <input
                              type="url"
                              placeholder="Website URL (e.g., https://client-site.com)"
                              value={currentWebsite.url}
                              onChange={(e) =>
                                setCurrentWebsite({ ...currentWebsite, url: e.target.value })
                              }
                              className="flex-1 px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                            />
                            <button
                              type="button"
                              onClick={handleFetchThumbnail}
                              className="px-6 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:shadow-lg transition-all duration-200 whitespace-nowrap font-semibold flex items-center gap-2"
                            >
                              <span className="material-icons text-sm">photo_camera</span>
                              Fetch
                            </button>
                          </div>

                          <div className="mb-4">
                            <input
                              type="url"
                              placeholder="Admin/CMS URL (optional)"
                              value={currentWebsite.adminUrl}
                              onChange={(e) =>
                                setCurrentWebsite({ ...currentWebsite, adminUrl: e.target.value })
                              }
                              className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                            />
                          </div>

                          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 mb-4">
                            <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                              <span className="material-icons text-primary" style={{ fontSize: '18px' }}>image</span>
                              <span>Thumbnail Image</span>
                            </label>

                            <input
                              type="text"
                              placeholder="Paste image URL (e.g., https://example.com/image.jpg)"
                              value={currentWebsite.thumbnail}
                              onChange={(e) =>
                                setCurrentWebsite({ ...currentWebsite, thumbnail: e.target.value })
                              }
                              className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 mb-3"
                            />

                            {/* Thumbnail Preview - Show below input */}
                            {currentWebsite.thumbnail && (
                              <div className="mt-3 mb-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-primary/20">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="material-icons text-primary text-sm">visibility</span>
                                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Thumbnail Preview</p>
                                </div>
                                <div className="relative">
                                  <img
                                    src={currentWebsite.thumbnail}
                                    alt="Website Thumbnail Preview"
                                    crossOrigin="anonymous"
                                    className="w-32 h-32 object-cover rounded-lg shadow-md mx-auto"
                                    onError={(e) => {
                                      console.error("❌ Thumbnail preview failed to load:", currentWebsite.thumbnail);
                                      const target = e.currentTarget;
                                      target.style.display = 'none';
                                      const errorMsg = document.createElement('div');
                                      errorMsg.className = 'p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg';
                                      errorMsg.innerHTML = '<div class="flex items-center gap-2"><span class="material-icons text-red-600 text-sm">error</span><span class="text-xs text-red-700 dark:text-red-300 font-medium">Image failed to load. URL may be invalid or blocked by CORS.</span></div>';
                                      target.parentElement?.appendChild(errorMsg);
                                    }}
                                    onLoad={() => {
                                      console.log("✅ Thumbnail preview loaded successfully:", currentWebsite.thumbnail);
                                    }}
                                  />
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 break-all">
                                  {currentWebsite.thumbnail.length > 80 
                                    ? `${currentWebsite.thumbnail.substring(0, 80)}...` 
                                    : currentWebsite.thumbnail}
                                </p>
                              </div>
                            )}

                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">OR</span>
                              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleThumbnailFileUpload(e.target.files?.[0] || null)}
                                className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-semibold hover:file:bg-primary/20 cursor-pointer"
                              />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center gap-1">
                              <span className="material-icons text-xs">info</span>
                              Paste URL, upload from computer, or use screenshot services
                            </p>
                          </div>

                          <div className="mb-6 flex items-center justify-between gap-4 relative">
                            <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border-l-4 border-primary shadow-sm">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Website Category</p>
                              <p className="text-xs text-gray-600 dark:text-gray-300">Choose the type of website</p>
                            </div>
                            <div className="relative">
                              <Select.Root
                                value={currentWebsite.category}
                                onValueChange={(value) =>
                                  setCurrentWebsite({ ...currentWebsite, category: value })
                                }
                              >
                                <Select.Trigger className="inline-flex min-w-[200px] px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white justify-between items-center transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 font-medium">
                                  <span className="flex items-center gap-2">
                                    <span className="material-icons text-primary" style={{ fontSize: '18px' }}>category</span>
                                    <Select.Value />
                                  </span>
                                  <Select.Icon>
                                    <span className="material-icons text-gray-400" style={{ fontSize: '20px' }}>expand_more</span>
                                  </Select.Icon>
                                </Select.Trigger>

                                <Select.Portal>
                                  <Select.Content className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <Select.Viewport className="p-2">
                                      <Select.Item
                                        value="Business"
                                        className="px-4 py-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white rounded-lg transition-colors outline-none"
                                      >
                                        <Select.ItemText>Business</Select.ItemText>
                                      </Select.Item>
                                      <Select.Item
                                        value="E-commerce"
                                        className="px-4 py-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white rounded-lg transition-colors outline-none"
                                      >
                                        <Select.ItemText>E-commerce</Select.ItemText>
                                      </Select.Item>
                                      <Select.Item
                                        value="Portfolio"
                                        className="px-4 py-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white rounded-lg transition-colors outline-none"
                                      >
                                        <Select.ItemText>Portfolio</Select.ItemText>
                                      </Select.Item>
                                      <Select.Item
                                        value="Blog"
                                        className="px-4 py-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 dark:text-white rounded-lg transition-colors outline-none"
                                      >
                                        <Select.ItemText>Blog</Select.ItemText>
                                      </Select.Item>
                                    </Select.Viewport>
                                  </Select.Content>
                                </Select.Portal>
                              </Select.Root>
                            </div>
                          </div>

                          <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4 relative">
                            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg border-l-4 border-primary shadow-sm">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Ready to add this website?</p>
                              <p className="text-xs text-gray-600 dark:text-gray-300">Add it to the client's dashboard</p>
                            </div>
                            <button
                              type="button"
                              onClick={addWebsite}
                              className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold flex items-center gap-2"
                            >
                              <span className="material-icons" style={{ fontSize: '20px' }}>add_circle</span>
                              Add Website
                            </button>
                          </div>
                        </div>

                        {/* Display added websites */}
                        {websites.length > 0 ? (
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Added Websites</p>
                              {websites.length > 0 && (
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                  ⭐ First website = Main thumbnail
                                </p>
                              )}
                            </div>
                            {websites.map((website, index) => (
                              <div
                                key={index}
                                className={`p-4 bg-white dark:bg-gray-800 rounded-xl border-2 ${index === 0
                                  ? 'border-primary bg-gradient-to-r from-primary/5 to-transparent'
                                  : 'border-gray-200 dark:border-gray-700'
                                  } flex justify-between items-center hover:shadow-md transition-all duration-200 group relative`}
                              >
                                {/* Primary badge for first website */}
                                {index === 0 && (
                                  <div className="absolute -top-2 -left-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                    <span className="material-icons" style={{ fontSize: '14px' }}>star</span>
                                    PRIMARY
                                  </div>
                                )}

                                <div className="flex items-center gap-4">
                                  {/* Website thumbnail - SIMPLE: just show the image */}
                                  {website.thumbnail ? (
                                    <img
                                      src={website.thumbnail}
                                      alt={website.name}
                                      crossOrigin="anonymous"
                                      className="w-16 h-16 rounded-lg object-cover border-2 border-primary/30 shadow-sm"
                                    />
                                  ) : (
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                                      <span className="material-icons text-primary">language</span>
                                    </div>
                                  )}

                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="font-bold text-gray-900 dark:text-white text-base">
                                        {website.name}
                                      </p>
                                      {index === 0 && (
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                                          Main Card
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                      <span className="material-icons text-xs">link</span>
                                      {website.url}
                                    </p>
                                    {website.category && (
                                      <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1 mt-0.5">
                                        <span className="material-icons text-xs">category</span>
                                        {website.category}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    setWebsites(websites.filter((_, i) => i !== index))
                                  }
                                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 group-hover:scale-110"
                                  title="Remove website"
                                >
                                <span className="material-icons">delete</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Empty state - no websites added yet */
                          <div className="mb-6 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="material-icons text-primary" style={{ fontSize: '40px' }}>add_box</span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                              No websites added yet
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Fill out the form above and click "Add Website" to get started
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              💡 Tip: Add multiple websites - the first one becomes the main card thumbnail
                            </p>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="sticky bottom-0 bg-white dark:bg-gray-900 px-8 py-6 border-t-2 border-gray-200 dark:border-gray-700 flex gap-4">
                    <Dialog.Close asChild>
                      <button className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-bold flex items-center justify-center gap-2">
                        <span className="material-icons">close</span>
                        Cancel
                      </button>
                    </Dialog.Close>
                    <button
                      onClick={handleCreateDashboard}
                      disabled={isCreating}
                      className={`flex-1 px-6 py-4 ${isCreating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-primary/80'} text-white rounded-xl hover:shadow-xl transition-all duration-200 font-bold flex items-center justify-center gap-2`}
                    >
                      <span className="material-icons">{isCreating ? 'hourglass_empty' : 'check_circle'}</span>
                      {isCreating ? 'Creating...' : 'Create Dashboard'}
                    </button>
                  </div>

                  <Dialog.Close asChild>
                    <button
                      className="absolute top-8 right-8 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      aria-label="Close"
                    >
                      <span className="material-icons">close</span>
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </header>

          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Content Area */}
            <div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Next Task Card */}
              <div className="bg-primary text-white p-6 rounded-xl flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Next Task</h2>
                  <button className="text-white hover:opacity-70">
                    <span className="material-icons">more_horiz</span>
                  </button>
                </div>

                {tasks.length > 0 ? (() => {
                  const nextTask = tasks[0];
                  console.log('Next Task:', nextTask);
                  let clientData = null;
                  
                  if (nextTask.assignType === 'client') {
                    clientData = clients?.find((c: any) => c.id === nextTask.assignedTo);
                  } else {
                    const [clientId] = nextTask.assignedTo.split('-');
                    clientData = clients?.find((c: any) => c.id === clientId);
                  }

                  // Get thumbnail from client's projects
                  let thumbnailUrl = '';
                  if (clientData?.projects && clientData.projects.length > 0) {
                    const firstProject = clientData.projects[0];
                    if (typeof firstProject === 'object' && firstProject !== null) {
                      if ((firstProject as any).thumbnail) {
                        thumbnailUrl = (firstProject as any).thumbnail;
                      } else if ((firstProject as any).url) {
                        const websiteToCapture = (firstProject as any).url.startsWith('http') ? (firstProject as any).url : `https://${(firstProject as any).url}`;
                        thumbnailUrl = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
                      }
                    }
                  }

                  return (
                    <>
                      <div className="flex items-center mb-4">
                        {thumbnailUrl ? (
                          <img
                            src={thumbnailUrl}
                            alt=""
                            className="w-32 h-32 rounded-lg object-cover mr-4 transition-transform duration-300 hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(clientData?.name || 'Client')}&size=128&background=ffffff&color=3b82f6`;
                            }}
                          />
                        ) : (
                          <div className="w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                            <span className="material-icons text-white text-5xl">web</span>
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-lg">{nextTask.assignedToName}</p>
                          <p className="text-sm opacity-80">{nextTask.title}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm opacity-80">Due Date</p>
                        <p className="font-semibold">{nextTask.date}</p>
                      </div>

                      <div className="flex justify-between mb-6">
                        <div>
                          <p className="text-sm opacity-80">Assigned To</p>
                          <p className="font-semibold">{nextTask.assignType === 'client' ? 'Client' : 'Project'}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80">Attachments</p>
                          <p className="font-semibold">{nextTask.links?.length || 0} files</p>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center gap-3">
                        <img 
                          src={`/assets/images/business-3d-icon/${(nextTask.status || 'todo') === 'todo' ? 'Schedule-Planning.png' : nextTask.status === 'in-progress' ? 'Project-Management.png' : nextTask.status === 'waiting' ? 'Type-Writer.png' : 'Financial-Target.png'}`}
                          alt="Status"
                          className="w-12 h-12"
                        />
                        <div>
                          <p className="text-sm opacity-80">Status</p>
                          <p className="text-xl font-bold">{(nextTask.status || 'todo') === 'todo' ? 'To Do' : nextTask.status === 'in-progress' ? 'In Progress' : nextTask.status === 'waiting' ? 'Waiting' : 'Completed'}</p>
                        </div>
                      </div>
                    </>
                  );
                })() : (
                  <>
                    <div className="flex items-center mb-4">
                      <img
                        src="/assets/images/default-thumbnail.png"
                        alt="No tasks"
                        className="w-32 h-32 rounded-lg object-cover mr-4 transition-transform duration-300 hover:scale-110 animate-pulse"
                      />
                      <div>
                        <p className="font-bold text-lg">No Tasks Scheduled</p>
                        <p className="text-sm opacity-80">Add your first task to get started</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm opacity-80">Quick Actions</p>
                      <p className="font-semibold">Create a task in "Tasks To Do" section</p>
                    </div>

                    <div className="flex justify-between mb-6">
                      <div>
                        <p className="text-sm opacity-80">Total Tasks</p>
                        <p className="font-semibold">0</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Completed</p>
                        <p className="font-semibold">0</p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <p className="text-sm opacity-80">Status</p>
                      <p className="text-xl font-bold">Ready to Schedule</p>
                    </div>
                  </>
                )}
              </div>

              {/* Recent Deals */}
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">
                    Recent Client Dashboards Created
                  </h2>
                  <a className="text-primary text-sm font-semibold hover:underline" href="#">
                    View All
                  </a>
                </div>

                <div className="space-y-24 max-h-[600px] overflow-y-auto overflow-x-hidden pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#22c55e #e5e7eb' }}>
                  {/* Real clients from API - PAGINATED (Recent section) */}
                  {(() => {
                    const paginatedClients = getRecentDashboardPaginatedClients();
                    console.log('🎯 About to render clients:', paginatedClients.length, paginatedClients);
                    return paginatedClients;
                  })().map((client: any, index: number) => {
                    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

                    // Get thumbnail from multiple possible sources
                    // Handle case where websiteUrl might be an array
                    let websiteUrlRaw = client.websiteUrl;
                    if (Array.isArray(websiteUrlRaw)) {
                      websiteUrlRaw = websiteUrlRaw.length > 0 ? websiteUrlRaw[0] : '';
                    }
                    let thumbnailUrl = websiteUrlRaw || '';

                    // Priority 1: Check if websiteUrl is a DFINITY blob URL (from our upload)
                    if (thumbnailUrl && typeof thumbnailUrl === 'string' && thumbnailUrl.includes('/api/thumbnail/')) {
                      // It's already a DFINITY blob URL - use it directly
                      // Convert relative URL to absolute if needed
                      if (thumbnailUrl.startsWith('/api/')) {
                        thumbnailUrl = `${apiBase}${thumbnailUrl.substring(4)}`;
                      } else if (!thumbnailUrl.startsWith('http')) {
                        thumbnailUrl = `${apiBase}/thumbnail/${thumbnailUrl}`;
                      }
                    }
                    // Priority 2: Check if we have projects with thumbnails
                    else if (client.projects && Array.isArray(client.projects) && client.projects.length > 0) {
                      const firstProject = client.projects[0];

                      // Use project thumbnail if it exists
                      if (firstProject.thumbnail && typeof firstProject.thumbnail === 'string') {
                        // Check for base64 data URLs
                        if (firstProject.thumbnail.startsWith('data:image/')) {
                          thumbnailUrl = firstProject.thumbnail;
                        }
                        // Check for DFINITY blob URLs
                        else if (firstProject.thumbnail.includes('/api/thumbnail/')) {
                          thumbnailUrl = firstProject.thumbnail.startsWith('http')
                            ? firstProject.thumbnail
                            : `${apiBase}${firstProject.thumbnail.startsWith('/') ? firstProject.thumbnail.substring(4) : '/thumbnail/' + firstProject.thumbnail}`;
                        }
                        // Check for screenshot services or regular image URLs
                        else if (
                          firstProject.thumbnail.includes('screenshot') ||
                          firstProject.thumbnail.startsWith('http') ||
                          firstProject.thumbnail.match(/\.(jpg|jpeg|png|gif|webp)/)
                        ) {
                          thumbnailUrl = firstProject.thumbnail;
                        }
                        // Generate screenshot from project URL if no valid thumbnail
                        else if (!thumbnailUrl && firstProject.url && typeof firstProject.url === 'string') {
                          const websiteToCapture = firstProject.url.startsWith('http') ? firstProject.url : `https://${firstProject.url}`;
                          thumbnailUrl = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
                        }
                      }
                      // If no thumbnail but we have a URL, generate screenshot
                      else if (!thumbnailUrl && firstProject.url && typeof firstProject.url === 'string') {
                        const websiteToCapture = firstProject.url.startsWith('http') ? firstProject.url : `https://${firstProject.url}`;
                        thumbnailUrl = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
                      }
                    }

                    // NOTE: No fallback placeholder - cards without valid thumbnails are filtered out above

                    console.log('🖼️ Displaying client card:', {
                      name: client.name,
                      originalWebsiteUrl: client.websiteUrl,
                      websiteUrlRaw: websiteUrlRaw,
                      finalThumbnailUrl: thumbnailUrl,
                      projectsCount: client.projects?.length || 0,
                      firstProjectThumbnail: client.projects?.[0]?.thumbnail,
                      firstProjectUrl: client.projects?.[0]?.url,
                      fullClient: client
                    });

                    return (
                      <div
                        key={`real-${client.id || index}`}
                        className="flex items-center justify-between py-6 px-4 -mx-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group"
                        onClick={() => {
                          setSelectedClient(client);
                          setIsClientDetailsOpen(true);
                        }}
                      >
                        <div className="flex items-center">
                          {/* Thumbnail Gallery with Scroll */}
                          <div className="flex flex-col mr-4">
                            {client.projects && Array.isArray(client.projects) && client.projects.length > 0 ? (
                              <div>
                                {/* Scrollable horizontal thumbnails */}
                                <div 
                                  className="flex gap-1.5 overflow-x-auto pb-1"
                                  style={{ 
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#22c55e #e5e7eb',
                                    maxWidth: '200px'
                                  }}
                                >
                                  {client.projects.map((project: any, idx: number) => {
                                    let projectThumbnail = '';
                                    
                                    // Get thumbnail for this specific project
                                    if (project.thumbnail && typeof project.thumbnail === 'string') {
                                      if (project.thumbnail.startsWith('data:image/') || 
                                          project.thumbnail.includes('/api/thumbnail/') ||
                                          project.thumbnail.includes('screenshot') ||
                                          project.thumbnail.startsWith('http')) {
                                        projectThumbnail = project.thumbnail;
                                      }
                                    }
                                    
                                    // Generate screenshot if no thumbnail
                                    if (!projectThumbnail && project.url && typeof project.url === 'string') {
                                      const websiteToCapture = project.url.startsWith('http') ? project.url : `https://${project.url}`;
                                      projectThumbnail = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
                                    }
                                    
                                    // Fallback
                                    if (!projectThumbnail) {
                                      projectThumbnail = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name || 'Website')}&size=64&background=random`;
                                    }
                                    
                                    return (
                                      <div key={`recent-thumb-${idx}`} className="flex-shrink-0 relative group/thumb">
                                        <img
                                          alt={project.name || `Website ${idx + 1}`}
                                          className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                                          src={projectThumbnail}
                                          crossOrigin="anonymous"
                                          onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name || 'Website')}&size=64&background=6366f1`;
                                          }}
                                        />
                                        {/* Edit button overlay */}
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedClient(client);
                                            setEditingProjectIndex(idx);
                                            setEditedProjectName(project.name || "");
                                            setEditedProjectUrl(project.url || "");
                                            setEditedProjectAdminUrl(project.adminUrl || "");
                                            setEditedProjectThumbnail(project.thumbnail || "");
                                            setIsClientDetailsOpen(true);
                                          }}
                                          className="absolute inset-0 bg-blue-500/90 text-white rounded-lg opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                                          title="Edit project"
                                        >
                                          <span className="material-icons text-sm">edit</span>
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                                
                                {/* Dot indicators - same as client dashboard */}
                                {client.projects.length > 1 && (
                                  <div className="flex justify-center gap-1 mt-1">
                                    {client.projects.map((_: any, idx: number) => (
                                      <div
                                        key={`recent-dot-${idx}`}
                                        className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <img
                                alt={client.name || 'Client'}
                                className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                                src={thumbnailUrl}
                                crossOrigin="anonymous"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  console.log('❌ Thumbnail failed to load, using fallback');
                                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name || 'Client')}&size=64&background=6366f1`;
                                }}
                              />
                            )}
                          </div>
                          
                          <div>
                            <p className="font-semibold text-text-light-primary dark:text-text-dark-primary mb-0.5 group-hover:text-primary transition-colors">
                              {client.name || 'Unnamed Client'}
                            </p>
                            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-0.5">
                              {client.email || 'No email'}
                            </p>
                            {client.phone && (
                              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-0.5 flex items-center gap-1">
                                <span className="material-icons" style={{ fontSize: '12px' }}>phone</span>
                                {client.phone}
                              </p>
                            )}
                            {client.contactPerson && (
                              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">
                                Contact: {client.contactPerson}
                              </p>
                            )}
                            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                              {(client.category || 'Business').charAt(0).toUpperCase() + (client.category || 'Business').slice(1)} • Client Dashboard
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                            {client.profileImage ? (
                              <img src={client.profileImage} alt={client.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-icons text-white text-xl">person</span>
                            )}
                          </div>
                          {/* Format creation date */}
                          {(() => {
                            try {
                              // Handle different date formats from DFINITY
                              let dateValue = client.createdAt;

                              // Convert nanoseconds to milliseconds if needed (DFINITY uses nanoseconds)
                              if (typeof dateValue === 'number' && dateValue > 1e12) {
                                dateValue = Math.floor(dateValue / 1e6); // Convert nanoseconds to milliseconds
                              }

                              const date = new Date(dateValue);
                              const now = new Date();
                              const diffMs = now.getTime() - date.getTime();
                              const diffMins = Math.floor(diffMs / 60000);
                              const diffHours = Math.floor(diffMs / 3600000);
                              const diffDays = Math.floor(diffMs / 86400000);

                              let displayText = '';

                              if (diffMins < 1) {
                                displayText = 'Just now';
                              } else if (diffMins < 60) {
                                displayText = `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
                              } else if (diffHours < 24) {
                                displayText = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                              } else if (diffDays < 7) {
                                displayText = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                              } else {
                                displayText = date.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
                                });
                              }

                              return (
                                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary flex items-center gap-1" title={date.toLocaleString()}>
                                  <span className="material-icons text-xs">schedule</span>
                                  {displayText}
                                </p>
                              );
                            } catch (error) {
                              console.error('Date formatting error:', error, 'Value:', client.createdAt);
                              return (
                                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                                  Recently added
                                </p>
                              );
                            }
                          })()}
                          <span className="material-icons text-gray-400 group-hover:text-primary transition-colors text-sm">
                            chevron_right
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Sample card - 1 example only */}
                  {showRecentSampleCard && [
                    {
                      address: "Sample Client Dashboard",
                      contact: "Example Client",
                      location: "E-commerce • Business",
                      price: "$5750",
                      time: "Recently",
                      image:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuAYdzHlWIt9axsZnh9gdLWsZ3p1cbjEf-PkZm1IomN1ND7mZs2AHA0saRwkMaT-AnBXwICJ9FqDkp6BidMh5xxxclEICLqdya1zZB7UOH631wqyIagOnvkuFiAyWyoVi8AxIjfRTFLrCKl8M4AM3k3K7jhXR9pAaRoBqtjStYrBI5V26v5zISTFAdokG_BfGaYpNiWZmv6pmkkKkMPhCSjJWM73r61wOg5slDUjG987iuj_2VDtVrvAIChUiw7bRbn9LAAxGiVGd4NW",
                    },
                  ].map((deal, i) => (
                    <div 
                      key={`mock-${i}`} 
                      className="flex items-center justify-between py-6 px-4 -mx-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
                      onClick={() => {
                        setDeleteSampleSection('recent');
                        setShowSampleDeleteModal(true);
                      }}
                    >
                      <div className="flex items-center">
                        <img
                          alt={deal.address}
                          className="w-16 h-16 rounded-lg object-cover mr-4"
                          src={deal.image || "/placeholder.svg"}
                        />
                        <div>
                          <p className="font-semibold text-text-light-primary dark:text-text-dark-primary mb-0.5">
                            {deal.address}
                          </p>
                          <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">
                            {deal.contact}
                          </p>
                          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                            {deal.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <span className="material-icons text-white text-xl">person</span>
                        </div>
                        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{deal.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination Controls for Recent Dashboards */}
                {getTotalRecentDashboardPages() > 1 && (
                  <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>Page {dashboardRecentCurrentPage} of {getTotalRecentDashboardPages()}</span>
                      <span>•</span>
                      <span>{dashboardRecentItemsPerPage} per page</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDashboardRecentCurrentPage(Math.max(1, dashboardRecentCurrentPage - 1))}
                        disabled={dashboardRecentCurrentPage === 1}
                        className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="material-icons text-sm">chevron_left</span>
                      </button>
                      <button
                        onClick={() => setDashboardRecentCurrentPage(Math.min(getTotalRecentDashboardPages(), dashboardRecentCurrentPage + 1))}
                        disabled={dashboardRecentCurrentPage === getTotalRecentDashboardPages()}
                        className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="material-icons text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Customers Count */}
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary">Total Clients</p>
                  <p className="text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">{clients?.length || 0}</p>
                </div>
                <div className="flex -space-x-4">
                  {clients && clients.length > 0 ? (
                    <>
                      {clients.filter((c: any) => c.profileImage).slice(0, 3).map((client: any, idx: number) => (
                        <img
                          key={idx}
                          alt="customer avatar"
                          className="w-16 h-16 rounded-full border-4 border-card-light dark:border-card-dark object-cover"
                          src={client.profileImage}
                        />
                      ))}
                      {clients.filter((c: any) => c.profileImage).length === 0 && (
                        <div className="w-16 h-16 rounded-full border-4 border-card-light dark:border-card-dark bg-primary flex items-center justify-center">
                          <span className="material-icons text-white text-2xl">person</span>
                        </div>
                      )}
                      {clients.length > 3 && clients.filter((c: any) => c.profileImage).length > 0 && (
                        <div className="w-16 h-16 rounded-full border-4 border-card-light dark:border-card-dark bg-green-200 flex items-center justify-center text-green-600 font-bold text-lg">
                          +{clients.length - 3}
                        </div>
                      )}
                      {clients.length > 1 && clients.filter((c: any) => c.profileImage).length === 0 && (
                        <div className="w-16 h-16 rounded-full border-4 border-card-light dark:border-card-dark bg-green-200 flex items-center justify-center text-green-600 font-bold text-lg">
                          +{clients.length - 1}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-16 h-16 rounded-full border-4 border-card-light dark:border-card-dark bg-primary flex items-center justify-center">
                      <span className="material-icons text-white text-2xl">person</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Deals Count */}
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary">Total Client Dashboards</p>
                  <p className="text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">{clients?.length || 0}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-icons text-primary text-3xl">business_center</span>
                </div>
              </div>

              {/* Project Status */}
              <div className="lg:col-span-2 bg-card-light dark:bg-card-dark p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-text-light-primary dark:text-text-dark-primary">
                  Active Project Status
                </h2>
                <div className="max-h-[600px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}>

                  {/* Real Client Dashboard Cards - PAGINATED (Active section) */}
                  {getActiveDashboardPaginatedClients().map((client, index) => {
                    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

                    // Get thumbnail from multiple possible sources (same logic as Recent Client Dashboards)
                    let websiteUrlRaw = client.websiteUrl;
                    if (Array.isArray(websiteUrlRaw)) {
                      websiteUrlRaw = websiteUrlRaw.length > 0 ? websiteUrlRaw[0] : '';
                    }
                    let thumbnailUrl = websiteUrlRaw || '';

                    // Priority 1: Check if websiteUrl is a DFINITY blob URL (from our upload)
                    if (thumbnailUrl && typeof thumbnailUrl === 'string' && thumbnailUrl.includes('/api/thumbnail/')) {
                      // It's already a DFINITY blob URL - use it directly
                      if (thumbnailUrl.startsWith('/api/')) {
                        thumbnailUrl = `${apiBase}${thumbnailUrl.substring(4)}`;
                      } else if (!thumbnailUrl.startsWith('http')) {
                        thumbnailUrl = `${apiBase}/thumbnail/${thumbnailUrl}`;
                      }
                    }
                    // Priority 2: Check if we have projects with thumbnails
                    else if ((client as any).projects && Array.isArray((client as any).projects) && (client as any).projects.length > 0) {
                      const firstProject = (client as any).projects[0];

                      // Use project thumbnail if it exists
                      if (firstProject && firstProject.thumbnail && typeof firstProject.thumbnail === 'string') {
                        // Check for base64 data URLs
                        if (firstProject.thumbnail.startsWith('data:image/')) {
                          thumbnailUrl = firstProject.thumbnail;
                        }
                        // Check for DFINITY blob URLs
                        else if (firstProject.thumbnail.includes('/api/thumbnail/')) {
                          thumbnailUrl = firstProject.thumbnail.startsWith('http')
                            ? firstProject.thumbnail
                            : `${apiBase}${firstProject.thumbnail.startsWith('/') ? firstProject.thumbnail.substring(4) : '/thumbnail/' + firstProject.thumbnail}`;
                        }
                        // Check for screenshot services or regular image URLs
                        else if (
                          firstProject.thumbnail.includes('screenshot') ||
                          firstProject.thumbnail.startsWith('http') ||
                          firstProject.thumbnail.match(/\.(jpg|jpeg|png|gif|webp)/)
                        ) {
                          thumbnailUrl = firstProject.thumbnail;
                        }
                        // Generate screenshot from project URL if no valid thumbnail
                        else if (!thumbnailUrl && firstProject.url && typeof firstProject.url === 'string') {
                          const websiteToCapture = firstProject.url.startsWith('http') ? firstProject.url : `https://${firstProject.url}`;
                          thumbnailUrl = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
                        }
                      }
                      // If no thumbnail but we have a URL, generate screenshot
                      else if (firstProject && !thumbnailUrl && firstProject.url && typeof firstProject.url === 'string') {
                        const websiteToCapture = firstProject.url.startsWith('http') ? firstProject.url : `https://${firstProject.url}`;
                        thumbnailUrl = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
                      }
                    }

                    // NOTE: No fallback placeholder - cards without valid thumbnails are filtered out above
                    // Ensure thumbnailUrl is a string for TypeScript
                    const finalThumbnailUrl = (thumbnailUrl && typeof thumbnailUrl === 'string') ? thumbnailUrl : '';

                    // Format created date
                    let statusDate = 'Recently';
                    let statusTime = '';
                    if (client.createdAt) {
                      try {
                        let dateValue = client.createdAt;
                        if (typeof dateValue === 'number' && dateValue > 1e12) {
                          dateValue = Math.floor(dateValue / 1e6);
                        }
                        const date = new Date(dateValue);
                        const now = new Date();
                        const diffMs = now.getTime() - date.getTime();
                        const diffMins = Math.floor(diffMs / 60000);
                        const diffHours = Math.floor(diffMs / 3600000);
                        const diffDays = Math.floor(diffMs / 86400000);

                        if (diffMins < 60) {
                          statusDate = 'Today';
                          statusTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                        } else if (diffHours < 24) {
                          statusDate = 'Today';
                          statusTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                        } else if (diffDays < 2) {
                          statusDate = 'Yesterday';
                          statusTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                        } else {
                          statusDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                          statusTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                        }
                      } catch (error) {
                        console.error('Date formatting error:', error);
                      }
                    }

                    // Get dashboard URL - ensure it's properly formatted without 'client-dashboard-' prefix
                    const dashboardUrl = client.dashboardUrl
                      ? client.dashboardUrl
                      : client.name?.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-').concat('-dashboard') || `client-${client.id}-dashboard`;

                    console.log('🔗 Client dashboard URL:', {
                      clientName: client.name,
                      clientId: client.id,
                      originalDashboardUrl: client.dashboardUrl,
                      finalDashboardUrl: dashboardUrl
                    });

                    const isCardEditing = editingCardId === client.id;

                    return (
                      <div key={`active-client-${client.id || index}`} className={`border-2 ${isCardEditing ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'} rounded-lg p-4 mb-4 transition-all duration-200`}>
                        <div className="flex justify-end items-start mb-6">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-semibold bg-green-500/20 text-green-600 py-1 px-3 rounded-full">
                              ACTIVE
                            </span>
                            {!isCardEditing && (
                              <button
                                className="text-blue-500 hover:text-blue-700 cursor-pointer flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                onClick={() => {
                                  setEditingCardId(client.id);
                                  setEditedClientName(client.name || "");
                                  setEditedClientEmail(client.email || "");
                                  setEditedCategory(client.category || "Business");
                                  // Copy projects array for editing
                                  setEditedProjects(client.projects ? JSON.parse(JSON.stringify(client.projects)) : []);
                                  setExpandedProjectEdit(null);
                                }}
                                title="Edit client and projects"
                              >
                                <span className="material-icons text-sm">edit</span>
                                <span className="text-xs font-semibold">Edit</span>
                              </button>
                            )}
                            <a
                              className="text-primary hover:opacity-70 cursor-pointer"
                              onClick={() => {
                                setSelectedClient(client);
                                setIsClientDetailsOpen(true);
                              }}
                            >
                              <span className="material-icons">arrow_forward</span>
                            </a>
                          </div>
                        </div>
                        <div className="flex justify-between items-start gap-8 mb-6">
                          {/* LEFT: Thumbnail Gallery with Scroll */}
                          <div className="flex flex-col">
                            {/* Thumbnail Carousel */}
                            <div className="relative w-48 mb-4">
                              {(client as any).projects && Array.isArray((client as any).projects) && (client as any).projects.length > 0 ? (
                                <div className="flex flex-col">
                                  {/* Scrollable thumbnail container */}
                                  <div 
                                    className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory"
                                    style={{ 
                                      scrollbarWidth: 'thin',
                                      scrollbarColor: '#3b82f6 #e5e7eb'
                                    }}
                                  >
                                    {(client as any).projects.map((project: any, idx: number) => {
                                      let projectThumbnail = '';
                                      
                                      // Get thumbnail for this specific project
                                      if (project.thumbnail && typeof project.thumbnail === 'string') {
                                        if (project.thumbnail.startsWith('data:image/') || 
                                            project.thumbnail.includes('/api/thumbnail/') ||
                                            project.thumbnail.includes('screenshot') ||
                                            project.thumbnail.startsWith('http')) {
                                          projectThumbnail = project.thumbnail;
                                        }
                                      }
                                      
                                      // Generate screenshot if no thumbnail
                                      if (!projectThumbnail && project.url && typeof project.url === 'string') {
                                        const websiteToCapture = project.url.startsWith('http') ? project.url : `https://${project.url}`;
                                        projectThumbnail = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
                                      }
                                      
                                      // Fallback
                                      if (!projectThumbnail) {
                                        projectThumbnail = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name || 'Website')}&size=200&background=random`;
                                      }
                                      
                                      return (
                                        <div key={`project-thumb-${idx}`} className="flex-shrink-0 snap-center relative group">
                                          <img
                                            alt={project.name || `Website ${idx + 1}`}
                                            className="w-48 h-48 rounded-lg object-cover"
                                            src={projectThumbnail}
                                            crossOrigin="anonymous"
                                            onError={(e) => {
                                              const target = e.target as HTMLImageElement;
                                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name || 'Website')}&size=200&background=6366f1`;
                                            }}
                                          />
                                          {/* Edit button overlay - only show when card is NOT in edit mode */}
                                          {!isCardEditing && (
                                            <button
                                              onClick={() => {
                                                setSelectedClient(client);
                                                setEditingProjectIndex(idx);
                                                setEditedProjectName(project.name || "");
                                                setEditedProjectUrl(project.url || "");
                                                setEditedProjectAdminUrl(project.adminUrl || "");
                                                setEditedProjectThumbnail(project.thumbnail || "");
                                                setIsClientDetailsOpen(true);
                                              }}
                                              className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-600 shadow-lg"
                                              title="Edit project"
                                            >
                                              <span className="material-icons text-sm">edit</span>
                                            </button>
                                          )}
                                          {/* Project name overlay */}
                                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-lg">
                                            <p className="text-white text-xs font-semibold truncate">{project.name}</p>
                                            {isCardEditing && (
                                              <p className="text-white/70 text-xs truncate">{project.url}</p>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  
                                  {/* Dot indicators - same as client dashboard */}
                                  {(client as any).projects.length > 1 && (
                                    <div className="flex justify-center gap-1.5 mt-2">
                                      {(client as any).projects.map((_: any, idx: number) => (
                                        <div
                                          key={`dot-${idx}`}
                                          className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <img
                                  alt={client.name || 'Client Dashboard'}
                                  className="w-48 h-48 rounded-lg object-cover"
                                  src={finalThumbnailUrl}
                                  crossOrigin="anonymous"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name || 'Client')}&size=200&background=6366f1`;
                                  }}
                                />
                              )}
                            </div>
                            
                            <div>
                              <p className="font-bold text-text-light-primary dark:text-text-dark-primary">
                                Dashboard Link
                              </p>
                              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary truncate max-w-[180px]">
                                /{dashboardUrl}
                              </p>
                            </div>
                          </div>

                          {/* CENTER: Vertical Stack */}
                          <div className="flex-1 flex flex-col justify-center space-y-8 pl-12">
                            {isCardEditing ? (
                              <>
                                <div className="mb-2">
                                  <p className="text-base text-text-light-secondary dark:text-text-dark-secondary mb-1 font-medium">Client Name <span className="text-red-500">*</span></p>
                                  <input
                                    type="text"
                                    value={editedClientName}
                                    onChange={(e) => setEditedClientName(e.target.value)}
                                    className="w-full px-3 py-2 text-xl font-bold border-2 border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Enter client name"
                                  />
                                </div>
                                <div className="mb-2">
                                  <p className="text-base text-text-light-secondary dark:text-text-dark-secondary mb-1 font-medium">Project Type</p>
                                  <select
                                    value={editedCategory}
                                    onChange={(e) => setEditedCategory(e.target.value)}
                                    className="w-full px-3 py-2 text-lg font-bold border-2 border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                  >
                                    <option value="Business">Business</option>
                                    <option value="E-commerce">E-commerce</option>
                                    <option value="Portfolio">Portfolio</option>
                                    <option value="Blog">Blog</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </div>
                                <div className="mb-2">
                                  <p className="text-base text-text-light-secondary dark:text-text-dark-secondary mb-1 font-medium">Client Email <span className="text-red-500">*</span></p>
                                  <input
                                    type="email"
                                    value={editedClientEmail}
                                    onChange={(e) => setEditedClientEmail(e.target.value)}
                                    className="w-full px-3 py-2 text-lg font-bold border-2 border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="client@example.com"
                                  />
                                </div>
                                
                                {/* Editable Projects Section */}
                                {editedProjects && editedProjects.length > 0 && (
                                  <div className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                                    <p className="text-base font-bold text-text-light-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                                      <span className="material-icons text-blue-500">web</span>
                                      Website Projects ({editedProjects.length})
                                    </p>
                                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}>
                                      {editedProjects.map((project: any, idx: number) => (
                                        <div key={`edit-project-${idx}`} className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                                          <button
                                            onClick={() => setExpandedProjectEdit(expandedProjectEdit === idx ? null : idx)}
                                            className="w-full flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                                          >
                                            <div className="flex items-center gap-2 flex-1">
                                              <span className="material-icons text-sm text-blue-500">
                                                {expandedProjectEdit === idx ? 'expand_less' : 'expand_more'}
                                              </span>
                                              <div className="flex-1">
                                                <p className="font-bold text-sm text-text-light-primary dark:text-text-dark-primary truncate">
                                                  {project.name || `Website ${idx + 1}`}
                                                </p>
                                                <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary truncate">
                                                  {project.url || 'No URL'}
                                                </p>
                                              </div>
                                            </div>
                                          </button>
                                          
                                          {expandedProjectEdit === idx && (
                                            <div className="mt-3 space-y-3 pl-2 border-l-2 border-blue-300">
                                              <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                                  Project Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                  type="text"
                                                  value={project.name || ""}
                                                  onChange={(e) => {
                                                    const updated = [...editedProjects];
                                                    updated[idx] = { ...updated[idx], name: e.target.value };
                                                    setEditedProjects(updated);
                                                  }}
                                                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                  placeholder="Website name"
                                                />
                                              </div>
                                              <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                                  URL <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                  type="url"
                                                  value={project.url || ""}
                                                  onChange={(e) => {
                                                    const updated = [...editedProjects];
                                                    updated[idx] = { ...updated[idx], url: e.target.value };
                                                    setEditedProjects(updated);
                                                  }}
                                                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                  placeholder="https://example.com"
                                                />
                                              </div>
                                              <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                                  Admin URL (optional)
                                                </label>
                                                <input
                                                  type="url"
                                                  value={project.adminUrl || ""}
                                                  onChange={(e) => {
                                                    const updated = [...editedProjects];
                                                    updated[idx] = { ...updated[idx], adminUrl: e.target.value };
                                                    setEditedProjects(updated);
                                                  }}
                                                  className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                  placeholder="https://example.com/admin"
                                                />
                                              </div>
                                              <div>
                                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                                  Thumbnail URL
                                                </label>
                                                <div className="flex gap-2">
                                                  <input
                                                    type="url"
                                                    value={project.thumbnail || ""}
                                                    onChange={(e) => {
                                                      const updated = [...editedProjects];
                                                      updated[idx] = { ...updated[idx], thumbnail: e.target.value };
                                                      setEditedProjects(updated);
                                                    }}
                                                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                    placeholder="https://... or leave empty for auto"
                                                  />
                                                  <button
                                                    onClick={async () => {
                                                      if (!project.url) {
                                                        alert('Please enter URL first');
                                                        return;
                                                      }
                                                      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
                                                      try {
                                                        const response = await fetch(`${apiBase}/fetch-thumbnail`, {
                                                          method: 'POST',
                                                          headers: { 'Content-Type': 'application/json' },
                                                          body: JSON.stringify({ url: project.url })
                                                        });
                                                        const data = await response.json();
                                                        if (data.success && data.thumbnail) {
                                                          const updated = [...editedProjects];
                                                          updated[idx] = { ...updated[idx], thumbnail: data.thumbnail };
                                                          setEditedProjects(updated);
                                                        }
                                                      } catch (error) {
                                                        console.error('Fetch error:', error);
                                                      }
                                                    }}
                                                    className="px-2 py-1.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors whitespace-nowrap"
                                                  >
                                                    Fetch
                                                  </button>
                                                </div>
                                              </div>
                                              {project.thumbnail && (
                                                <div>
                                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                                    Preview
                                                  </label>
                                                  <img
                                                    src={project.thumbnail}
                                                    alt="Thumbnail preview"
                                                    className="w-full h-20 object-cover rounded-lg border border-gray-300"
                                                    onError={(e) => {
                                                      const target = e.target as HTMLImageElement;
                                                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name || 'Website')}&size=200&background=6366f1`;
                                                    }}
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="mb-2">
                                  <p className="text-base text-text-light-secondary dark:text-text-dark-secondary mb-1 font-medium">Client Name</p>
                                  <p className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">{client.name || 'Unnamed Client'}</p>
                                </div>
                                <div className="mb-2">
                                  <p className="text-base text-text-light-secondary dark:text-text-dark-secondary mb-1 font-medium">Project Type</p>
                                  <p className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
                                    {client.category ? client.category.charAt(0).toUpperCase() + client.category.slice(1) : 'Business'}
                                  </p>
                                </div>
                                <div className="mb-2">
                                  <p className="text-base text-text-light-secondary dark:text-text-dark-secondary mb-1 font-medium">Project Name</p>
                                  <p className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
                                    {client.name ? `${client.name} Dashboard` : 'Client Dashboard'}
                                  </p>
                                </div>
                                <div className="mb-2">
                                  <p className="text-base text-text-light-secondary dark:text-text-dark-secondary mb-1 font-medium">Client Contact</p>
                                  <p className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">{client.email || 'No email'}</p>
                                </div>
                              </>
                            )}
                          </div>

                          {/* RIGHT: Status Indicators */}
                          <div className="space-y-3 flex-1">
                            {/* Client Profile Icon - Clickable to update */}
                            <div className="flex justify-center mb-4">
                              <div className="relative group">
                                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center overflow-hidden shadow-lg cursor-pointer">
                                  {(client as any).profileImage ? (
                                    <img src={(client as any).profileImage} alt={client.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="material-icons text-white text-4xl">person</span>
                                  )}
                                </div>
                                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                  <span className="material-icons text-white text-xl">photo_camera</span>
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = async () => {
                                        const newImage = reader.result as string;
                                        setIsUpdating(true);
                                        try {
                                          const result = await api.patch(`/clients/${client.id}`, {
                                            name: client.name,
                                            email: client.email,
                                            category: client.category,
                                            profileImage: newImage
                                          });
                                          if (result.ok) {
                                            (client as any).profileImage = newImage;
                                            queryClient.invalidateQueries({ queryKey: ['clients'] });
                                            await refetchClients();
                                            alert('✅ Profile image updated!');
                                          } else {
                                            alert('❌ Failed to update profile image');
                                          }
                                        } catch (error) {
                                          console.error('Failed to update profile image:', error);
                                          alert('❌ Error updating profile image');
                                        } finally {
                                          setIsUpdating(false);
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <img src="/assets/images/v3/check.png" alt="" className="w-6 h-6" />
                                <p className="font-bold text-gray-900 dark:text-white text-base">Dashboard Created</p>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 ml-9">{statusDate}{statusTime ? `, ${statusTime}` : ''}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <img src="/assets/images/v3/check.png" alt="" className="w-6 h-6" />
                                <p className="font-bold text-gray-900 dark:text-white text-base">Client Access Enabled</p>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 ml-9">Ready to view</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                          {isCardEditing ? (
                            <>
                              <button
                                className="flex-1 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => {
                                  setEditingCardId(null);
                                  setEditedClientName("");
                                  setEditedClientEmail("");
                                  setEditedCategory("Business");
                                  setEditedProjects([]);
                                  setExpandedProjectEdit(null);
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                className="flex-1 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                                onClick={async () => {
                                  if (!editedClientName || !editedClientEmail) {
                                    alert('Please fill in required fields (Name and Email)');
                                    return;
                                  }

                                  // Validate projects
                                  const hasInvalidProject = editedProjects.some((p: any) => !p.name || !p.url);
                                  if (hasInvalidProject) {
                                    alert('⚠️ All projects must have a Name and URL');
                                    return;
                                  }

                                  setIsUpdating(true);
                                  try {
                                    const result = await api.patch(`/clients/${client.id}`, {
                                      name: editedClientName,
                                      email: editedClientEmail,
                                      category: editedCategory,
                                      projects: editedProjects, // Include updated projects
                                    });

                                    if (result.ok) {
                                      alert(`✅ Client "${editedClientName}" and all projects updated successfully!`);
                                      queryClient.invalidateQueries({ queryKey: ['clients'] });
                                      refetchClients();
                                      setEditingCardId(null);
                                      setEditedProjects([]);
                                      setExpandedProjectEdit(null);
                                    } else {
                                      alert(`❌ Failed to update: ${result.error || 'Unknown error'}`);
                                    }
                                  } catch (error) {
                                    console.error('Update error:', error);
                                    alert('❌ Failed to update client. Please try again.');
                                  } finally {
                                    setIsUpdating(false);
                                  }
                                }}
                                disabled={isUpdating}
                              >
                                <span className="material-icons text-sm">{isUpdating ? 'hourglass_empty' : 'check_circle'}</span>
                                {isUpdating ? 'Saving...' : 'Save All Changes'}
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="bg-black text-white font-semibold py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                                onClick={() => {
                                  setSelectedClient(client);
                                  setIsClientDetailsOpen(true);
                                }}
                              >
                                View Details
                              </button>
                              <button
                                className="bg-primary text-white font-semibold py-2 px-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-1 text-sm"
                                onClick={() => {
                                  // Use the same fallback logic as the dashboard URL generation above
                                  const safeDashboardUrl = client.dashboardUrl
                                    ? client.dashboardUrl
                                    : client.name?.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-').concat('-dashboard') || `client-${client.id}-dashboard`;
                                  const fullUrl = `${window.location.origin}/client-dashboard/${safeDashboardUrl}`;
                                  console.log('📋 Copying dashboard URL:', fullUrl);

                                  navigator.clipboard.writeText(fullUrl).then(() => {
                                    alert(`✅ Dashboard URL copied to clipboard!\n\n${fullUrl}\n\nShare this link with ${client.name || 'your client'} so they can access their dashboard.`);
                                  }).catch(err => {
                                    console.error('Failed to copy:', err);
                                    alert(`Dashboard URL:\n${fullUrl}\n\nPlease copy this manually.`);
                                  });
                                }}
                              >
                                <span className="material-icons text-sm">content_copy</span>
                                Copy Dashboard URL
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Sample Card */}
                  {showActiveSampleCard && <div 
                    className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 transition-all cursor-pointer hover:border-red-300 dark:hover:border-red-700"
                    onClick={() => {
                      setDeleteSampleSection('active');
                      setShowSampleDeleteModal(true);
                    }}
                  >
                    <div className="flex justify-end items-start mb-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 py-1 px-3 rounded-full">SAMPLE - Click to remove</span>
                        <span className="text-xs font-semibold bg-green-500/20 text-green-600 py-1 px-3 rounded-full">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start gap-8 mb-6">
                      {/* LEFT: Thumbnail */}
                      <div className="flex flex-col">
                        <div className="relative w-48 mb-4">
                          <img
                            alt="Sample Website"
                            className="w-48 h-48 rounded-lg object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDglsk7ItHuc9kPmnFyKE9Ji1vYJ-KrdOvoncC8xSkL3NPi9sG0_S4wkBWIhdu61uN2_mFRsUJEUk1FD0vNvkXuVitr961vbyvHz8cLT-Jx72C6AUVdp_yJwH15FtG3dR8qlA3M3qL8N4MNRf-kTMWKJJVgfatx9FRcEuJo9CIn0poyDu6dWptSaPKPJCGu6RilHIyvWO1LR2BfiSXB_ezvS1k8DB8TvCv5h1nsyQxw0IZEpFNRx_J9ss0FX7AXuCPPczqumNG5KIsV"
                          />
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <img src="/assets/images/v3/check.png" alt="" className="w-6 h-6" />
                            <p className="font-bold text-gray-900 dark:text-white text-base">Dashboard Created</p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 ml-9">Today, 10:30 AM</p>
                        </div>
                      </div>

                      {/* CENTER: Client Info */}
                      <div className="flex-1 flex flex-col justify-center space-y-6">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Client Name</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">TechCorp Solutions</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                          <p className="text-base text-gray-900 dark:text-white">contact@techcorp.com</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Category</p>
                          <p className="text-base text-gray-900 dark:text-white">Business</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Dashboard URL</p>
                          <p className="text-base text-blue-600 dark:text-blue-400">techcorp-solutions-dashboard</p>
                        </div>
                      </div>

                    </div>
                  </div>}
                </div>
                
                {/* Pagination Controls for Active Project Status */}
                {getTotalActiveDashboardPages() > 1 && (
                  <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>Page {dashboardActiveCurrentPage} of {getTotalActiveDashboardPages()}</span>
                      <span>•</span>
                      <span>{dashboardActiveItemsPerPage} per page</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDashboardActiveCurrentPage(Math.max(1, dashboardActiveCurrentPage - 1))}
                        disabled={dashboardActiveCurrentPage === 1}
                        className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="material-icons text-sm">chevron_left</span>
                      </button>
                      <button
                        onClick={() => setDashboardActiveCurrentPage(Math.min(getTotalActiveDashboardPages(), dashboardActiveCurrentPage + 1))}
                        disabled={dashboardActiveCurrentPage === getTotalActiveDashboardPages()}
                        className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="material-icons text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>


            </div>

            {/* Dashboard Right Sidebar */}
            <aside className="space-y-12">
              {/* Client Directory */}
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary">
                  Client Directory
                </h2>
                <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}>
                  {clients && clients.length > 0 ? (
                    clients.map((client: any, i: number) => (
                      <div key={i} className="flex items-start cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors" onClick={() => {
                        setSelectedClient(client);
                        setIsClientDetailsOpen(true);
                      }}>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden mr-3 flex-shrink-0">
                          {client.profileImage ? (
                            <img
                              alt={client.name}
                              className="w-full h-full object-cover"
                              src={client.profileImage}
                            />
                          ) : (
                            <span className="material-icons text-white text-lg">person</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-text-light-primary dark:text-text-dark-primary truncate mb-0.5">
                            {client.name}
                          </p>
                          <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary truncate">
                            {client.email}
                          </p>
                          {client.phone && (
                            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary truncate flex items-center gap-1">
                              <span className="material-icons" style={{ fontSize: '12px' }}>phone</span>
                              {client.phone}
                            </p>
                          )}
                          {client.contactPerson && (
                            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary truncate">
                              Contact: {client.contactPerson}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <span className="material-icons text-4xl mb-2">person_add</span>
                      <p className="text-sm">No clients yet. Add your first client!</p>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
          )}

          {/* Project Communication Content */}
          {activeTab === 'communication' && (
            <div className="max-w-6xl mx-auto space-y-8 mt-8">
              {/* Filters & Quick Actions */}
              <div className="flex flex-wrap gap-4 items-center justify-between bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-md mb-8">
                <div className="flex gap-3">
                  <select className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white font-medium">
                    <option value="all">All Priorities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <select className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white font-medium">
                    <option value="all">All Categories</option>
                    <option value="feedback">Client Feedback Required</option>
                    <option value="approval">Awaiting Approval</option>
                    <option value="development">Development</option>
                    <option value="bugs">Bug Fixes</option>
                    <option value="features">Feature Requests</option>
                    <option value="content">Content Updates</option>
                  </select>
                </div>
                <button onClick={() => setIsAddTaskOpen(true)} className="px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <span className="material-icons">add</span>
                  Add Task
                </button>
              </div>

              {/* Immediate Actions */}
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-md mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-icons text-red-500 text-3xl">priority_high</span>
                  <h3 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">Immediate Actions</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">{tasks.filter(t => t.status === 'todo' || t.status === 'waiting').length}</span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ef4444 #fee2e2' }}>
                  {tasks.filter(t => t.status === 'todo' || t.status === 'waiting').length > 0 ? (
                    tasks.filter(t => t.status === 'todo' || t.status === 'waiting').map(task => {
                      const isOverdue = task.date && new Date(task.date) < new Date();
                      return (
                        <div key={task.title} className={`p-4 rounded-xl border-2 ${isOverdue ? 'border-red-300' : 'border-gray-200'} bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all flex-shrink-0 w-80 cursor-pointer`} onClick={() => { setSelectedTask(task); setIsTaskModalOpen(true); }}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                            <span className="px-2 py-1 rounded-lg text-xs font-bold border bg-orange-100 text-orange-700 border-orange-200">URGENT</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1"><span className="material-icons" style={{ fontSize: '16px' }}>business</span>{task.assignedToName}</span>
                            <span className="flex items-center gap-1"><span className="material-icons" style={{ fontSize: '16px' }}>calendar_today</span>{task.date}</span>
                          </div>
                          {isOverdue && (
                            <div className="mt-2 flex items-center gap-1 text-red-600 text-sm font-semibold">
                              <span className="material-icons" style={{ fontSize: '16px' }}>warning</span>Overdue
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex-1 text-center py-8 text-gray-500 dark:text-gray-400">
                      <span className="material-icons text-4xl mb-2">check_circle</span>
                      <p>No immediate actions needed</p>
                    </div>
                  )}
                </div>
              </div>

              {/* This Week */}
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-md mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-icons text-blue-500 text-3xl">event</span>
                  <h3 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">This Week</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">{tasks.filter(t => t.status === 'in-progress').length}</span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #dbeafe' }}>
                  {tasks.filter(t => t.status === 'in-progress').length > 0 ? (
                    tasks.filter(t => t.status === 'in-progress').map(task => (
                      <div key={task.title} className="p-4 rounded-xl border-2 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all flex-shrink-0 w-80 cursor-pointer" onClick={() => { setSelectedTask(task); setIsTaskModalOpen(true); }}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                          <span className="px-2 py-1 rounded-lg text-xs font-bold border bg-blue-100 text-blue-700 border-blue-200">IN PROGRESS</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1"><span className="material-icons" style={{ fontSize: '16px' }}>business</span>{task.assignedToName}</span>
                          <span className="flex items-center gap-1"><span className="material-icons" style={{ fontSize: '16px' }}>calendar_today</span>{task.date}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex-1 text-center py-8 text-gray-500 dark:text-gray-400">
                      <span className="material-icons text-4xl mb-2">event_available</span>
                      <p>No tasks in progress this week</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Client Interaction Metrics */}
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-md mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-icons text-green-500 text-3xl">insights</span>
                  <h3 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">Client Interaction Metrics</h3>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#22c55e #dcfce7' }}>
                  {clients && clients.length > 0 ? (
                    clients.slice(0, 4).map((client: any) => {
                      const clientTasks = tasks.filter(t => t.assignedTo === client.id || t.assignedTo?.startsWith(client.id));
                      const daysAgo = client.createdAt ? Math.floor((Date.now() - (typeof client.createdAt === 'number' && client.createdAt > 1e12 ? client.createdAt / 1e6 : client.createdAt)) / (1000 * 60 * 60 * 24)) : 0;
                      return (
                        <div key={client.id} className="p-6 rounded-xl border-2 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer flex-shrink-0 w-80" onClick={() => { setSelectedClient(client); setIsClientDetailsOpen(true); }}>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{client.name}</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div><p className="text-sm text-gray-600 dark:text-gray-400">Last Update</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{daysAgo} days</p></div>
                            <div><p className="text-sm text-gray-600 dark:text-gray-400">Projects</p><p className="text-2xl font-bold text-green-600">{client.projects?.length || 0}</p></div>
                            <div><p className="text-sm text-gray-600 dark:text-gray-400">Active Tasks</p><p className="text-2xl font-bold text-orange-600">{clientTasks.length}</p></div>
                            <div><p className="text-sm text-gray-600 dark:text-gray-400">Category</p><p className="text-sm font-bold text-blue-600">{client.category || 'Business'}</p></div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex-1 text-center py-8 text-gray-500 dark:text-gray-400">
                      <span className="material-icons text-4xl mb-2">people</span>
                      <p>No clients yet. Add your first client to see metrics.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Updates Tab Content - REDESIGNED */}
          {activeTab === 'updates' && (
            <div className="space-y-16 max-w-6xl mx-auto">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">Total Clients</p>
                      <p className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">{clients?.length || 0}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="material-icons text-primary text-2xl">people</span>
                    </div>
                  </div>
                </div>
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">Active Projects</p>
                      <p className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">{clients?.reduce((sum, c) => sum + (c.projects?.length || 0), 0) || 0}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="material-icons text-green-500 text-2xl">web</span>
                    </div>
                  </div>
                </div>
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">Resources Shared</p>
                      <p className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">0</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="material-icons text-blue-500 text-2xl">folder_shared</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="bg-card-light dark:bg-card-dark p-4 rounded-xl mb-12 mt-12">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={commSearchQuery}
                    onChange={(e) => _setCommSearchQuery(e.target.value)}
                    className="w-full py-3 pl-4 pr-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                  <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">search</span>
                </div>
              </div>

              {/* Client Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {clients?.filter(client =>
                  client.name.toLowerCase().includes(commSearchQuery.toLowerCase()) ||
                  client.email.toLowerCase().includes(commSearchQuery.toLowerCase())
                ).map((client) => {
                  // Get thumbnail
                  let thumbnailUrl = '';
                  if (client.projects && client.projects.length > 0) {
                    const firstProject = client.projects[0];
                    if (typeof firstProject === 'object' && firstProject !== null) {
                      if ((firstProject as any).thumbnail) {
                        thumbnailUrl = (firstProject as any).thumbnail;
                      } else if ((firstProject as any).url) {
                        const websiteToCapture = (firstProject as any).url.startsWith('http') ? (firstProject as any).url : `https://${(firstProject as any).url}`;
                        thumbnailUrl = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
                      }
                    }
                  }
                  if (!thumbnailUrl) {
                    thumbnailUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&size=200&background=6366f1`;
                  }
                  
                  return (
                    <div
                      key={client.id}
                      className="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setSelectedProjectForComm(client);
                        setIsCommCardExpanded(true);
                      }}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={thumbnailUrl}
                          alt={client.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&size=200&background=6366f1`;
                          }}
                        />
                        <div className="absolute top-3 right-3">
                          <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                            {(client as any).profileImage ? (
                              <img src={(client as any).profileImage} alt={client.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-icons text-primary text-lg">person</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-1 truncate">{client.name}</h3>
                        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-4 truncate">{client.email}</p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">Projects</p>
                            <p className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">{client.projects?.length || 0}</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">Resources</p>
                            <ClientResourceCount clientId={client.id} />
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProjectForComm(client);
                              setResourceType('google-docs');
                              setResourceTitle('');
                              setResourceUrl('');
                              setIsCommCardExpanded(true);
                            }}
                            className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                          >
                            <span className="material-icons text-sm">add</span>
                            Add Resource
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedClient(client);
                              setIsClientDetailsOpen(true);
                            }}
                            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <span className="material-icons text-sm">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {(!clients || clients.filter(client =>
                client.name.toLowerCase().includes(commSearchQuery.toLowerCase()) ||
                client.email.toLowerCase().includes(commSearchQuery.toLowerCase())
              ).length === 0) && (
                <div className="col-span-full">
                  <div className="bg-card-light dark:bg-card-dark rounded-xl p-16 text-center">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-icons text-5xl text-gray-400">search_off</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
                      No clients found
                    </h3>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6">
                      {commSearchQuery ? 'Try a different search term' : 'Add your first client to get started'}
                    </p>
                    {!commSearchQuery && (
                      <button
                        onClick={() => setActiveTab('dashboard')}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                      >
                        Go to Dashboard
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Legacy Communication Section - Collapsed by default */}
              <div className="mt-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <img src="/assets/business-3d-icon/Communication.png" alt="" className="w-9 h-9" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                      <span className="material-icons text-white text-3xl hidden">forum</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
                        Project Communication
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update client dashboards with progress and resources</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCommCardExpanded(!isCommCardExpanded)}
                    className="p-3 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-all duration-200 group"
                    title={isCommCardExpanded ? "Collapse" : "Expand"}
                  >
                    <span className="material-icons text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                      {isCommCardExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                </div>
                
                {isCommCardExpanded && (
                  <div className="max-h-[800px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}>
                    <div className="space-y-8">
                    
                    {/* Select Client/Project Section */}
                        <div className="pb-8 border-b-2 border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                              <img src="/assets/business-3d-icon/Business-Presentation.png" alt="" className="w-7 h-7" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                              <span className="material-icons text-white text-xl hidden">business</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Select Client Project</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Choose which client dashboard to update</p>
                            </div>
                          </div>
                          <Select.Root 
                            value={selectedProjectForComm?.id || ''} 
                            onValueChange={(value) => {
                              const client = clients?.find(c => c.id === value);
                              setSelectedProjectForComm(client);
                            }}
                          >
                            <Select.Trigger className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white flex justify-between items-center transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
                              <Select.Value placeholder="Choose a client to manage their dashboard updates..." />
                              <Select.Icon>
                                <span className="material-icons text-lg text-gray-400">expand_more</span>
                              </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                              <Select.Content className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                                <Select.Viewport className="p-2">
                                  {clients?.map((client) => (
                                    <Select.Item
                                      key={client.id}
                                      value={client.id}
                                      className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white transition-colors duration-150"
                                    >
                                      <Select.ItemText>{client.name} - {client.email}</Select.ItemText>
                                    </Select.Item>
                                  ))}
                                </Select.Viewport>
                              </Select.Content>
                            </Select.Portal>
                          </Select.Root>
                        </div>

                        {selectedProjectForComm && (
                          <>
                            {/* SUCCESS CARDS AT TOP */}
                            {lastSavedUpdate && (
                              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-4 border-green-500 rounded-2xl">
                                <div className="flex items-start gap-4">
                                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="material-icons text-white text-4xl">check_circle</span>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                                      ✅ SAVED! Client Will See This:
                                    </h3>
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-green-300 mb-4">
                                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Type: {lastSavedUpdate.type}</p>
                                      <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">{lastSavedUpdate.title}</p>
                                      <p className="text-gray-700 dark:text-gray-300">{lastSavedUpdate.content}</p>
                                    </div>
                                    <div className="flex gap-3">
                                      <a
                                        href={`/client-dashboard/${selectedProjectForComm?.dashboardUrl || selectedProjectForComm?.name?.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-') + '-dashboard'}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center gap-2"
                                      >
                                        <span className="material-icons">visibility</span>
                                        VERIFY ON CLIENT DASHBOARD
                                      </a>
                                      <button
                                        onClick={() => { setLastSavedUpdate(null); setShowUpdateForm(true); }}
                                        className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                                      >
                                        Create Another Update
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {lastSavedResource && (
                              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-4 border-green-500 rounded-2xl">
                                <div className="flex items-start gap-4">
                                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="material-icons text-white text-4xl">check_circle</span>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                                      ✅ SAVED! Client Will See This in "Shared Resources":
                                    </h3>
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-green-300 mb-4">
                                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Type: {lastSavedResource.type}</p>
                                      <p className="text-xl font-bold text-gray-900 dark:text-white mb-3">{lastSavedResource.title}</p>
                                      <div className="space-y-2">
                                        {lastSavedResource.links.map((link, idx) => (
                                          <div key={idx} className="flex items-center gap-2 text-sm">
                                            <span className="material-icons text-blue-500 text-sm">link</span>
                                            <span className="font-semibold">{link.name}:</span>
                                            <span className="text-blue-600 truncate">{link.url}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex gap-3">
                                      <a
                                        href={`/client-dashboard/${selectedProjectForComm?.dashboardUrl || selectedProjectForComm?.name?.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-') + '-dashboard'}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center gap-2"
                                      >
                                        <span className="material-icons">visibility</span>
                                        VERIFY ON CLIENT DASHBOARD
                                      </a>
                                      <button
                                        onClick={() => { setLastSavedResource(null); setShowResourceForm(true); }}
                                        className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                                      >
                                        Add Another Resource
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Add Timeline Update Section */}
                            {showUpdateForm && (
                            <div className="pb-8 border-b-2 border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                                  <img src="/assets/business-3d-icon/Schedule-Planning.png" alt="" className="w-7 h-7" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                                  <span className="material-icons text-white text-xl hidden">timeline</span>
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">Add Timeline Update</h3>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Post updates, action items, or notes</p>
                                </div>
                              </div>
                      
                      {/* Update Type */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>category</span>
                          <span>Update Type</span>
                        </label>
                        <Select.Root value={updateType} onValueChange={setUpdateType}>
                          <Select.Trigger className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {updateType === 'update' && <img src="/assets/dashboard-icons/png-icons/48 x 48/612 - News.png" alt="Update" className="w-5 h-5" />}
                              {updateType === 'action-item' && <img src="/assets/dashboard-icons/png-icons/48 x 48/636 - Checklist.png" alt="Action" className="w-5 h-5" />}
                              {updateType === 'note' && <img src="/assets/dashboard-icons/png-icons/48 x 48/630 - Edit.png" alt="Note" className="w-5 h-5" />}
                              <Select.Value />
                            </div>
                            <Select.Icon>
                              <span className="material-icons text-lg text-gray-400">expand_more</span>
                            </Select.Icon>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                              <Select.Viewport className="p-2">
                                <Select.Item value="update" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white flex items-center gap-2">
                                  <img src="/assets/dashboard-icons/png-icons/48 x 48/612 - News.png" alt="Update" className="w-5 h-5" />
                                  <Select.ItemText>Project Update</Select.ItemText>
                                </Select.Item>
                                <Select.Item value="action-item" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white flex items-center gap-2">
                                  <img src="/assets/dashboard-icons/png-icons/48 x 48/636 - Checklist.png" alt="Action" className="w-5 h-5" />
                                  <Select.ItemText>Action Item</Select.ItemText>
                                </Select.Item>
                                <Select.Item value="note" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white flex items-center gap-2">
                                  <img src="/assets/dashboard-icons/png-icons/48 x 48/630 - Edit.png" alt="Note" className="w-5 h-5" />
                                  <Select.ItemText>Note</Select.ItemText>
                                </Select.Item>
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                      </div>

                      {/* Title */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>title</span>
                          <span>Title</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Homepage design completed"
                          value={updateTitle}
                          onChange={(e) => setUpdateTitle(e.target.value)}
                          className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400"
                        />
                      </div>

                      {/* Content */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>description</span>
                          <span>Content</span>
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Describe the update in detail..."
                          value={updateContent}
                          onChange={(e) => setUpdateContent(e.target.value)}
                          className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400 resize-none"
                        />
                      </div>

                      {/* Action Items (if type is action-item) */}
                      {updateType === 'action-item' && (
                        <div className="mb-6">
                          <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                            <span className="material-icons text-primary" style={{ fontSize: '18px' }}>checklist</span>
                            <span>Action Items</span>
                          </label>
                          <div className="flex gap-2 mb-3">
                            <input
                              type="text"
                              placeholder="Add an action item..."
                              value={currentActionItem}
                              onChange={(e) => setCurrentActionItem(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && currentActionItem.trim()) {
                                  setActionItems([...actionItems, currentActionItem.trim()]);
                                  setCurrentActionItem('');
                                }
                              }}
                              className="flex-1 px-5 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white"
                            />
                            <button
                              onClick={() => {
                                if (currentActionItem.trim()) {
                                  setActionItems([...actionItems, currentActionItem.trim()]);
                                  setCurrentActionItem('');
                                }
                              }}
                              className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-semibold"
                            >
                              Add
                            </button>
                          </div>
                          <div className="space-y-2">
                            {actionItems.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <span className="material-icons text-green-500 text-sm">check_circle</span>
                                <span className="flex-1 text-text-light-primary dark:text-text-dark-primary">{item}</span>
                                <button
                                  onClick={() => setActionItems(actionItems.filter((_, i) => i !== idx))}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <span className="material-icons text-sm">close</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Required fields indicator */}
                      {(!updateTitle || !updateContent) && (
                        <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl flex items-center gap-3">
                          <span className="material-icons text-yellow-600 dark:text-yellow-400">info</span>
                          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                            Please fill in both Title and Content to save this update
                          </p>
                        </div>
                      )}

                      <div className="flex gap-4 items-center">
                        <button 
                          onClick={async () => {
                            try {
                              // Save the data
                              setLastSavedUpdate({ type: updateType, title: updateTitle, content: updateContent });
                              
                              await addTimelineUpdate.mutateAsync({
                                type: updateType as 'update' | 'action-item' | 'note',
                                title: updateTitle,
                                content: updateContent,
                                actionItems: updateType === 'action-item' ? actionItems : [],
                                status: 'active'
                              });
                              
                              // Reset form and hide it
                              setUpdateTitle('');
                              setUpdateContent('');
                              setActionItems([]);
                              setShowUpdateForm(false);
                              
                              // Scroll to top
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            } catch (error) {
                              console.error('Error saving timeline update:', error);
                              alert('❌ Failed to save timeline update. Please try again.');
                              setLastSavedUpdate(null);
                            }
                          }}
                          disabled={!updateTitle || !updateContent || addTimelineUpdate.isPending}
                          className="bg-gradient-to-r from-primary to-primary/80 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <span className="material-icons">add_circle</span>
                          {addTimelineUpdate.isPending ? 'Saving...' : 'SAVE & POST TO CLIENT'}
                        </button>
                        
                        {selectedProjectForComm && (
                          <a
                            href={`/client-dashboard/${selectedProjectForComm.dashboardUrl || selectedProjectForComm.name?.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-') + '-dashboard'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/10 transition-all duration-200 flex items-center gap-2"
                          >
                            <span className="material-icons">open_in_new</span>
                            View Client Dashboard
                          </a>
                        )}
                      </div>
                            </div>
                            )}

                            {/* Add Resource Link Section */}
                            {showResourceForm && (
                            <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                              <h3 className="text-xl font-bold mb-4 text-text-light-primary dark:text-text-dark-primary flex items-center gap-3">
                                <span className="material-icons text-primary text-2xl">folder_shared</span>
                                Add Shared Resource
                              </h3>

                      {/* Resource Type */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>category</span>
                          <span>Resource Type</span>
                        </label>
                        <Select.Root value={resourceType} onValueChange={setResourceType}>
                          <Select.Trigger className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {resourceType === 'google-docs' && <img src="/assets/google-suit-icons/docs_2020q4_48dp.png" alt="Docs" className="w-5 h-5" />}
                              {resourceType === 'google-sheets' && <img src="/assets/google-suit-icons/sheets_2020q4_48dp.png" alt="Sheets" className="w-5 h-5" />}
                              {resourceType === 'google-slides' && <img src="/assets/google-suit-icons/slides_2020q4_48dp.png" alt="Slides" className="w-5 h-5" />}
                              {resourceType === 'google-drive' && <img src="/assets/google-suit-icons/google-drive.png" alt="Drive" className="w-5 h-5" />}
                              <Select.Value />
                            </div>
                            <Select.Icon>
                              <span className="material-icons text-lg text-gray-400">expand_more</span>
                            </Select.Icon>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                              <Select.Viewport className="p-2">
                                <Select.Item value="google-docs" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white flex items-center gap-2">
                                  <img src="/assets/google-suit-icons/docs_2020q4_48dp.png" alt="Docs" className="w-5 h-5" />
                                  <Select.ItemText>Google Docs</Select.ItemText>
                                </Select.Item>
                                <Select.Item value="google-sheets" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white flex items-center gap-2">
                                  <img src="/assets/google-suit-icons/sheets_2020q4_48dp.png" alt="Sheets" className="w-5 h-5" />
                                  <Select.ItemText>Google Sheets</Select.ItemText>
                                </Select.Item>
                                <Select.Item value="google-slides" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white flex items-center gap-2">
                                  <img src="/assets/google-suit-icons/slides_2020q4_48dp.png" alt="Slides" className="w-5 h-5" />
                                  <Select.ItemText>Google Slides</Select.ItemText>
                                </Select.Item>
                                <Select.Item value="google-drive" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white flex items-center gap-2">
                                  <img src="/assets/google-suit-icons/google-drive.png" alt="Drive" className="w-5 h-5" />
                                  <Select.ItemText>Google Drive</Select.ItemText>
                                </Select.Item>
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                      </div>

                      {/* Resource Title */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>title</span>
                          <span>Resource Title <span className="text-xs text-gray-400 font-normal">(optional)</span></span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Brand Guidelines (leave empty for auto-title)"
                          value={resourceTitle}
                          onChange={(e) => setResourceTitle(e.target.value)}
                          className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400"
                        />
                      </div>

                      {/* Add Multiple Links */}
                      <div className="mb-6">
                        <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                          <span className="material-icons text-primary" style={{ fontSize: '18px' }}>link</span>
                          <span>Resource Links</span>
                        </label>
                        <div className="space-y-3 mb-3">
                          <input
                            type="text"
                            placeholder="Link name (e.g., Homepage Copy)"
                            value={currentLinkName}
                            onChange={(e) => setCurrentLinkName(e.target.value)}
                            className="w-full px-5 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white"
                          />
                          <div className="flex gap-2">
                            <input
                              type="url"
                              placeholder="https://docs.google.com/..."
                              value={currentLinkUrl}
                              onChange={(e) => setCurrentLinkUrl(e.target.value)}
                              className="flex-1 px-5 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white"
                            />
                            <button
                              onClick={() => {
                                if (currentLinkName.trim() && currentLinkUrl.trim()) {
                                  setResourceLinks([...resourceLinks, { name: currentLinkName.trim(), url: currentLinkUrl.trim() }]);
                                  setCurrentLinkName('');
                                  setCurrentLinkUrl('');
                                }
                              }}
                              className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-semibold"
                            >
                              Add Link
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {resourceLinks.map((link, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                              <span className="material-icons text-primary text-sm">insert_link</span>
                              <div className="flex-1">
                                <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">{link.name}</p>
                                <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary truncate">{link.url}</p>
                              </div>
                              <button
                                onClick={() => setResourceLinks(resourceLinks.filter((_, i) => i !== idx))}
                                className="text-red-500 hover:text-red-700"
                              >
                                <span className="material-icons text-sm">close</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Required fields indicator */}
                      {resourceLinks.length === 0 && (
                        <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl flex items-center gap-3">
                          <span className="material-icons text-yellow-600 dark:text-yellow-400">info</span>
                          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                            Please add at least one link
                          </p>
                        </div>
                      )}

                      <div className="flex gap-4 items-center">
                        <button 
                          onClick={async () => {
                            try {
                              // Auto-generate title if not provided
                              const finalTitle = resourceTitle.trim() || 
                                (resourceType === 'google-docs' ? 'Google Docs' :
                                 resourceType === 'google-sheets' ? 'Google Sheets' :
                                 resourceType === 'google-slides' ? 'Google Slides' :
                                 resourceType === 'google-drive' ? 'Google Drive' : 'Shared Resource');
                              
                              // Save the data
                              setLastSavedResource({ type: resourceType, title: finalTitle, links: [...resourceLinks] });
                              
                              await addResource.mutateAsync({
                                type: resourceType as 'google-docs' | 'google-sheets' | 'google-slides' | 'google-drive' | 'other',
                                title: finalTitle,
                                links: resourceLinks
                              });
                              
                              // Reset form and hide it
                              setResourceTitle('');
                              setResourceLinks([]);
                              setShowResourceForm(false);
                              
                              // Scroll to top
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            } catch (error) {
                              console.error('Error saving resource:', error);
                              alert('❌ Failed to save resource. Please try again.');
                              setLastSavedResource(null);
                            }
                          }}
                          disabled={resourceLinks.length === 0 || addResource.isPending}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <span className="material-icons">cloud_upload</span>
                          {addResource.isPending ? 'Saving...' : 'SAVE & SHARE WITH CLIENT'}
                        </button>
                        
                        {selectedProjectForComm && (
                          <a
                            href={`/client-dashboard/${selectedProjectForComm.dashboardUrl || selectedProjectForComm.name?.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-') + '-dashboard'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-4 border-2 border-green-500 text-green-600 font-bold rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 flex items-center gap-2"
                          >
                            <span className="material-icons">open_in_new</span>
                            View Client Dashboard
                          </a>
                        )}
                      </div>
                      
                            </div>
                            )}

                            {/* Existing Updates & Resources */}
                            {dashboardContent && (
                              <>
                                {/* Timeline Updates List */}
                                {dashboardContent.updates && dashboardContent.updates.length > 0 && (
                                  <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-xl font-bold mb-4 text-text-light-primary dark:text-text-dark-primary flex items-center gap-3">
                                      <span className="material-icons text-primary text-2xl">history</span>
                                      Active Timeline Updates
                                    </h3>
                            <div className="space-y-4">
                              {dashboardContent.updates.filter(u => u.status === 'active').map((update) => (
                                <div key={update.id} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">
                                          {update.type === 'update' && '📢'}
                                          {update.type === 'action-item' && '✅'}
                                          {update.type === 'note' && '📝'}
                                        </span>
                                        <h3 className="font-bold text-lg text-text-light-primary dark:text-text-dark-primary">
                                          {update.title}
                                        </h3>
                                      </div>
                                      <p className="text-text-light-secondary dark:text-text-dark-secondary mb-3">
                                        {update.content}
                                      </p>
                                      {update.actionItems && update.actionItems.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                          <p className="font-semibold text-sm text-gray-600 dark:text-gray-400">Action Items:</p>
                                          {update.actionItems.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                              <span className="material-icons text-green-500 text-sm">check_circle</span>
                                              <span className="text-sm">{item}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      <p className="text-xs text-gray-500 mt-3">
                                        {new Date(update.createdAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={async () => {
                                          if (confirm('Mark this update as completed?')) {
                                            try {
                                              await updateTimelineUpdate.mutateAsync({
                                                updateId: update.id,
                                                status: 'completed'
                                              });
                                            } catch (error) {
                                              console.error('Error updating status:', error);
                                            }
                                          }
                                        }}
                                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition"
                                        title="Mark as completed"
                                      >
                                        <span className="material-icons text-sm">check</span>
                                      </button>
                                      <button
                                        onClick={async () => {
                                          if (confirm('Delete this update?')) {
                                            try {
                                              await deleteTimelineUpdate.mutateAsync(update.id);
                                            } catch (error) {
                                              console.error('Error deleting update:', error);
                                            }
                                          }
                                        }}
                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                        title="Delete update"
                                      >
                                        <span className="material-icons text-sm">delete</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                                  </div>
                                )}

                                {/* Resources List */}
                                {dashboardContent.resources && dashboardContent.resources.length > 0 && (
                                  <div className="pb-6">
                                    <h3 className="text-xl font-bold mb-4 text-text-light-primary dark:text-text-dark-primary flex items-center gap-3">
                                      <span className="material-icons text-primary text-2xl">folder_shared</span>
                                      Shared Resources
                                    </h3>
                            <div className="space-y-4">
                              {dashboardContent.resources.map((resource) => (
                                <div key={resource.id} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">
                                          {resource.type === 'google-docs' && '📄'}
                                          {resource.type === 'google-sheets' && '📊'}
                                          {resource.type === 'google-slides' && '📽️'}
                                          {resource.type === 'google-drive' && '📁'}
                                        </span>
                                        <h3 className="font-bold text-lg text-text-light-primary dark:text-text-dark-primary">
                                          {resource.title}
                                        </h3>
                                      </div>
                                      <div className="space-y-2 mt-3">
                                        {resource.links.map((link, idx) => (
                                          <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg transition group"
                                          >
                                            <span className="material-icons text-primary text-sm">insert_link</span>
                                            <span className="text-sm group-hover:underline">{link.name}</span>
                                            <span className="material-icons text-xs text-gray-400">open_in_new</span>
                                          </a>
                                        ))}
                                      </div>
                                      <p className="text-xs text-gray-500 mt-3">
                                        {new Date(resource.createdAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <button
                                      onClick={async () => {
                                        if (confirm('Delete this resource?')) {
                                          try {
                                            await deleteResource.mutateAsync(resource.id);
                                          } catch (error) {
                                            console.error('Error deleting resource:', error);
                                          }
                                        }
                                      }}
                                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                      title="Delete resource"
                                    >
                                      <span className="material-icons text-sm">delete</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                                  </div>
                                )}
                              </>
                            )}

                            {/* Client Ratings & Feedback */}
                            {clientRatings && (clientRatings.developerRatings.length > 0 || clientRatings.templateRatings.length > 0) && (
                              <div className="pb-6">
                                <h3 className="text-xl font-bold mb-4 text-text-light-primary dark:text-text-dark-primary flex items-center gap-3">
                                  <span className="material-icons text-primary text-2xl">star</span>
                                  Client Feedback & Ratings
                                </h3>
                        
                        {/* Developer Ratings */}
                        {clientRatings.developerRatings.length > 0 && (
                          <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                              <span className="material-icons text-yellow-500">person</span>
                              Developer Ratings
                            </h3>
                            <div className="space-y-4">
                              {clientRatings.developerRatings.map((rating) => (
                                <div key={rating.id} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl font-bold text-yellow-600">{rating.rating}</span>
                                    <span className="text-yellow-500">{'⭐'.repeat(rating.rating)}</span>
                                  </div>
                                  {rating.categories && (
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                      {rating.categories.communication && (
                                        <div className="text-sm">
                                          <span className="font-medium">Communication:</span> {rating.categories.communication}/5
                                        </div>
                                      )}
                                      {rating.categories.quality && (
                                        <div className="text-sm">
                                          <span className="font-medium">Quality:</span> {rating.categories.quality}/5
                                        </div>
                                      )}
                                      {rating.categories.timeliness && (
                                        <div className="text-sm">
                                          <span className="font-medium">Timeliness:</span> {rating.categories.timeliness}/5
                                        </div>
                                      )}
                                      {rating.categories.professionalism && (
                                        <div className="text-sm">
                                          <span className="font-medium">Professionalism:</span> {rating.categories.professionalism}/5
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  {rating.feedback && (
                                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                                      "{rating.feedback}"
                                    </p>
                                  )}
                                  <p className="text-xs text-gray-500 mt-2">
                                    {new Date(rating.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Template Ratings */}
                        {clientRatings.templateRatings.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                              <span className="material-icons text-blue-500">palette</span>
                              Template/Design Ratings
                            </h3>
                            <div className="space-y-4">
                              {clientRatings.templateRatings.map((rating) => (
                                <div key={rating.id} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl font-bold text-blue-600">{rating.rating}</span>
                                    <span className="text-blue-500">{'⭐'.repeat(rating.rating)}</span>
                                  </div>
                                  {rating.categories && (
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                      {rating.categories.design && (
                                        <div className="text-sm">
                                          <span className="font-medium">Design:</span> {rating.categories.design}/5
                                        </div>
                                      )}
                                      {rating.categories.usability && (
                                        <div className="text-sm">
                                          <span className="font-medium">Usability:</span> {rating.categories.usability}/5
                                        </div>
                                      )}
                                      {rating.categories.functionality && (
                                        <div className="text-sm">
                                          <span className="font-medium">Functionality:</span> {rating.categories.functionality}/5
                                        </div>
                                      )}
                                      {rating.categories.responsiveness && (
                                        <div className="text-sm">
                                          <span className="font-medium">Responsiveness:</span> {rating.categories.responsiveness}/5
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  {rating.feedback && (
                                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                                      "{rating.feedback}"
                                    </p>
                                  )}
                                  <p className="text-xs text-gray-500 mt-2">
                                    {new Date(rating.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                              </div>
                            )}

                          </>
                        )}

                        {!selectedProjectForComm && (
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-16 rounded-2xl text-center mt-8 border-2 border-dashed border-gray-300 dark:border-gray-600">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                              <img src="/assets/business-3d-icon/Folder.png" alt="" className="w-16 h-16" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                              <span className="material-icons text-purple-400 text-6xl hidden">inbox</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">No Client Selected</h3>
                            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                              Select a client project above to manage their timeline updates and shared resources
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">Task Calendar</h2>
                  <button onClick={() => setIsAddTaskOpen(true)} className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                    <span className="material-icons">add</span>
                    Add Task
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-bold text-gray-700 dark:text-gray-300 py-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - date.getDay() + i);
                    const dayTasks = tasks.filter(t => t.date === date.toISOString().split('T')[0]);
                    const isToday = date.toDateString() === new Date().toDateString();
                    return (
                      <div key={i} className={`border-2 ${isToday ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'} rounded-lg p-2 min-h-[120px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}>
                        <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{date.getDate()}</div>
                        <div className="space-y-1">
                          {dayTasks.map((task, idx) => (
                            <div key={idx} className={`text-xs px-2 py-1 rounded cursor-pointer truncate ${task.status === 'completed' ? 'bg-green-100 text-green-700' : task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`} onClick={() => { setSelectedTask(task); setIsTaskModalOpen(true); }}>{task.title}</div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">All Clients</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your client relationships</p>
                  </div>
                  <button onClick={() => { console.log('Add Client clicked! isDialogOpen before:', isDialogOpen); setIsDialogOpen(true); console.log('setIsDialogOpen(true) called'); }} className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                    <span className="material-icons">add</span>
                    Add Client
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clients && clients.length > 0 ? clients.map((client: any) => (
                    <div key={client.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                          {client.profileImage ? <img src={client.profileImage} alt={client.name} className="w-full h-full object-cover" /> : <span className="material-icons text-white text-2xl">person</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-text-light-primary dark:text-text-dark-primary truncate">{client.name}</h3>
                          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary truncate">{client.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                          <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Projects</p>
                          <p className="font-bold text-lg text-text-light-primary dark:text-text-dark-primary">{client.projects?.length || 0}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                          <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Category</p>
                          <p className="font-bold text-sm text-text-light-primary dark:text-text-dark-primary truncate">{client.category || 'Business'}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm" onClick={() => { setSelectedClient(client); setIsClientDetailsOpen(true); }}>View Details</button>
                        <button className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => { const url = `${window.location.origin}/client-dashboard/${client.dashboardUrl || client.id}`; navigator.clipboard.writeText(url); alert('✅ Dashboard URL copied!'); }}>
                          <span className="material-icons text-sm">content_copy</span>
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center py-12">
                      <span className="material-icons text-6xl text-gray-400 mb-4">people_alt</span>
                      <p className="text-gray-500 dark:text-gray-400 mb-2">No clients yet</p>
                      <button onClick={() => { console.log('Add First Client clicked!'); setIsDialogOpen(true); }} className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all">Add Your First Client</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">Invoices</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage client invoices and payments</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsInvoiceModalOpen(true);
                      setEditingInvoiceId(null);
                      setSelectedClientId('');
                      setInvoiceDescription('');
                      setInvoiceAmount('');
                      setInvoiceDueDate('');
                      setInvoiceStatus('pending');
                      setInvoiceItems([{description: '', amount: 0}]);
                    }}
                    className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <span className="material-icons">add</span>
                    Create Invoice
                  </button>
                </div>

                {/* Invoice Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Invoices</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{invoices.length}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-green-200 dark:border-green-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Paid</p>
                    <p className="text-2xl font-bold text-green-600">{invoices.filter(i => i.status === 'paid').length}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-yellow-200 dark:border-yellow-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{invoices.filter(i => i.status === 'pending').length}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-red-200 dark:border-red-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">{invoices.filter(i => i.status === 'overdue').length}</p>
                  </div>
                </div>

                {/* Invoice List */}
                {invoices.length > 0 ? (
                  <div className="space-y-3">
                    {invoices.map((invoice) => {
                      const client = clients?.find(c => c.id === invoice.clientId);
                      const totalAmount = invoice.items?.reduce((sum: number, item: any) => sum + (item.amount || 0), 0) || invoice.amount || 0;
                      return (
                        <div key={invoice.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{client?.name || 'Unknown Client'}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                                  invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {invoice.status.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{invoice.description || 'No description'}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <span className="material-icons text-xs">calendar_today</span>
                                  Due: {invoice.dueDate || 'No due date'}
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="material-icons text-xs">schedule</span>
                                  Created: {new Date(invoice.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{invoice.items?.length || 1} item(s)</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setEditingInvoiceId(invoice.id);
                                    setSelectedClientId(invoice.clientId);
                                    setInvoiceDescription(invoice.description || '');
                                    setInvoiceAmount(invoice.amount?.toString() || '');
                                    setInvoiceDueDate(invoice.dueDate || '');
                                    setInvoiceStatus(invoice.status);
                                    setInvoiceItems(invoice.items || [{description: '', amount: 0}]);
                                    setIsInvoiceModalOpen(true);
                                  }}
                                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                  title="Edit invoice"
                                >
                                  <span className="material-icons text-sm">edit</span>
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete invoice for ${client?.name}?`)) {
                                      const updated = invoices.filter(i => i.id !== invoice.id);
                                      setInvoices(updated);
                                      // ✅ DFINITY ONLY - No localStorage
                                    }
                                  }}
                                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                  title="Delete invoice"
                                >
                                  <span className="material-icons text-sm">delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <span className="material-icons text-8xl text-gray-400 mb-6">receipt_long</span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No Invoices Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first invoice to get started</p>
                    <button
                      onClick={() => {
                        setIsInvoiceModalOpen(true);
                        setEditingInvoiceId(null);
                        setSelectedClientId('');
                        setInvoiceDescription('');
                        setInvoiceAmount('');
                        setInvoiceDueDate('');
                        setInvoiceStatus('pending');
                        setInvoiceItems([{description: '', amount: 0}]);
                      }}
                      className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                    >
                      <span className="material-icons">add</span>
                      Create First Invoice
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* OLD INVOICES CODE - REMOVED */}
          {false && activeTab === 'invoices' && (
            <div className="space-y-6">
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">Invoices</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track payments and billing</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white font-medium" onChange={(e) => {
                      const sortBy = e.target.value;
                      if (sortBy === 'client') {
                        setInvoices([...invoices].sort((a, b) => a.client.localeCompare(b.client)));
                      } else if (sortBy === 'amount') {
                        setInvoices([...invoices].sort((a, b) => b.amount - a.amount));
                      } else if (sortBy === 'status') {
                        setInvoices([...invoices].sort((a, b) => a.status.localeCompare(b.status)));
                      } else if (sortBy === 'date') {
                        setInvoices([...invoices].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                      }
                    }}>
                      <option value="date">Sort by Date</option>
                      <option value="client">Sort by Client</option>
                      <option value="amount">Sort by Amount</option>
                      <option value="status">Sort by Status</option>
                    </select>
                    <button onClick={() => setIsInvoiceModalOpen(true)} className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                      <span className="material-icons">add</span>
                      Create Invoice
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-green-500 dark:border-green-600">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-icons text-green-600 dark:text-green-400">check_circle</span>
                      <h3 className="font-bold text-gray-700 dark:text-gray-300">Paid</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">${invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{invoices.filter(i => i.status === 'paid').length} invoices</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-orange-500 dark:border-orange-600">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-icons text-orange-600 dark:text-orange-400">schedule</span>
                      <h3 className="font-bold text-gray-700 dark:text-gray-300">Pending</h3>
                    </div>
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">${invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{invoices.filter(i => i.status === 'pending').length} invoices</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-red-500 dark:border-red-600">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-icons text-red-600 dark:text-red-400">warning</span>
                      <h3 className="font-bold text-gray-700 dark:text-gray-300">Overdue</h3>
                    </div>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">${invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{invoices.filter(i => i.status === 'overdue').length} invoices</p>
                  </div>
                </div>
                {invoices.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="material-icons text-6xl text-gray-400 mb-4">request_quote</span>
                    <p className="text-gray-500 dark:text-gray-400 mb-2 font-semibold">No invoices yet</p>
                    <p className="text-sm text-gray-400 mb-4">Create your first invoice to start tracking payments</p>
                    <button onClick={() => setIsInvoiceModalOpen(true)} className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all">Create First Invoice</button>
                  </div>
                ) : (
                  <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'auto', scrollbarColor: '#3b82f6 #dbeafe' }}>
                    {invoices.map(invoice => (
                      <div key={invoice.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 flex-shrink-0 w-80 hover:shadow-lg transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 dark:text-white">{invoice.client}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(invoice.date).toLocaleDateString()}</p>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm(`Delete invoice for ${invoice.client}?`)) {
                                setInvoices(invoices.filter(i => i.id !== invoice.id));
                              }
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            title="Delete invoice"
                          >
                            <span className="material-icons" style={{ fontSize: '18px' }}>delete</span>
                          </button>
                        </div>
                        {(() => {
                          const client = clients?.find((c: any) => c.id === invoice.clientId || c.name === invoice.client);
                          return client?.email ? (
                            <a href={`mailto:${client.email}?subject=Invoice for ${client.name}&body=Hi ${client.name},%0D%0A%0D%0APlease find your invoice details below:%0D%0A%0D%0AAmount: $${invoice.amount}%0D%0AStatus: ${invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}%0D%0A%0D%0AThank you for your business!%0D%0A%0D%0ABest regards`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mb-3">
                              <span className="material-icons" style={{ fontSize: '14px' }}>email</span>
                              {client.email}
                            </a>
                          ) : null;
                        })()}
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                          <p className="font-bold text-2xl text-gray-900 dark:text-white">${invoice.amount}</p>
                          <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${invoice.status === 'paid' ? 'bg-green-100 text-green-700' : invoice.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>{invoice.status.toUpperCase()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'analytics' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">Client Analytics</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Analytics data updates when clients visit their dashboards and complete action items</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-blue-500">
                    <span className="material-icons text-blue-600 text-4xl mb-2">visibility</span>
                    <p className="text-2xl font-bold text-blue-600">{clients?.reduce((sum, c: any) => sum + (c.metrics?.dashboardVisits || 0), 0)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Dashboard Views</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-green-500">
                    <span className="material-icons text-green-600 text-4xl mb-2">task_alt</span>
                    <p className="text-2xl font-bold text-green-600">{clients?.reduce((sum, c: any) => sum + (c.metrics?.completedActionItems || 0), 0)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed Action Items</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-orange-500">
                    <span className="material-icons text-orange-600 text-4xl mb-2">pending_actions</span>
                    <p className="text-2xl font-bold text-orange-600">{clients?.reduce((sum, c: any) => sum + (c.metrics?.totalActionItems || 0) - (c.metrics?.completedActionItems || 0), 0)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending Action Items</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-purple-500">
                    <span className="material-icons text-purple-600 text-4xl mb-2">star</span>
                    <p className="text-2xl font-bold text-purple-600">{clients?.filter((c: any) => (c.collaborationScore?.overall || 0) >= 80).length || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">High-Performing Clients</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {clients && clients.length > 0 ? clients.slice(0, 10).map((client: any) => (
                    <div key={client.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{client.name}</h3>
                          <p className="text-sm text-gray-500">{client.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{client.collaborationScore?.overall || 0}</p>
                          <p className="text-xs text-gray-500">Collaboration Score</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Dashboard Visits</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{client.metrics?.dashboardVisits || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Action Items</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{client.metrics?.completedActionItems || 0}/{client.metrics?.totalActionItems || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Avg Response Time</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{client.metrics?.averageResponseTimeHours || 0}h</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Visit</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{client.metrics?.lastVisit ? new Date(client.metrics.lastVisit).toLocaleDateString() : 'Never'}</p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <span className="material-icons text-6xl text-gray-400 mb-4">analytics</span>
                      <p className="text-gray-500 dark:text-gray-400 mb-2 font-semibold">No analytics data yet</p>
                      <p className="text-sm text-gray-400">Add clients to start tracking engagement metrics</p>
                    </div>
                  )}
                  {clients && clients.length > 10 && (
                    <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                      Showing 10 of {clients.length} clients
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab Content */}
          {activeTab === 'payments' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-md" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}>
                <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
                  Payment Settings
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                  Configure your payment links so clients can support you directly
                </p>

                <iframe 
                  src="/payment-settings" 
                  className="w-full h-[600px] border-0 rounded-lg"
                  title="Payment Settings"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Client Details Modal */}
      <Dialog.Root open={isClientDetailsOpen} onOpenChange={(open) => {
        setIsClientDetailsOpen(open);
        if (!open) {
          // Reset add website form state when modal closes
          setIsAddingNewWebsite(false);
          setNewWebsiteName("");
          setNewWebsiteUrl("");
          setNewWebsiteAdminUrl("");
          setNewWebsiteThumbnail("");
          setEditingProjectIndex(null);
        }
      }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden z-50 animate-in zoom-in-95 duration-200">
            {selectedClient && (() => {
              // Get thumbnail URL (same logic as card display)
              let websiteUrlRaw = selectedClient.websiteUrl;
              if (Array.isArray(websiteUrlRaw)) {
                websiteUrlRaw = websiteUrlRaw.length > 0 ? websiteUrlRaw[0] : '';
              }
              let thumbnailUrl = websiteUrlRaw || '';

              // Check projects for thumbnail
              if (selectedClient.projects && Array.isArray(selectedClient.projects) && selectedClient.projects.length > 0) {
                const firstProject = selectedClient.projects[0];
                if (firstProject.thumbnail && typeof firstProject.thumbnail === 'string') {
                  if (firstProject.thumbnail.startsWith('data:image/') || firstProject.thumbnail.startsWith('http')) {
                    thumbnailUrl = firstProject.thumbnail;
                  }
                }
              }

              if (!thumbnailUrl || thumbnailUrl === '' || Array.isArray(thumbnailUrl)) {
                thumbnailUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedClient.name || 'Client')}&size=200&background=random`;
              }

              return (
                <>
                  {/* Header with gradient */}
                  <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6">
                    <Dialog.Title className="text-2xl font-bold text-white mb-2">
                      {isEditMode ? 'Edit Client Dashboard' : 'Client Dashboard Details'}
                    </Dialog.Title>
                    <p className="text-white/80 text-sm">
                      {isEditMode ? 'Update client information' : 'View and manage client information'}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {/* Thumbnail Gallery - Show ALL websites */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                        Website Thumbnails
                        {selectedClient.projects && selectedClient.projects.length > 0 && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xs rounded-full">
                            {selectedClient.projects.length} Website{selectedClient.projects.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </label>
                      {selectedClient.projects && Array.isArray(selectedClient.projects) && selectedClient.projects.length > 0 ? (
                        <div className="relative">
                          {/* Scrollable horizontal thumbnails */}
                          <div 
                            className="flex gap-3 overflow-x-auto overflow-y-visible pb-3"
                            style={{ 
                              scrollbarWidth: 'thin',
                              scrollbarColor: '#3b82f6 #e5e7eb'
                            }}
                          >
                            {selectedClient.projects.map((project: any, idx: number) => {
                              let projectThumbnail = '';
                              
                              // Get thumbnail for this specific project
                              if (project.thumbnail && typeof project.thumbnail === 'string') {
                                if (project.thumbnail.startsWith('data:image/') || 
                                    project.thumbnail.includes('/api/thumbnail/') ||
                                    project.thumbnail.includes('screenshot') ||
                                    project.thumbnail.startsWith('http')) {
                                  projectThumbnail = project.thumbnail;
                                }
                              }
                              
                              // Generate screenshot if no thumbnail
                              if (!projectThumbnail && project.url && typeof project.url === 'string') {
                                const websiteToCapture = project.url.startsWith('http') ? project.url : `https://${project.url}`;
                                projectThumbnail = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
                              }
                              
                              // Fallback
                              if (!projectThumbnail) {
                                projectThumbnail = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name || 'Website')}&size=200&background=random`;
                              }

                              // Show edit form for this project if it's being edited AND user clicked "Edit Website"
                              if (editingProjectIndex === idx && editedProjectName) {
                                return (
                                  <div key={`modal-edit-${idx}`} className="flex-shrink-0 w-80">
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border-2 border-blue-500 dark:border-blue-400">
                                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Edit Project</h4>
                                      
                                      {/* Project Name */}
                                      <div className="mb-3">
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                          Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          value={editedProjectName}
                                          onChange={(e) => setEditedProjectName(e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                          placeholder="Website name"
                                        />
                                      </div>

                                      {/* Project URL */}
                                      <div className="mb-3">
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                          URL <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                          type="url"
                                          value={editedProjectUrl}
                                          onChange={(e) => setEditedProjectUrl(e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                          placeholder="https://example.com"
                                        />
                                      </div>

                                      {/* Admin URL */}
                                      <div className="mb-3">
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                          Admin URL (optional)
                                        </label>
                                        <input
                                          type="url"
                                          value={editedProjectAdminUrl}
                                          onChange={(e) => setEditedProjectAdminUrl(e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                          placeholder="https://example.com/admin"
                                        />
                                      </div>

                                      {/* Thumbnail URL */}
                                      <div className="mb-3">
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                          Thumbnail URL
                                        </label>
                                        <input
                                          type="url"
                                          value={editedProjectThumbnail}
                                          onChange={(e) => setEditedProjectThumbnail(e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                          placeholder="https://..."
                                        />
                                        <button
                                          onClick={handleFetchProjectThumbnail}
                                          disabled={isFetchingProjectThumbnail}
                                          className="mt-2 w-full px-3 py-1.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors disabled:opacity-50"
                                        >
                                          {isFetchingProjectThumbnail ? 'Fetching...' : 'Fetch Thumbnail from URL'}
                                        </button>
                                      </div>

                                      {/* Preview */}
                                      {editedProjectThumbnail && (
                                        <div className="mb-3">
                                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            Preview
                                          </label>
                                          <img
                                            src={editedProjectThumbnail}
                                            alt="Preview"
                                            className="w-full h-24 object-cover rounded-lg"
                                            onError={(e) => {
                                              const target = e.target as HTMLImageElement;
                                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(editedProjectName || 'Website')}&size=200&background=6366f1`;
                                            }}
                                          />
                                        </div>
                                      )}

                                      {/* Buttons */}
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => {
                                            setEditingProjectIndex(null);
                                            setEditedProjectName("");
                                            setEditedProjectUrl("");
                                            setEditedProjectAdminUrl("");
                                            setEditedProjectThumbnail("");
                                          }}
                                          className="flex-1 px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={handleUpdateProject}
                                          disabled={isUpdating || !editedProjectName || !editedProjectUrl}
                                          className="flex-1 px-3 py-2 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                          {isUpdating ? 'Saving...' : 'Save'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              
                              // Normal display - click to show action menu
                              return (
                                <div key={`modal-thumb-${idx}`} className="flex-shrink-0 relative">
                                  <div 
                                    className="relative w-64 h-48 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-lg"
                                    onClick={() => {
                                      // Toggle action menu for this card
                                      if (editingProjectIndex === idx && !editedProjectName) {
                                        setEditingProjectIndex(null);
                                      } else {
                                        setEditingProjectIndex(idx);
                                        setEditedProjectName(""); // Empty means show menu, not edit form
                                      }
                                    }}
                                  >
                                    <img
                                      src={projectThumbnail}
                                      alt={project.name || `Website ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                      crossOrigin="anonymous"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name || 'Website')}&size=200&background=6366f1`;
                                      }}
                                    />
                                    {/* Website name overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                      <p className="text-white text-sm font-semibold truncate">{project.name}</p>
                                      {project.url && (
                                        <p className="text-white/70 text-xs truncate">{project.url}</p>
                                      )}
                                    </div>
                                    
                                    {/* Click indicator */}
                                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                                      <span className="material-icons text-white text-xs">more_vert</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          {/* Fixed position action popup - outside scroll container */}
                          {editingProjectIndex !== null && !editedProjectName && selectedClient.projects[editingProjectIndex] && (
                            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]" onClick={() => setEditingProjectIndex(null)}>
                              <div 
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 min-w-[280px] max-w-[90vw]"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {/* Show which website */}
                                <div className="mb-4 text-center">
                                  <p className="text-base font-bold text-gray-800 dark:text-gray-100">
                                    {selectedClient.projects[editingProjectIndex].name || `Website ${editingProjectIndex + 1}`}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {selectedClient.projects[editingProjectIndex].url}
                                  </p>
                                </div>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                                  What would you like to do?
                                </p>
                                <div className="flex flex-col gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const project = selectedClient.projects[editingProjectIndex];
                                      setEditedProjectName(project.name || "");
                                      setEditedProjectUrl(project.url || "");
                                      setEditedProjectAdminUrl(project.adminUrl || "");
                                      setEditedProjectThumbnail(project.thumbnail || "");
                                    }}
                                    className="w-full py-3 px-4 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center justify-center gap-2"
                                  >
                                    <span className="material-icons text-sm">edit</span>
                                    Edit Website
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const projectName = selectedClient.projects[editingProjectIndex].name || `Website ${editingProjectIndex + 1}`;
                                      const idx = editingProjectIndex;
                                      setEditingProjectIndex(null);
                                      handleDeleteProject(idx, projectName);
                                    }}
                                    disabled={isDeletingProject}
                                    className="w-full py-3 px-4 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                  >
                                    <span className="material-icons text-sm">delete</span>
                                    Delete Website
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingProjectIndex(null);
                                    }}
                                    className="w-full py-2 px-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mt-1"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Dot indicators */}
                          {selectedClient.projects.length > 1 && (
                            <div className="flex justify-center gap-1.5 mt-3">
                              {selectedClient.projects.map((_: any, idx: number) => (
                                <div
                                  key={`modal-dot-${idx}`}
                                  className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
                                />
                              ))}
                            </div>
                          )}

                          {/* Add New Website Button/Form */}
                          {isAddingNewWebsite ? (
                            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                                <span className="material-icons text-sm">add_circle</span>
                                Add New Website
                              </h4>
                              
                              {/* Website Name */}
                              <div className="mb-3">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                  Website Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={newWebsiteName}
                                  onChange={(e) => setNewWebsiteName(e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                                  placeholder="e.g., Client's Portfolio Site"
                                />
                              </div>

                              {/* Website URL with Fetch Thumbnail button */}
                              <div className="mb-3">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                  Website URL <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="url"
                                    value={newWebsiteUrl}
                                    onChange={(e) => setNewWebsiteUrl(e.target.value)}
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="https://example.com"
                                  />
                                  <button
                                    onClick={handleFetchNewWebsiteThumbnail}
                                    disabled={isFetchingNewWebsiteThumbnail || !newWebsiteUrl}
                                    className="px-4 py-2 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-1"
                                  >
                                    <span className="material-icons text-sm">photo_camera</span>
                                    {isFetchingNewWebsiteThumbnail ? 'Fetching...' : 'Fetch Thumbnail'}
                                  </button>
                                </div>
                              </div>

                              {/* Admin URL (optional) */}
                              <div className="mb-3">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                  Admin/CMS URL <span className="text-gray-400">(optional)</span>
                                </label>
                                <input
                                  type="url"
                                  value={newWebsiteAdminUrl}
                                  onChange={(e) => setNewWebsiteAdminUrl(e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                                  placeholder="https://example.com/wp-admin"
                                />
                              </div>

                              {/* Thumbnail Preview */}
                              {newWebsiteThumbnail && (
                                <div className="mb-3">
                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Thumbnail Preview
                                  </label>
                                  <img
                                    src={newWebsiteThumbnail}
                                    alt="Preview"
                                    className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(newWebsiteName || 'Website')}&size=200&background=22c55e`;
                                    }}
                                  />
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex gap-2 mt-4">
                                <button
                                  onClick={() => {
                                    setIsAddingNewWebsite(false);
                                    setNewWebsiteName("");
                                    setNewWebsiteUrl("");
                                    setNewWebsiteAdminUrl("");
                                    setNewWebsiteThumbnail("");
                                  }}
                                  className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleAddNewWebsiteToClient}
                                  disabled={isAddingWebsiteLoading || !newWebsiteName || !newWebsiteUrl}
                                  className="flex-1 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                                >
                                  <span className="material-icons text-sm">{isAddingWebsiteLoading ? 'hourglass_empty' : 'add'}</span>
                                  {isAddingWebsiteLoading ? 'Adding...' : 'Add Website'}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setIsAddingNewWebsite(true)}
                              className="mt-4 w-full px-4 py-3 border-2 border-dashed border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors flex items-center justify-center gap-2 font-semibold"
                            >
                              <span className="material-icons">add_circle</span>
                              Add New Website
                            </button>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                            <img
                              src={thumbnailUrl}
                              alt={selectedClient.name}
                              className="w-full h-full object-cover"
                              crossOrigin="anonymous"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedClient.name || 'Client')}&size=200&background=6366f1`;
                              }}
                            />
                          </div>
                          
                          {/* Add New Website Button/Form for clients with no projects */}
                          {isAddingNewWebsite ? (
                            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                                <span className="material-icons text-sm">add_circle</span>
                                Add New Website
                              </h4>
                              
                              {/* Website Name */}
                              <div className="mb-3">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                  Website Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={newWebsiteName}
                                  onChange={(e) => setNewWebsiteName(e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                  placeholder="e.g., Client's Portfolio Site"
                                />
                              </div>

                              {/* Website URL with Fetch Thumbnail button */}
                              <div className="mb-3">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                  Website URL <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="url"
                                    value={newWebsiteUrl}
                                    onChange={(e) => setNewWebsiteUrl(e.target.value)}
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="https://example.com"
                                  />
                                  <button
                                    onClick={handleFetchNewWebsiteThumbnail}
                                    disabled={isFetchingNewWebsiteThumbnail || !newWebsiteUrl}
                                    className="px-4 py-2 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-1"
                                  >
                                    <span className="material-icons text-sm">photo_camera</span>
                                    {isFetchingNewWebsiteThumbnail ? 'Fetching...' : 'Fetch Thumbnail'}
                                  </button>
                                </div>
                              </div>

                              {/* Admin URL (optional) */}
                              <div className="mb-3">
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                  Admin/CMS URL <span className="text-gray-400">(optional)</span>
                                </label>
                                <input
                                  type="url"
                                  value={newWebsiteAdminUrl}
                                  onChange={(e) => setNewWebsiteAdminUrl(e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                  placeholder="https://example.com/wp-admin"
                                />
                              </div>

                              {/* Thumbnail Preview */}
                              {newWebsiteThumbnail && (
                                <div className="mb-3">
                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Thumbnail Preview
                                  </label>
                                  <img
                                    src={newWebsiteThumbnail}
                                    alt="Preview"
                                    className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(newWebsiteName || 'Website')}&size=200&background=3b82f6`;
                                    }}
                                  />
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex gap-2 mt-4">
                                <button
                                  onClick={() => {
                                    setIsAddingNewWebsite(false);
                                    setNewWebsiteName("");
                                    setNewWebsiteUrl("");
                                    setNewWebsiteAdminUrl("");
                                    setNewWebsiteThumbnail("");
                                  }}
                                  className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleAddNewWebsiteToClient}
                                  disabled={isAddingWebsiteLoading || !newWebsiteName || !newWebsiteUrl}
                                  className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                                >
                                  <span className="material-icons text-sm">{isAddingWebsiteLoading ? 'hourglass_empty' : 'add'}</span>
                                  {isAddingWebsiteLoading ? 'Adding...' : 'Add Website'}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setIsAddingNewWebsite(true)}
                              className="mt-4 w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-semibold"
                            >
                              <span className="material-icons">add_circle</span>
                              Add New Website
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Client Profile Image */}
                    {isEditMode && (
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                          Client Profile Image <span className="text-xs text-gray-500">(optional)</span>
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                            {editedClientProfileImage ? (
                              <img src={editedClientProfileImage} alt="Client" className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-icons text-white text-2xl">person</span>
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setEditedClientProfileImage(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-semibold hover:file:bg-primary/20 cursor-pointer text-sm"
                          />
                        </div>
                      </div>
                    )}

                    {/* Client Profile Icon - Always visible and clickable */}
                    {!isEditMode && (
                      <div className="mb-6 flex flex-col items-center gap-3">
                        <div className="relative group">
                          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center overflow-hidden shadow-lg cursor-pointer">
                            {selectedClient.profileImage ? (
                              <img src={selectedClient.profileImage} alt={selectedClient.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-icons text-white text-5xl">person</span>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                            <span className="material-icons text-white text-2xl">photo_camera</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  const newImage = reader.result as string;
                                  setIsUpdating(true);
                                  try {
                                    const result = await api.patch(`/clients/${selectedClient.id}`, {
                                      name: selectedClient.name,
                                      email: selectedClient.email,
                                      category: selectedClient.category,
                                      profileImage: newImage
                                    });
                                    if (result.ok) {
                                      selectedClient.profileImage = newImage;
                                      queryClient.invalidateQueries({ queryKey: ['clients'] });
                                      await refetchClients();
                                      alert('✅ Profile image updated!');
                                    } else {
                                      alert('❌ Failed to update profile image');
                                    }
                                  } catch (error) {
                                    console.error('Failed to update profile image:', error);
                                    alert('❌ Error updating profile image');
                                  } finally {
                                    setIsUpdating(false);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Click to change photo</p>
                      </div>
                    )}

                    {/* Client Information Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Client Name {isEditMode && <span className="text-red-500">*</span>}
                        </label>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={editedClientName}
                            onChange={(e) => setEditedClientName(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white text-lg font-bold"
                            placeholder="Enter client name"
                          />
                        ) : (
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {selectedClient.name || 'N/A'}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Email Address {isEditMode && <span className="text-red-500">*</span>}
                        </label>
                        {isEditMode ? (
                          <input
                            type="email"
                            value={editedClientEmail}
                            onChange={(e) => setEditedClientEmail(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white text-lg"
                            placeholder="Enter email address"
                          />
                        ) : (
                          <p className="text-lg text-gray-900 dark:text-white">
                            {selectedClient.email || 'N/A'}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Phone Number
                        </label>
                        {isEditMode ? (
                          <input
                            type="tel"
                            value={editedClientPhone}
                            onChange={(e) => setEditedClientPhone(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white text-lg"
                            placeholder="+1 (555) 123-4567"
                          />
                        ) : (
                          <p className={`text-lg ${selectedClient.phone ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 italic'}`}>
                            {selectedClient.phone || 'Not added yet - Click "Update Info" to add'}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Best Person to Contact
                        </label>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={editedClientContactPerson}
                            onChange={(e) => setEditedClientContactPerson(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white text-lg"
                            placeholder="e.g., John Doe (CEO)"
                          />
                        ) : (
                          <p className={`text-lg ${selectedClient.contactPerson ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 italic'}`}>
                            {selectedClient.contactPerson || 'Not added yet - Click "Update Info" to add'}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Category
                        </label>
                        {isEditMode ? (
                          <Select.Root value={editedCategory} onValueChange={setEditedCategory}>
                            <Select.Trigger className="inline-flex w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white justify-between items-center">
                              <span className="flex items-center gap-2">
                                <span className="material-icons text-sm">category</span>
                                <Select.Value />
                              </span>
                              <Select.Icon>
                                <span className="material-icons">expand_more</span>
                              </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                              <Select.Content className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                                <Select.Viewport className="p-2">
                                  {['Business', 'E-commerce', 'Portfolio', 'Blog', 'Other'].map((cat) => (
                                    <Select.Item
                                      key={cat}
                                      value={cat}
                                      className="px-4 py-3 cursor-pointer hover:bg-primary/10 dark:text-white rounded-lg"
                                    >
                                      <Select.ItemText>{cat}</Select.ItemText>
                                    </Select.Item>
                                  ))}
                                </Select.Viewport>
                              </Select.Content>
                            </Select.Portal>
                          </Select.Root>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold">
                            <span className="material-icons text-sm">category</span>
                            {(selectedClient.category || 'Business').charAt(0).toUpperCase() + (selectedClient.category || 'Business').slice(1)}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Projects/Websites
                        </label>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg font-semibold">
                          <span className="material-icons text-sm">language</span>
                          {selectedClient.projects?.length || 0} Website{selectedClient.projects?.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    {/* Website URL - Show the actual clickable website */}
                    {(() => {
                      let originalUrl = selectedClient.originalWebsiteUrl;
                      if (Array.isArray(originalUrl) && originalUrl.length > 0) {
                        originalUrl = originalUrl[0];
                      }

                      // Fallback to first project URL if no originalWebsiteUrl
                      if (!originalUrl && selectedClient.projects?.length > 0) {
                        originalUrl = selectedClient.projects[0].url;
                      }

                      if (originalUrl) {
                        return (
                          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                            <div className="flex items-start gap-3">
                              <span className="material-icons text-primary">link</span>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Client Website URL</p>
                                <a
                                  href={originalUrl.startsWith('http') ? originalUrl : `https://${originalUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline break-all"
                                >
                                  {originalUrl}
                                </a>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  Click thumbnail to visit this site
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* Created Date */}
                    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <span className="material-icons text-primary">schedule</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Created</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {(() => {
                              try {
                                let dateValue = selectedClient.createdAt;
                                if (typeof dateValue === 'number' && dateValue > 1e12) {
                                  dateValue = Math.floor(dateValue / 1e6);
                                }
                                return new Date(dateValue).toLocaleString();
                              } catch {
                                return 'Recently';
                              }
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard URL */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        Dashboard URL
                      </label>
                      {(() => {
                        // Use the same fallback logic
                        const safeDashboardUrl = selectedClient.dashboardUrl
                          ? selectedClient.dashboardUrl
                          : selectedClient.name?.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-').concat('-dashboard') || `client-${selectedClient.id}-dashboard`;
                        return (
                          <a
                            href={`/client-dashboard/${safeDashboardUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline"
                          >
                            <span className="material-icons text-sm">open_in_new</span>
                            View Client Dashboard
                          </a>
                        );
                      })()}
                    </div>

                    {/* Client Ratings Section */}
                    <ClientRatingsSection clientId={selectedClient.id} clientProjects={selectedClient.projects} />

                    {/* Resources Section */}
                    <ClientResourcesSection clientId={selectedClient.id} />

                  </div>

                  {/* Action Buttons */}
                  <div className="sticky bottom-0 bg-white dark:bg-gray-900 px-8 py-6 border-t-2 border-gray-200 dark:border-gray-700 flex gap-4">
                    {isEditMode ? (
                      <>
                        <button
                          onClick={() => {
                            setIsEditMode(false);
                            // Reset to original values
                            setEditedClientName(selectedClient.name);
                            setEditedClientEmail(selectedClient.email);
                            setEditedCategory(selectedClient.category || 'Business');
                          }}
                          className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-bold flex items-center justify-center gap-2"
                        >
                          <span className="material-icons">close</span>
                          Cancel
                        </button>
                        <button
                          onClick={handleUpdateClient}
                          disabled={isUpdating}
                          className={`flex-1 px-6 py-4 ${isUpdating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-green-600'} text-white rounded-xl hover:shadow-xl transition-all duration-200 font-bold flex items-center justify-center gap-2`}
                        >
                          <span className="material-icons">{isUpdating ? 'hourglass_empty' : 'check_circle'}</span>
                          {isUpdating ? 'Saving...' : 'Save Changes'}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsEditMode(true);
                            setEditedClientName(selectedClient.name);
                            setEditedClientEmail(selectedClient.email);
                            setEditedClientPhone(selectedClient.phone || '');
                            setEditedClientContactPerson(selectedClient.contactPerson || '');
                            setEditedClientProfileImage(selectedClient.profileImage || '');
                            setEditedCategory(selectedClient.category || 'Business');
                          }}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-bold flex items-center justify-center gap-2"
                        >
                          <span className="material-icons">edit</span>
                          Update Info
                        </button>
                        <button
                          onClick={() => {
                            setIsClientDetailsOpen(false);
                            handleDeleteClient(selectedClient.id, selectedClient.name);
                          }}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-bold flex items-center justify-center gap-2"
                        >
                          <span className="material-icons">delete</span>
                          Delete Dashboard
                        </button>
                      </>
                    )}
                  </div>

                  <Dialog.Close asChild>
                    <button
                      className="absolute top-8 right-8 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      aria-label="Close"
                      onClick={() => {
                        setIsEditMode(false);
                      }}
                    >
                      <span className="material-icons">close</span>
                    </button>
                  </Dialog.Close>
                </>
              );
            })()}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Delete Sample Card Modal */}
      <Dialog.Root open={showSampleDeleteModal} onOpenChange={setShowSampleDeleteModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-50 animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Remove Sample Card?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This will remove the sample card from the {deleteSampleSection === 'recent' ? '"Recent Client Dashboards"' : '"Active Project Status"'} section.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSampleDeleteModal(false);
                    setDeleteSampleSection(null);
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (deleteSampleSection === 'recent') {
                      setShowRecentSampleCard(false);
                    } else if (deleteSampleSection === 'active') {
                      setShowActiveSampleCard(false);
                    }
                    setShowSampleDeleteModal(false);
                    setDeleteSampleSection(null);
                  }}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-all"
                aria-label="Close"
              >
                <span className="material-icons">close</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Invoice Modal */}
      <Dialog.Root open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden z-50 animate-in zoom-in-95 duration-200">
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{editingInvoiceId ? 'Edit Invoice' : 'Create Invoice'}</h2>
              
              <div className="space-y-4">
                {/* Client Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Client</label>
                  <Select.Root value={selectedClientId} onValueChange={setSelectedClientId}>
                    <Select.Trigger className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white flex justify-between items-center">
                      <Select.Value placeholder="Select a client..." />
                      <Select.Icon><span className="material-icons text-lg text-gray-400">expand_more</span></Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                        <Select.Viewport className="p-2">
                          {clients?.map((client) => (
                            <Select.Item key={client.id} value={client.id} className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white">
                              <Select.ItemText>{client.name} - {client.email}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Description</label>
                  <input
                    type="text"
                    value={invoiceDescription}
                    onChange={(e) => setInvoiceDescription(e.target.value)}
                    placeholder="e.g., Website Development - January 2024"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Line Items */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Line Items</label>
                  <div className="space-y-2">
                    {invoiceItems.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...invoiceItems];
                            updated[idx].description = e.target.value;
                            setInvoiceItems(updated);
                          }}
                          placeholder="Item description"
                          className="flex-1 px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white"
                        />
                        <input
                          type="number"
                          value={item.amount || ''}
                          onChange={(e) => {
                            const updated = [...invoiceItems];
                            updated[idx].amount = parseFloat(e.target.value) || 0;
                            setInvoiceItems(updated);
                          }}
                          placeholder="Amount"
                          className="w-32 px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white"
                        />
                        {invoiceItems.length > 1 && (
                          <button
                            onClick={() => setInvoiceItems(invoiceItems.filter((_, i) => i !== idx))}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          >
                            <span className="material-icons text-sm">delete</span>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => setInvoiceItems([...invoiceItems, {description: '', amount: 0}])}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <span className="material-icons text-sm">add</span>
                      Add Item
                    </button>
                  </div>
                  <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total: ${invoiceItems.reduce((sum, item) => sum + (item.amount || 0), 0).toFixed(2)}</p>
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={invoiceDueDate}
                    onChange={(e) => setInvoiceDueDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Status</label>
                  <Select.Root value={invoiceStatus} onValueChange={setInvoiceStatus}>
                    <Select.Trigger className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white flex justify-between items-center">
                      <Select.Value />
                      <Select.Icon><span className="material-icons text-lg text-gray-400">expand_more</span></Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                        <Select.Viewport className="p-2">
                          <Select.Item value="pending" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white">
                            <Select.ItemText>Pending</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="paid" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white">
                            <Select.ItemText>Paid</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="overdue" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white">
                            <Select.ItemText>Overdue</Select.ItemText>
                          </Select.Item>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!selectedClientId) {
                      alert('Please select a client');
                      return;
                    }
                    if (invoiceItems.length === 0 || invoiceItems.every(i => !i.description)) {
                      alert('Please add at least one line item');
                      return;
                    }

                    const totalAmount = invoiceItems.reduce((sum, item) => sum + (item.amount || 0), 0);
                    const invoice = {
                      id: editingInvoiceId || Date.now().toString(),
                      clientId: selectedClientId,
                      description: invoiceDescription,
                      items: invoiceItems.filter(i => i.description),
                      amount: totalAmount,
                      dueDate: invoiceDueDate,
                      status: invoiceStatus,
                      createdAt: editingInvoiceId ? invoices.find(i => i.id === editingInvoiceId)?.createdAt : Date.now(),
                      updatedAt: Date.now()
                    };

                    let updated;
                    if (editingInvoiceId) {
                      updated = invoices.map(i => i.id === editingInvoiceId ? invoice : i);
                    } else {
                      updated = [...invoices, invoice];
                    }

                    setInvoices(updated);
                    // ✅ DFINITY ONLY - No localStorage
                    setIsInvoiceModalOpen(false);
                  }}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  {editingInvoiceId ? 'Update Invoice' : 'Create Invoice'}
                </button>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-all" aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Task Edit/Delete Modal */}
      <Dialog.Root open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-50 animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Task Options</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedTask?.title}
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsTaskModalOpen(false);
                    setTaskTitle(selectedTask?.title || '');
                    setTaskDate(selectedTask?.date || '');
                    setTaskStatus(selectedTask?.status || 'todo');
                    setTaskAssignType(selectedTask?.assignType || 'client');
                    setTaskAssignedTo(selectedTask?.assignedTo || '');
                    setTaskLinks(selectedTask?.links || []);
                    setIsAddTaskOpen(true);
                  }}
                  className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <span className="material-icons">edit</span>
                  Edit Task
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete task "${selectedTask?.title}"?`)) {
                      setTasks(tasks.filter(t => t.title !== selectedTask?.title));
                      setIsTaskModalOpen(false);
                    }
                  }}
                  className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <span className="material-icons">delete</span>
                  Delete Task
                </button>
                <button
                  onClick={() => setIsTaskModalOpen(false)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-all"
                aria-label="Close"
              >
                <span className="material-icons">close</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Add Task Modal */}
      <Dialog.Root open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden z-50 animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6 flex-shrink-0">
              <Dialog.Title className="text-2xl font-bold text-white">Add New Task</Dialog.Title>
              <p className="text-white/80 text-sm mt-1">Create a task for a client or project</p>
            </div>
            <div className="p-8 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 #e5e7eb' }}>
              <div className="mb-6">
                <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                  <span className="material-icons text-primary" style={{ fontSize: '18px' }}>title</span>
                  <span>Task Title</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Review homepage design"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
              <div className="mb-6">
                <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                  <span className="material-icons text-primary" style={{ fontSize: '18px' }}>calendar_today</span>
                  <span>Due Date</span>
                </label>
                <input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white transition-all duration-200"
                />
              </div>
              <div className="mb-6">
                <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                  <span className="material-icons text-primary" style={{ fontSize: '18px' }}>flag</span>
                  <span>Status</span>
                </label>
                <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                  <img 
                    src={`/assets/notes-and-tasks-3d-icon/${taskStatus === 'todo' ? '16_Organize copy.png' : taskStatus === 'in-progress' ? '18_Focus Time copy.png' : taskStatus === 'waiting' ? '19_Reschedule copy.png' : '15_Milestone copy.png'}`}
                    alt=""
                    className="w-6 h-6"
                  />
                  <select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    className="border-0 bg-transparent focus:ring-0 focus:outline-none dark:text-white text-base cursor-pointer p-0 font-medium flex-1"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="waiting">Waiting</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                  <span className="material-icons text-primary" style={{ fontSize: '18px' }}>category</span>
                  <span>Assign To</span>
                </label>
                <Select.Root value={taskAssignType} onValueChange={(val: 'client' | 'project') => { setTaskAssignType(val); setTaskAssignedTo(''); }}>
                  <Select.Trigger className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white flex justify-between items-center">
                    <Select.Value />
                    <Select.Icon>
                      <span className="material-icons text-lg text-gray-400">expand_more</span>
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                      <Select.Viewport className="p-2">
                        <Select.Item value="client" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white">
                          <Select.ItemText>👤 Client</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="project" className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white">
                          <Select.ItemText>🌐 Project</Select.ItemText>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
              <div className="mb-6">
                <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                  <span className="material-icons text-primary" style={{ fontSize: '18px' }}>{taskAssignType === 'client' ? 'person' : 'web'}</span>
                  <span>{taskAssignType === 'client' ? 'Select Client' : 'Select Project'}</span>
                </label>
                <Select.Root value={taskAssignedTo} onValueChange={setTaskAssignedTo}>
                  <Select.Trigger className="w-full px-5 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white flex justify-between items-center">
                    <Select.Value placeholder={`Choose a ${taskAssignType}...`} />
                    <Select.Icon>
                      <span className="material-icons text-lg text-gray-400">expand_more</span>
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-64">
                      <Select.Viewport className="p-2">
                        {taskAssignType === 'client' ? (
                          clients && clients.length > 0 ? clients.map((client: any) => (
                            <Select.Item key={client.id} value={client.id} className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white">
                              <Select.ItemText>{client.name}</Select.ItemText>
                            </Select.Item>
                          )) : (
                            <div className="px-4 py-3 text-gray-500 text-sm">No clients available</div>
                          )
                        ) : (
                          clients && clients.length > 0 ? clients.flatMap((client: any) => 
                            client.projects && client.projects.length > 0 ? client.projects.map((project: any, idx: number) => (
                              <Select.Item key={`${client.id}-${idx}`} value={`${client.id}-${idx}`} className="px-4 py-3 hover:bg-primary/10 rounded-lg cursor-pointer dark:text-white">
                                <Select.ItemText>{project.name} ({client.name})</Select.ItemText>
                              </Select.Item>
                            )) : []
                          ) : (
                            <div className="px-4 py-3 text-gray-500 text-sm">No projects available</div>
                          )
                        )}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
              <div className="mb-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <label className="flex text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 items-center gap-2">
                  <span className="material-icons text-primary" style={{ fontSize: '18px' }}>attach_file</span>
                  <span>Attach Files (optional)</span>
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      {currentTaskLinkType === 'google-docs' && <img src="/assets/google-suit-icons/docs_2020q4_48dp.png" alt="" className="w-6 h-6" />}
                      {currentTaskLinkType === 'google-sheets' && <img src="/assets/google-suit-icons/sheets_2020q4_48dp.png" alt="" className="w-6 h-6" />}
                      {currentTaskLinkType === 'google-slides' && <img src="/assets/google-suit-icons/slides_2020q4_48dp.png" alt="" className="w-6 h-6" />}
                      {currentTaskLinkType === 'google-forms' && <span className="text-xl">📋</span>}
                      {currentTaskLinkType === 'google-drive' && <img src="/assets/google-suit-icons/google-drive.png" alt="" className="w-6 h-6" />}
                      <select
                        value={currentTaskLinkType}
                        onChange={(e) => setCurrentTaskLinkType(e.target.value)}
                        className="border-0 bg-transparent focus:ring-0 focus:outline-none dark:text-white text-base cursor-pointer p-0 font-medium"
                      >
                        <option value="google-docs">Docs</option>
                        <option value="google-sheets">Sheets</option>
                        <option value="google-slides">Slides</option>
                        <option value="google-forms">Forms</option>
                        <option value="google-drive">Drive</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="File name"
                      value={currentTaskLinkName}
                      onChange={(e) => setCurrentTaskLinkName(e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://docs.google.com/..."
                      value={currentTaskLinkUrl}
                      onChange={(e) => setCurrentTaskLinkUrl(e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white text-sm"
                    />
                    <button
                      onClick={() => {
                        if (currentTaskLinkName.trim() && currentTaskLinkUrl.trim()) {
                          setTaskLinks([...taskLinks, { type: currentTaskLinkType, name: currentTaskLinkName.trim(), url: currentTaskLinkUrl.trim() }]);
                          setCurrentTaskLinkName('');
                          setCurrentTaskLinkUrl('');
                        }
                      }}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold text-sm"
                    >
                      Add
                    </button>
                  </div>
                  {taskLinks.length > 0 && (
                    <div className="space-y-2 mt-3">
                      {taskLinks.map((link, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          {link.type === 'google-forms' ? (
                            <span>📋</span>
                          ) : (
                            <img 
                              src={`/assets/google-suit-icons/${link.type === 'google-docs' ? 'docs_2020q4_48dp.png' : link.type === 'google-sheets' ? 'sheets_2020q4_48dp.png' : link.type === 'google-slides' ? 'slides_2020q4_48dp.png' : 'google-drive.png'}`}
                              alt=""
                              className="w-4 h-4"
                            />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">{link.name}</p>
                            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary truncate">{link.url}</p>
                          </div>
                          <button
                            onClick={() => setTaskLinks(taskLinks.filter((_, i) => i !== idx))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-icons text-sm">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
              <button
                onClick={() => {
                  setIsAddTaskOpen(false);
                  setTaskTitle('');
                  setTaskDate('');
                  setTaskStatus('todo');
                  setTaskAssignedTo('');
                  setTaskLinks([]);
                  setCurrentTaskLinkName('');
                  setCurrentTaskLinkUrl('');
                }}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!taskTitle || !taskDate || !taskAssignedTo) {
                    alert('Please fill in all fields');
                    return;
                  }
                  let assignedToName = '';
                  if (taskAssignType === 'client') {
                    const client = clients?.find((c: any) => c.id === taskAssignedTo);
                    assignedToName = client?.name || 'Unknown';
                  } else {
                    const [clientId, projectIdx] = taskAssignedTo.split('-');
                    const client = clients?.find((c: any) => c.id === clientId);
                    const project = client?.projects?.[parseInt(projectIdx)];
                    assignedToName = (project as any)?.name || 'Unknown';
                  }
                  setTasks([...tasks, {
                    title: taskTitle,
                    date: new Date(taskDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    status: taskStatus,
                    assignType: taskAssignType,
                    assignedTo: taskAssignedTo,
                    assignedToName: assignedToName,
                    links: taskLinks
                  }]);
                  setIsAddTaskOpen(false);
                  setTaskTitle('');
                  setTaskDate('');
                  setTaskStatus('todo');
                  setTaskAssignedTo('');
                  setTaskLinks([]);
                  setCurrentTaskLinkName('');
                  setCurrentTaskLinkUrl('');
                }}
                className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Add Task
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-6 right-6 p-2 text-white/80 hover:text-white rounded-lg transition-all"
                aria-label="Close"
              >
                <span className="material-icons">close</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Create Invoice Modal */}
      <Dialog.Root open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-50 animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Invoice</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Client</label>
                  <select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white">
                    <option value="">Select a client</option>
                    {clients && clients.map((client: any) => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                  {selectedClientId && (() => {
                    const client = clients?.find((c: any) => c.id === selectedClientId);
                    return client ? (
                      <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-500 dark:border-blue-600">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">Client Information</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedClient(client);
                              setIsEditMode(true);
                              setEditedClientName(client.name || '');
                              setEditedClientEmail(client.email || '');
                              setEditedClientPhone((client as any).phone || '');
                              setEditedClientContactPerson((client as any).contactPerson || '');
                              setEditedClientProfileImage((client as any).profileImage || '');
                              setEditedCategory((client as any).category || 'Business');
                              setIsClientDetailsOpen(true);
                            }}
                            className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all flex items-center gap-1 text-xs font-semibold"
                            title="Edit client info"
                          >
                            <span className="material-icons" style={{ fontSize: '16px' }}>edit</span>
                            Edit
                          </button>
                        </div>
                        
                        {/* Client Thumbnail Cards */}
                        {client.projects && Array.isArray(client.projects) && client.projects.length > 0 && (
                          <div className="mb-4">
                            <div 
                              className="flex gap-1.5 overflow-x-auto pb-2"
                              style={{ 
                                scrollbarWidth: 'auto',
                                scrollbarColor: '#22c55e #dcfce7',
                                maxWidth: '100%'
                              }}
                            >
                              {client.projects.map((project: any, idx: number) => {
                                let projectThumbnail = '';
                                
                                // Get thumbnail for this specific project
                                if (project.thumbnail && typeof project.thumbnail === 'string') {
                                  if (project.thumbnail.startsWith('data:image/') || 
                                      project.thumbnail.includes('/api/thumbnail/') ||
                                      project.thumbnail.includes('screenshot') ||
                                      project.thumbnail.startsWith('http')) {
                                    projectThumbnail = project.thumbnail;
                                  }
                                }
                                
                                // Generate screenshot if no thumbnail
                                if (!projectThumbnail && project.url && typeof project.url === 'string') {
                                  const websiteToCapture = project.url.startsWith('http') ? project.url : `https://${project.url}`;
                                  projectThumbnail = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(websiteToCapture)}&width=400&height=300&output=image&file_type=jpg&wait_for_event=load&cache_ttl=2592000`;
                                }
                                
                                // Fallback
                                if (!projectThumbnail) {
                                  projectThumbnail = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name || 'Website')}&size=64&background=random`;
                                }
                                
                                return (
                                  <div key={`invoice-thumb-${idx}`} className="flex-shrink-0 relative group/thumb">
                                    <img
                                      alt={project.name || `Website ${idx + 1}`}
                                      className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                                      src={projectThumbnail}
                                      crossOrigin="anonymous"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name || 'Website')}&size=64&background=6366f1`;
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            
                            {/* Dot indicators */}
                            {client.projects.length > 1 && (
                              <div className="flex justify-center gap-1 mt-2">
                                {client.projects.map((_: any, idx: number) => (
                                  <div
                                    key={`invoice-dot-${idx}`}
                                    className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="space-y-3">
                          {client.email && (
                            <div className="flex items-center gap-2">
                              <span className="material-icons text-gray-600 dark:text-gray-400" style={{ fontSize: '18px' }}>email</span>
                              <a 
                                href={`mailto:${client.email}?subject=Invoice for ${client.name}&body=Hi ${client.name},%0D%0A%0D%0APlease find your invoice details below:%0D%0A%0D%0AAmount: $${invoiceAmount || '0.00'}%0D%0AStatus: ${invoiceStatus.charAt(0).toUpperCase() + invoiceStatus.slice(1)}%0D%0A%0D%0AThank you for your business!%0D%0A%0D%0ABest regards`}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                {client.email}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="material-icons text-gray-600 dark:text-gray-400" style={{ fontSize: '18px' }}>phone</span>
                            {(client as any).phone ? (
                              <a href={`tel:${(client as any).phone}`} className="text-gray-900 dark:text-white hover:underline">{(client as any).phone}</a>
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400 italic text-sm">No phone number</span>
                            )}
                          </div>
                          {client.projects && client.projects.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="material-icons text-gray-600 dark:text-gray-400" style={{ fontSize: '18px' }}>work</span>
                              <span className="text-gray-900 dark:text-white">{client.projects.length} project(s)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Amount ($)</label>
                  <input type="number" value={invoiceAmount} onChange={(e) => setInvoiceAmount(e.target.value)} placeholder="0.00" className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select value={invoiceStatus} onChange={(e) => setInvoiceStatus(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white">
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
              <button onClick={() => { const client = clients?.find((c: any) => c.id === selectedClientId); if (client) { setInvoices([...invoices, { id: Date.now(), clientId: selectedClientId, client: client.name, amount: parseFloat(invoiceAmount) || 0, status: invoiceStatus, date: new Date().toISOString() }]); setIsInvoiceModalOpen(false); setSelectedClientId(''); setInvoiceAmount(''); setInvoiceStatus('pending'); } }} className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold">Create Invoice</button>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-all" aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Add Resource Modal */}
      <Dialog.Root open={!!selectedProjectForComm && showResourceForm} onOpenChange={(open) => { if (!open) setSelectedProjectForComm(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-lg border-2 border-black dark:border-white shadow-2xl w-full max-w-lg z-50 animate-in zoom-in-95 duration-200">
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2 flex items-center gap-2">
                  <span className="material-icons text-2xl">add_link</span>
                  Add Resource Link
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Create a Google Workspace link for <strong>{selectedProjectForComm?.name}</strong>
                </p>
              </div>
              
              {/* Resource Type Selector */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Resource Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: 'google-docs', icon: '/assets/google-suit-icons/docs_2020q4_48dp.png', label: 'Docs' },
                    { type: 'google-sheets', icon: '/assets/google-suit-icons/sheets_2020q4_48dp.png', label: 'Sheets' },
                    { type: 'google-slides', icon: '/assets/google-suit-icons/slides_2020q4_48dp.png', label: 'Slides' },
                    { type: 'google-drive', icon: '/assets/google-suit-icons/google-drive.png', label: 'Drive' },
                    { type: 'google-keep', icon: '/assets/google-suit-icons/keep_48dp.png', label: 'Keep' },
                    { type: 'other', icon: null, label: 'Other' }
                  ].map(({ type, icon, label }) => (
                    <button
                      key={type}
                      onClick={() => setResourceType(type)}
                      className={`flex flex-col items-center gap-2 p-3 rounded border-2 transition-all ${
                        resourceType === type
                          ? 'border-black dark:border-white bg-gray-100 dark:bg-gray-700'
                          : 'border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {icon ? (
                        <img src={icon} alt={label} className="w-6 h-6" />
                      ) : (
                        <span className="material-icons text-lg text-gray-600 dark:text-gray-400">link</span>
                      )}
                      <span className="text-xs font-medium text-black dark:text-white">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Link Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={resourceTitle}
                  onChange={(e) => setResourceTitle(e.target.value)}
                  placeholder="e.g., Client Proposal, Meeting Notes"
                  className="w-full px-4 py-2 border-2 border-black dark:border-white rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>

              {/* URL Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Link URL <span className="text-red-600">*</span>
                </label>
                <input
                  type="url"
                  value={resourceUrl}
                  onChange={(e) => setResourceUrl(e.target.value)}
                  placeholder="https://docs.google.com/document/..."
                  className="w-full px-4 py-2 border-2 border-black dark:border-white rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedProjectForComm(null);
                    setResourceTitle('');
                    setResourceUrl('');
                  }}
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border-2 border-black dark:border-white text-black dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!resourceTitle.trim() || !resourceUrl.trim()) {
                      alert('Please fill in all required fields');
                      return;
                    }
                    
                    try {
                      await addResource.mutateAsync({
                        type: resourceType as 'google-docs' | 'google-sheets' | 'google-slides' | 'google-drive' | 'other',
                        title: resourceTitle.trim(),
                        links: [{
                          name: resourceTitle.trim(),
                          url: resourceUrl.trim()
                        }]
                      });
                      
                      // Reset and close
                      setResourceTitle('');
                      setResourceUrl('');
                      setResourceType('google-docs');
                      setSelectedProjectForComm(null);
                      
                      alert('✅ Resource added successfully!');
                    } catch (error) {
                      console.error('Error adding resource:', error);
                      alert('Failed to add resource. Please try again.');
                    }
                  }}
                  disabled={!resourceTitle.trim() || !resourceUrl.trim()}
                  className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span className="material-icons text-sm">add</span>
                  Add Resource
                </button>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white rounded transition-all" aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Document Modal - Removed for Analytics tab */}
      {/* <Dialog.Root open={_isDocumentModalOpen} onOpenChange={_setIsDocumentModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md z-50 animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Document Link</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Document Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={documentFile?.name || ''}
                    onChange={(e) => setDocumentFile({ name: e.target.value, size: 0 } as any)}
                    placeholder="e.g., Project Requirements.pdf"
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Link URL <span className="text-red-500">*</span></label>
                  <input
                    type="url"
                    value={(documentFile as any)?.url || ''}
                    onChange={(e) => setDocumentFile({ ...(documentFile || { name: '', size: 0 }), url: e.target.value } as any)}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Share with Client <span className="text-red-500">*</span></label>
                  <select value={documentClientId} onChange={(e) => setDocumentClientId(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white">
                    <option value="">Select a client...</option>
                    {clients && clients.map((client: any) => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={async () => {
                  if (!documentFile?.name || !(documentFile as any)?.url || !documentClientId) return alert('Fill all fields');
                  setUploadingDocument(true);
                  try {
                    const result = await api.post('/documents', {
                      fileName: documentFile.name,
                      fileUrl: (documentFile as any).url,
                      fileSize: 0,
                      clientId: documentClientId,
                      developerId: user?.id
                    });
                    if (result.ok) {
                      alert('✅ Link added!');
                      const docsResult = await api.get('/documents');
                      if (docsResult.ok && docsResult.data) {
                        setDocuments(Array.isArray(docsResult.data) ? docsResult.data : []);
                      }
                      queryClient.invalidateQueries({ queryKey: ['documents'] });
                      setIsDocumentModalOpen(false);
                      setDocumentFile(null);
                      setDocumentClientId('');
                    } else {
                      alert(`❌ ${result.error}`);
                    }
                    setUploadingDocument(false);
                  } catch (error) {
                    alert('❌ Failed to add link');
                    setUploadingDocument(false);
                  }
                }}
                disabled={uploadingDocument}
                className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-icons">{uploadingDocument ? 'hourglass_empty' : 'add_link'}</span>
                {uploadingDocument ? 'Adding...' : 'Add Link'}
              </button>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-all" aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root> */}

      {/* Material Icons Link */}
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </div>
  )
}
