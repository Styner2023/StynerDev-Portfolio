/**
 * Dashboard Content Management Schemas
 * 
 * Schemas for managing client dashboard updates, feedback, and ratings
 */

import { z } from 'zod';

/**
 * Timeline Update Types
 */
export const TimelineUpdateType = z.enum(['update', 'action-item', 'note']);

/**
 * Timeline Update Schema
 * Updates that appear on the client's dashboard timeline
 */
export const TimelineUpdateSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  developerId: z.string(),
  type: TimelineUpdateType,
  title: z.string(),
  content: z.string(),
  actionItems: z.array(z.string()).optional(),
  status: z.enum(['active', 'completed', 'archived']).default('active'),
  createdAt: z.union([z.string(), z.number()]),
  updatedAt: z.union([z.string(), z.number()]).optional(),
});

export type TimelineUpdate = z.infer<typeof TimelineUpdateSchema>;

/**
 * Resource Link Schema
 * Shared resources (Google Docs, Sheets, etc.)
 */
export const ResourceLinkSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  developerId: z.string(),
  type: z.enum(['google-docs', 'google-sheets', 'google-slides', 'google-drive', 'other']),
  title: z.string(),
  links: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
  })),
  createdAt: z.union([z.string(), z.number()]),
});

export type ResourceLink = z.infer<typeof ResourceLinkSchema>;

/**
 * Developer Rating Schema
 * Client feedback on developer performance
 */
export const DeveloperRatingSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  developerId: z.string(),
  rating: z.number().min(1).max(5),
  categories: z.object({
    communication: z.number().min(1).max(5).optional(),
    quality: z.number().min(1).max(5).optional(),
    timeliness: z.number().min(1).max(5).optional(),
    professionalism: z.number().min(1).max(5).optional(),
  }).optional(),
  feedback: z.string().optional(),
  createdAt: z.union([z.string(), z.number()]),
  updatedAt: z.union([z.string(), z.number()]).optional(),
});

export type DeveloperRating = z.infer<typeof DeveloperRatingSchema>;

/**
 * Template Rating Schema
 * Client feedback on website template/design
 */
export const TemplateRatingSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  developerId: z.string(),
  projectId: z.string(), // Which website is being rated
  rating: z.number().min(1).max(5),
  categories: z.object({
    design: z.number().min(1).max(5).optional(),
    usability: z.number().min(1).max(5).optional(),
    functionality: z.number().min(1).max(5).optional(),
    responsiveness: z.number().min(1).max(5).optional(),
  }).optional(),
  feedback: z.string().optional(),
  createdAt: z.union([z.string(), z.number()]),
  updatedAt: z.union([z.string(), z.number()]).optional(),
});

export type TemplateRating = z.infer<typeof TemplateRatingSchema>;

/**
 * Dashboard Content Summary
 * Complete dashboard state for a client
 */
export const DashboardContentSchema = z.object({
  clientId: z.string(),
  updates: z.array(TimelineUpdateSchema),
  resources: z.array(ResourceLinkSchema),
  collaborationScore: z.number().min(0).max(100).optional(),
  lastUpdated: z.union([z.string(), z.number()]).optional(),
});

export type DashboardContent = z.infer<typeof DashboardContentSchema>;

/**
 * Action Item Status Update
 */
export const ActionItemStatusSchema = z.object({
  updateId: z.string(),
  clientId: z.string(),
  actionItemIndex: z.number(),
  completed: z.boolean(),
  completedAt: z.union([z.string(), z.number()]).optional(),
});

export type ActionItemStatus = z.infer<typeof ActionItemStatusSchema>;
