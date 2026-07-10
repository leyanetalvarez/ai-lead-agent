import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const saveLeadTool = createTool({
  id: 'save-lead-tool',
  description: 'Saves qualified lead information for later CRM or database persistence.',
  inputSchema: z.object({
    name: z.string(),
    company: z.string(),
    email: z.string().email(),
    lead_score: z.number().min(0).max(100),
    priority: z.enum(['low', 'medium', 'high']),
    summary: z.string(),
    recommended_follow_up: z.string(),
  }),
  outputSchema: z.object({
    saved: z.boolean(),
    lead_id: z.string(),
    storage: z.string(),
  }),
  execute: async ({ context }) => {
    return {
      saved: true,
      lead_id: `lead_${Date.now()}`,
      storage: 'mock_storage',
    };
  },
});
