export interface Contact {
  id: number;
  name: string;
  phone: string;
  businessType: string;
  area: string;
  gstUdyam: string;
  topProducts: string[];
  purchaseHistory: number;
  rating: 1 | 2 | 3 | 4 | 5;
}

export enum LeadStatus {
  New = 'New',
  Qualified = 'Qualified',
  Quotation = 'Quotation',
  Negotiation = 'Negotiation',
  Won = 'Won',
  Lost = 'Lost',
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  source: string;
  value: number;
  followUpDate: string;
  status: LeadStatus;
  lostReason?: string;
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  contactId?: number;
  leadId?: number;
  completed: boolean;
  category: 'Follow-up' | 'Payment' | 'Meeting';
  priority?: 'High' | 'Medium' | 'Low';
  status: TaskStatus;
}

export interface Transaction {
  id: number;
  date: string;
  partyName: string;
  items: string;
  sale: number;
  purchase: number;
  expense: number;
  dues: number;
}

export interface Activity {
    id: number;
    description: string;
    timestamp: string;
}