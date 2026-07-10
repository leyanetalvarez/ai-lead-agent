import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const companyEnrichmentTool = createTool({
  id: 'company-enrichment-tool',
  description: 'Enriches company information using the company name and website.',
  inputSchema: z.object({
    company: z.string().describe('Company name'),
    website: z.string().optional().describe('Company website'),
  }),
  outputSchema: z.object({
    company: z.string(),
    website: z.string().optional(),
    industry: z.string(),
    company_size: z.string(),
    location: z.string(),
    enrichment_source: z.string(),
  }),
  execute: async (input) => {
    return {
      company: input.company,
      website: input.website,
      industry: 'Software / AI Automation',
      company_size: '11-50 employees',
      location: 'Remote / Unknown',
      enrichment_source: 'mock_data',
    };
  },
});