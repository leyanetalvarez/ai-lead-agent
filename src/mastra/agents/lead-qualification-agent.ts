import { saveLeadTool } from '../tools/save-lead-tool';
import { Agent } from '@mastra/core/agent';
import { anthropic } from '@ai-sdk/anthropic';
import { companyEnrichmentTool } from '../tools/company-enrichment-tool';

export const leadQualificationAgent = new Agent({
  id: 'lead-qualification-agent',
  name: 'Lead Qualification Agent',
  instructions: `
You are an AI sales assistant for a software and AI automation agency.

Qualify sales leads based on:
- company fit
- urgency
- budget signals
- automation or AI needs
- message quality

Use the company enrichment tool when you need more information about the company.

Always respond with valid JSON only:
{
  "lead_score": number,
  "priority": "low" | "medium" | "high",
  "summary": "short explanation",
  "recommended_follow_up": "next action"
}
`,
  model: anthropic('claude-3-5-sonnet-20241022'),
  tools: {
    companyEnrichmentTool,
  },
});
