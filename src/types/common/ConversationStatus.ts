export type ConversationStatus = 'open' | 'resolved' | 'pending' | 'snoozed' | 'all';

export type AllStatusTypes = ConversationStatus | 'all';

export type SortTypes = 'latest' | 'sort_on_created_at' | 'sort_on_priority';

export type AssigneeTypes = 'me' | 'unassigned' | 'all';

export type StatusCollection = { id: AllStatusTypes; icon: React.ReactNode };

export const AssigneeOptions: Record<AssigneeTypes, string> = {
  me: 'me',
  unassigned: 'unassigned',
  all: 'all',
};

export const StatusOptions: Record<AllStatusTypes, string> = {
  all: 'all',
  open: 'open',
  resolved: 'resolved',
  pending: 'pending',
  snoozed: 'snoozed',
};

export const SortOptions: Record<SortTypes, string> = {
  latest: 'latest',
  sort_on_created_at: 'sort_on_created_at',
  sort_on_priority: 'sort_on_priority',
};

export const PriorityOptions: Record<string, string> = {
  none: 'None',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};
