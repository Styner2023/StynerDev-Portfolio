/**
 * Mock Dashboard Content Data
 * 
 * For development and fallback when DFINITY is unavailable
 */

export const mockTimelineUpdates = [
  {
    id: 'update_1',
    clientId: 'client_1',
    developerId: 'dev_1',
    type: 'update' as const,
    title: 'Homepage Design Completed',
    content: 'The new homepage design has been finalized and is ready for your review. We\'ve incorporated all the feedback from our last meeting, including the updated color scheme and new hero section.',
    status: 'active' as const,
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
  },
  {
    id: 'update_2',
    clientId: 'client_1',
    developerId: 'dev_1',
    type: 'action-item' as const,
    title: 'Content Needed for About Page',
    content: 'To complete the About page, we need some information from you. Please provide the requested details by the end of this week.',
    actionItems: [
      'Company history (2-3 paragraphs)',
      'Team member photos and bios',
      'Mission statement',
      'Core values list'
    ],
    status: 'active' as const,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
  },
  {
    id: 'update_3',
    clientId: 'client_1',
    developerId: 'dev_1',
    type: 'note' as const,
    title: 'Reminder: Upcoming Review Meeting',
    content: 'Our scheduled review meeting is this Friday at 2 PM. We\'ll be going over the latest designs and discussing next steps for the project.',
    status: 'active' as const,
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
  }
];

export const mockResourceLinks = [
  {
    id: 'resource_1',
    clientId: 'client_1',
    developerId: 'dev_1',
    type: 'google-docs' as const,
    title: 'Brand Guidelines',
    links: [
      {
        name: 'Brand Style Guide',
        url: 'https://docs.google.com/document/d/example1'
      },
      {
        name: 'Logo Assets',
        url: 'https://docs.google.com/document/d/example2'
      }
    ],
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
  },
  {
    id: 'resource_2',
    clientId: 'client_1',
    developerId: 'dev_1',
    type: 'google-sheets' as const,
    title: 'Content Tracking',
    links: [
      {
        name: 'Website Content Sheet',
        url: 'https://docs.google.com/spreadsheets/d/example1'
      }
    ],
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
  },
  {
    id: 'resource_3',
    clientId: 'client_1',
    developerId: 'dev_1',
    type: 'google-drive' as const,
    title: 'Image Assets',
    links: [
      {
        name: 'Product Photos',
        url: 'https://drive.google.com/drive/folders/example1'
      },
      {
        name: 'Team Photos',
        url: 'https://drive.google.com/drive/folders/example2'
      }
    ],
    createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
  }
];

export const mockDeveloperRatings = [
  {
    id: 'dev_rating_1',
    clientId: 'client_1',
    developerId: 'dev_1',
    rating: 5,
    categories: {
      communication: 5,
      quality: 5,
      timeliness: 4,
      professionalism: 5
    },
    feedback: 'Excellent work! Very responsive and delivered exactly what we needed.',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
  }
];

export const mockTemplateRatings = [
  {
    id: 'template_rating_1',
    clientId: 'client_1',
    developerId: 'dev_1',
    projectId: 'project_1',
    rating: 5,
    categories: {
      design: 5,
      usability: 5,
      functionality: 4,
      responsiveness: 5
    },
    feedback: 'Love the modern design! Works great on mobile.',
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000, // 20 days ago
  }
];

export const mockDashboardContent = {
  clientId: 'client_1',
  updates: mockTimelineUpdates,
  resources: mockResourceLinks,
  collaborationScore: 92,
  lastUpdated: Date.now()
};

export default {
  timelineUpdates: mockTimelineUpdates,
  resourceLinks: mockResourceLinks,
  developerRatings: mockDeveloperRatings,
  templateRatings: mockTemplateRatings,
  dashboardContent: mockDashboardContent
};
