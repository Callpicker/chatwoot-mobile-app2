import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectAllInboxes } from '@/store/inbox/inboxSelectors';
import { BottomSheetType, setBottomSheetState } from '@/store/conversation/conversationHeaderSlice';
import { selectFilters } from '@/store/conversation/conversationFilterSlice';
import { BaseFilterOption, FilterBar } from '@/components-next';
import { AssigneeOptions, StatusOptions, SortOptions } from '@/types/common/ConversationStatus';
import { ScrollView } from 'react-native';
import i18n from '@/i18n';

export const ConversationFilterOptions: BaseFilterOption[] = [
  {
    type: 'assignee_type',
    options: AssigneeOptions,
    defaultFilter: i18n.t('CONVERSATION.FILTERS.ASSIGNEE_TYPE.OPTIONS.ALL'),
  },
  {
    type: 'status',
    options: StatusOptions,
    defaultFilter: i18n.t('CONVERSATION.FILTERS.STATUS.OPTIONS.OPEN'),
  },
  {
    type: 'sort_by',
    options: SortOptions,
    defaultFilter: i18n.t('CONVERSATION.FILTERS.SORT_BY.OPTIONS.LATEST'),
  },
];

export const ConversationFilterBar = () => {
  const dispatch = useAppDispatch();
  const inboxes = useAppSelector(selectAllInboxes);
  const selectedFilters = useAppSelector(selectFilters);

  const getInboxOptions = (inboxes: { id: number; name: string }[]) => {
    const options: Record<string, string> = {
      '0': i18n.t('FILTER.ALL_INBOXES'),
    };
    inboxes.forEach(inbox => {
      options[inbox.id] = inbox.name;
    });
    return options;
  };

  const dynamicFilterOptions = [
    ...ConversationFilterOptions,
    {
      type: 'inbox_id' as const,
      options: getInboxOptions(inboxes),
      defaultFilter: i18n.t('FILTER.ALL_INBOXES'),
    },
  ];

  const handleFilterButtonPress = (type: string) => {
    dispatch(setBottomSheetState(type as BottomSheetType));
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      <FilterBar
        allFilters={dynamicFilterOptions}
        selectedFilters={selectedFilters}
        onFilterPress={handleFilterButtonPress}
      />
    </ScrollView>
  );
};