import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import { leadQualificationAgent } from '../agents/lead-qualification-agent';

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
    result: z.string(),
  }),
  execute: async ({ inputData }) => {
    const response = await leadQualificationAgent.generate([
      {
        role: 'user',
        content: `
Qualify this lead:

Name: ${inputData.name}
Company: ${inputData.company}
Email: ${inputData.email}
Website: ${inputData.website ?? 'Not provided'}
Message: ${inputData.message}
`,
      },
    ]);

    return {
      result: response.text,
    };
  },
});

export const leadQualificationWorkflow = createWorkflow({
  id: 'lead-qualification-workflow',
  inputSchema: leadInputSchema,
  outputSchema: z.object({
    result: z.string(),
  }),
})
  .then(qualifyLeadStep)
  .commit();
