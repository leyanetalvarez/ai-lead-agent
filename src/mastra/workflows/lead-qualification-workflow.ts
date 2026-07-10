import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import { leadQualificationAgent } from '../agents/lead-qualification-agent';
import { leadResultSchema } from '../schemas/lead-result-schema';
import { leadService } from '../services/lead-service';

const leadInputSchema = z.object({
  name: z.string(),
  company: z.string(),
  email: z.string().email(),
  website: z.string().optional(),
  message: z.string(),
});

const qualifyLeadStep = createStep({
  id: 'qualify-lead-step',
  inputSchema: leadInputSchema,
  outputSchema: z.object({
    lead: leadInputSchema,
    result: leadResultSchema,
    saved_lead_id: z.string(),
    storage: z.string(),
  }),
  execute: async ({ inputData }) => {
    const response = await leadQualificationAgent.generate([
      {
        role: 'user',
        content: `
Qualify this lead and use the company enrichment tool if useful:

Name: ${inputData.name}
Company: ${inputData.company}
Email: ${inputData.email}
Website: ${inputData.website ?? 'Not provided'}
Message: ${inputData.message}
`,
      },
    ]);

    const parsedResult = leadResultSchema.parse(JSON.parse(response.text));

    const savedLead = await leadService.saveLead(inputData, parsedResult);

    return {
      lead: inputData,
      result: parsedResult,
      saved_lead_id: savedLead.id,
      storage: savedLead.storage,
    };
  },
});

export const leadQualificationWorkflow = createWorkflow({
  id: 'lead-qualification-workflow',
  inputSchema: leadInputSchema,
  outputSchema: leadResultSchema,
})
  .then(qualifyLeadStep)
  .commit();