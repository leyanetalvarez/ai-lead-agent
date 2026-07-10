import { LeadResult } from '../schemas/lead-result-schema';

export type LeadInput = {
  name: string;
  company: string;
  email: string;
  website?: string;
  message: string;
};

export type SavedLead = LeadInput &
  LeadResult & {
    id: string;
    created_at: string;
    storage: 'mock';
  };

const savedLeads: SavedLead[] = [];

export const leadService = {
  saveLead: async (lead: LeadInput, result: LeadResult): Promise<SavedLead> => {
    const savedLead: SavedLead = {
      id: `lead_${Date.now()}`,
      created_at: new Date().toISOString(),
      storage: 'mock',
      ...lead,
      ...result,
    };

    savedLeads.push(savedLead);

    return savedLead;
  },

  getLeads: async (): Promise<SavedLead[]> => {
    return savedLeads;
  },
};
