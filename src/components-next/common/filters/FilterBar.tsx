import React from 'react';
import Animated, { LinearTransition, withTiming } from 'react-native-reanimated';
import { tailwind } from '@/theme';
import { FilterButton } from './FilterButton';
import i18n from '@/i18n';

// Generic type for filter options
export type BaseFilterOption = {
  type: string;
  options: Record<string, string>;
  defaultFilter: string;
};

type FilterBarProps = {
  allFilters: BaseFilterOption[];
  selectedFilters: Record<string, string>;
  onFilterPress: (type: string) => void;
};

export const FilterBar = ({ allFilters, selectedFilters, onFilterPress }: FilterBarProps) => {
  
  // Function to translate the options
  const translateOptions = (options: Record<string, string>, type: string) => {
    return Object.fromEntries(
      Object.entries(options).map(([key, value]) => [
        key,
        i18n.t(`CONVERSATION.FILTERS.${type.toUpperCase()}.OPTIONS.${value.toUpperCase()}`),
      ])
    );
  };

  // Row Exit Animation
  const exiting = () => {
    'worklet';
    const animations = { opacity: withTiming(0, { duration: 250 }) };
    const initialValues = { opacity: 1 };
    return { initialValues, animations };
  };

  // Translate all options before passing them to FilterButton
  const translatedFilters = allFilters.map(filter => {
    if (filter.type === 'assignee_type' || filter.type === 'status' || filter.type === 'sort_by') {
      return {
        ...filter,
        options: translateOptions(filter.options, filter.type),
        defaultFilter: i18n.t(`CONVERSATION.FILTERS.${filter.type.toUpperCase()}.OPTIONS.${filter.defaultFilter.toUpperCase()}`),
      };
    }
    return filter; // Don't translate inbox or any other filters
  });

  return (
    <Animated.View
      exiting={exiting}
      style={tailwind.style('px-3 pt-2 pb-1.5 h-[46px] flex flex-row')}>
      {translatedFilters.map((value, index) => (
        <Animated.View
          layout={LinearTransition.springify().stiffness(200).damping(24)}
          key={index}
          style={tailwind.style('pr-2')}>
          <FilterButton
            handleOnPress={() => onFilterPress(value.type)}
            allFilters={value}
            selectedFilters={selectedFilters}
          />
        </Animated.View>
      ))}
    </Animated.View>
  );
};
