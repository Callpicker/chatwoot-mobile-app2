import type { Conversation } from '@/types';
import type { Message, UnixTimestamp } from '@/types';
import { format } from 'date-fns';
import { groupBy } from 'lodash';

import type { FilterState } from '@/store/conversation/conversationFilterSlice';

const filterByStatus = (chatStatus: string, filterStatus: string) =>
  filterStatus === 'all' ? true : chatStatus === filterStatus;

export const shouldApplyFilters = (conversation: Conversation, filters: FilterState) => {
  const { inbox_id: inboxId, status } = filters;
  const { status: chatStatus, inboxId: chatInboxId } = conversation;
  let shouldFilter = filterByStatus(chatStatus, status);
  const hasInboxFilter = inboxId && inboxId !== '0';
  if (hasInboxFilter) {
    const filterByInbox = Number(inboxId) === chatInboxId;
    shouldFilter = shouldFilter && filterByInbox;
  }

  return shouldFilter;
};

const getLastNonActivityMessage = (
  messageInStore: Message | null,
  messageFromAPI: Message | null,
): Message | null => {
  if (messageInStore && messageFromAPI) {
    return messageInStore.createdAt >= messageFromAPI.createdAt ? messageInStore : messageFromAPI;
  }
  return messageInStore || messageFromAPI;
};

export const filterDuplicateSourceMessages = (messages: Message[] = []): Message[] => {
  const messagesWithoutDuplicates: Message[] = [];
  messages.forEach(m1 => {
    if (m1.sourceId) {
      const index = messagesWithoutDuplicates.findIndex(m2 => m1.sourceId === m2.sourceId);
      if (index < 0) {
        messagesWithoutDuplicates.push(m1);
      }
    } else {
      messagesWithoutDuplicates.push(m1);
    }
  });
  return messagesWithoutDuplicates;
};

export const getLastMessage = (conversation: Conversation): Message | null => {
  const lastMessageIncludingActivity = conversation.messages[conversation.messages.length - 1];
  const nonActivityMessages = conversation.messages.filter(message => message.messageType !== 2);
  const lastNonActivityMessageInStore = nonActivityMessages[nonActivityMessages.length - 1];
  const lastNonActivityMessageFromAPI = conversation.lastNonActivityMessage;

  if (!lastNonActivityMessageInStore && !lastNonActivityMessageFromAPI) {
    return lastMessageIncludingActivity;
  }
  return getLastNonActivityMessage(lastNonActivityMessageInStore, lastNonActivityMessageFromAPI);
};

export const getReadMessages = (messages: Message[], agentLastSeenAt: number): Message[] => {
  return messages.filter(message => message.createdAt * 1000 <= agentLastSeenAt * 1000);
};

export const getUnreadMessages = (messages: Message[], agentLastSeenAt: number): Message[] => {
  return messages.filter(message => message.createdAt * 1000 > agentLastSeenAt * 1000);
};

// TODO: Add tests for this function
export const formatDate = (timestamp: UnixTimestamp): string => {
  const messageDate = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  const currentDate = new Date();

  const formatString =
    messageDate.getFullYear() !== currentDate.getFullYear() ? 'MMM dd, yyyy' : 'MMM dd';

  return format(messageDate, formatString);
};

export type SectionGroupMessages = {
  data: Message[];
  date: string;
};

// TODO: Add tests for this function
export const getGroupedMessages = (messages: Message[]): SectionGroupMessages[] => {
  const conversationGroupedByDate = groupBy(Object.values(messages), (message: Message) =>
    formatDate(message.createdAt),
  );
  return Object.keys(conversationGroupedByDate).map(date => {
    const groupedMessages = conversationGroupedByDate[date].map(
      (message: Message, index: number) => {
        let shouldRenderAvatar = false;
        if (index === conversationGroupedByDate[date].length - 1) {
          shouldRenderAvatar = true;
        } else {
          const nextMessage = conversationGroupedByDate[date][index + 1];
          const currentSender = message.sender ? message.sender.name : '';
          const nextSender = nextMessage.sender ? nextMessage.sender.name : '';
          shouldRenderAvatar =
            currentSender !== nextSender || message.messageType !== nextMessage.messageType;
        }
        return { shouldRenderAvatar, ...message };
      },
    );

    return {
      data: groupedMessages,
      date,
    };
  });
};
