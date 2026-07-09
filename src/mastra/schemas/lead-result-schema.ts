import { z } from 'zod';

export const leadResultSchema = z.object({
  lead_score: z.number().min(0).max(100),
  priority: z.enum(['low', 'medium', 'high']),
  summary: z.string(),
  recommended_follow_up: z.string(),
});

export type LeadResult = z.infer<typeof leadResultSchema>;
