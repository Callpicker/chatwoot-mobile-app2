import i18n from '@/i18n';
export type ConversationStatus = 'open' | 'resolved' | 'pending' | 'snoozed' | 'all';

export type AllStatusTypes = ConversationStatus | 'all';

export type SortTypes = 'latest' | 'sort_on_created_at' | 'sort_on_priority';

export type AssigneeTypes = 'me' | 'unassigned' | 'all';

export type StatusCollection = { id: AllStatusTypes; icon: React.ReactNode };

export const AssigneeOptions: Record<AssigneeTypes, string> = {
  me: i18n.t('CONVERSATION.FILTERS.ASSIGNEE_TYPE.OPTIONS.ME'),
  unassigned: i18n.t('CONVERSATION.FILTERS.ASSIGNEE_TYPE.OPTIONS.UNASSIGNED'),
  all: i18n.t('CONVERSATION.FILTERS.ASSIGNEE_TYPE.OPTIONS.ALL'),
};

export const StatusOptions: Record<AllStatusTypes, string> = {
  all: i18n.t('CONVERSATION.FILTERS.STATUS.OPTIONS.ALL'),
  open: i18n.t('CONVERSATION.FILTERS.STATUS.OPTIONS.OPEN'),
  resolved: i18n.t('CONVERSATION.FILTERS.STATUS.OPTIONS.RESOLVED'),
  pending: i18n.t('CONVERSATION.FILTERS.STATUS.OPTIONS.PENDING'),
  snoozed: i18n.t('CONVERSATION.FILTERS.STATUS.OPTIONS.SNOOZED'),
};

export const SortOptions: Record<SortTypes, string> = {
  latest: i18n.t('CONVERSATION.FILTERS.SORT_BY.OPTIONS.LATEST'),
  sort_on_created_at: i18n.t('CONVERSATION.FILTERS.SORT_BY.OPTIONS.SORT_ON_CREATED_AT'),
  sort_on_priority: i18n.t('CONVERSATION.FILTERS.SORT_BY.OPTIONS.SORT_ON_PRIORITY'),
};

export const PriorityOptions: Record<string, string> = {
  none: 'None',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};
