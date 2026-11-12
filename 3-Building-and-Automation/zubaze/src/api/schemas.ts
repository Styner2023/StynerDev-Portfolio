/**
 * API Response Validation Schemas
 * 
 * Purpose: Validate API responses at runtime to catch format issues early
 * This prevents bugs like the 365-day "double-wrapped response" issue
 */

import { z } from 'zod';

/**
 * Standard API response wrapper
 * All backend endpoints should return this format:
 * { ok: true, data: T } or { ok: false, error: string }
 */
export const ApiResponseSchema = z.object({
  ok: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
});

export type ApiResponse<T = any> = {
  ok: boolean;
  data?: T;
  error?: string;
};

/**
 * Client Schema
 */
export const ClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  developerId: z.string(),
  inviteToken: z.string().optional(),
  clientUrl: z.string().optional(),
  dashboardUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
  assignedProjects: z.array(z.string()).optional(),
  createdAt: z.union([z.string(), z.number()]).optional(),
});

export type Client = z.infer<typeof ClientSchema>;

/**
 * Project Schema
 */
export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  cmsUrl: z.string().url().optional(),
  description: z.string().optional(),
  developerId: z.string(),
  createdAt: z.union([z.string(), z.number()]).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

// Re-export dashboard content schemas
export * from './schemas/dashboardContent';

/**
 * Validate API response and extract data
 * 
 * @example
 * const clients = validateApiResponse(response, z.array(ClientSchema));
 */
export function validateApiResponse<T>(
  response: unknown,
  dataSchema: z.ZodSchema<T>
): { ok: true; data: T } | { ok: false; error: string } {
  try {
    // First, validate the wrapper
    const wrapper = ApiResponseSchema.parse(response);
    
    if (!wrapper.ok) {
      return { ok: false, error: wrapper.error || 'API returned error' };
    }
    
    // Then validate the data field
    if (wrapper.data === undefined) {
      return { ok: false, error: 'API response missing data field' };
    }
    
    // Validate data against the expected schema
    const validatedData = dataSchema.parse(wrapper.data);
    
    return { ok: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ API Response Validation Error:', error.errors);
      return {
        ok: false,
        error: `Invalid response format: ${error.errors.map(e => e.message).join(', ')}`,
      };
    }
    
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
}

/**
 * Response format validator (logs warnings in dev mode)
 * Use this to catch double-wrapping issues
 */
export function checkResponseFormat(endpoint: string, data: unknown): void {
  if (process.env.NODE_ENV !== 'development') return;
  
  // Check for double-wrapping (the 365-day bug!)
  if (data && typeof data === 'object' && 'ok' in data && 'data' in data) {
    const nested = (data as any).data;
    if (nested && typeof nested === 'object' && 'ok' in nested && 'data' in nested) {
      console.error(
        `🚨 DOUBLE-WRAPPED RESPONSE DETECTED on ${endpoint}!`,
        '\nThis is the bug that caused 365 days of pain!',
        '\nResponse:', data
      );
    }
  }
  
  // Log response type info
  console.log(`📋 ${endpoint} response type:`, {
    type: Array.isArray(data) ? 'Array' : typeof data,
    isArray: Array.isArray(data),
    keys: typeof data === 'object' && data !== null ? Object.keys(data) : [],
    length: Array.isArray(data) ? data.length : 'N/A',
  });
}
