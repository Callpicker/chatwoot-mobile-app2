import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, BackHandler } from 'react-native';
import Animated from 'react-native-reanimated';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { useChatWindowContext, useRefsContext } from '@/context';
import { LabelTag } from '@/svg-icons';
import { tailwind } from '@/theme';
import { Label } from '@/types';
import { BottomSheetBackdrop, Icon, SearchBar } from '@/components-next';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { filterLabels } from '@/store/label/labelSelectors';
import { conversationActions } from '@/store/conversation/conversationActions';
import { labelActions } from '@/store/label/labelActions'; // Import the labelActions
import i18n from '@/i18n';

import { LabelCell, LabelItem } from '@/components-next/label-section';

type LabelStackProps = {
  filteredLabels: Label[];
  selectedLabels: string[];
  handleLabelPress: (label: string) => void;
  isStandAloneComponent?: boolean;
};

const LabelStack = (props: LabelStackProps) => {
  const { filteredLabels, selectedLabels, isStandAloneComponent = true, handleLabelPress } = props;

  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false} style={tailwind.style('my-1 pl-3')}>
      {filteredLabels.map((value, index) => {
        return (
          <LabelCell
            key={index}
            {...{ value, index }}
            handleLabelPress={handleLabelPress}
            isActive={selectedLabels.includes(value.title)}
            isLastItem={index === filteredLabels.length - 1 && isStandAloneComponent ? true : false}
          />
        );
      })}
    </BottomSheetScrollView>
  );
};

interface LabelSectionProps {
  labels: string[];
}

export const ConversationLabelActions = (props: LabelSectionProps) => {
  const { labels } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const { conversationId } = useChatWindowContext();
  const dispatch = useAppDispatch();

  const [selectedLabels, setSelectedLabels] = useState(labels);

  const { addLabelSheetRef } = useRefsContext();

  useEffect(() => {
    const onBackPress = () => {
      if (addLabelSheetRef.current) {
        addLabelSheetRef.current.dismiss({ overshootClamping: true });
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  const allLabels = useAppSelector(state => filterLabels(state, ''));

  const filteredLabels = useAppSelector(state => filterLabels(state, searchTerm));

  const handleAddLabelPress = () => {
    addLabelSheetRef.current?.present();
  };

  const handleOnSubmitEditing = () => {
    addLabelSheetRef.current?.close();
  };

  const handleChangeText = (text: string) => {
    setSearchTerm(text);
  };

  const handleChange = (index: number) => {
    if (index === -1) {
      setSearchTerm('');
      dispatch(labelActions.fetchLabels());
    }
  };

  const handleAddOrUpdateLabels = async (label: string) => {
    setSelectedLabels(prevLabels => {
      const updatedLabels = prevLabels.includes(label)
        ? prevLabels.filter(item => item !== label)
        : [...prevLabels, label];

      dispatch(
        conversationActions.addOrUpdateConversationLabels({
          conversationId: conversationId,
          labels: updatedLabels,
        }),
      );

      return updatedLabels;
    });
  };

  const conversationLabels =
    allLabels && selectedLabels
      ? allLabels.filter(({ title }) => {
          return selectedLabels?.includes(title);
        })
      : [];

  return (
    <Animated.View>
      <Animated.View style={tailwind.style('pl-4')}>
        <Animated.Text
          style={tailwind.style(
            'text-sm font-inter-medium-24 leading-[16px] tracking-[0.32px] text-gray-700',
          )}>
          {i18n.t('CONVERSATION.ASSIGNEE.LABELS.TITLE')}
        </Animated.Text>
      </Animated.View>
      <Animated.View style={tailwind.style('flex flex-row flex-wrap pl-4')}>
        {conversationLabels.map((label, index) => (
          <LabelItem key={index} index={index} item={label} />
        ))}
        <Pressable
          onPress={handleAddLabelPress}
          style={({ pressed }) => [
            styles.labelShadow,
            tailwind.style(
              'flex flex-row items-center bg-white px-3 py-[7px] rounded-lg mr-2 mt-3',
              pressed ? 'bg-blue-100' : '',
            ),
          ]}>
          <Icon icon={<LabelTag />} size={16} />
          <Animated.Text
            style={tailwind.style(
              'text-md font-inter-medium-24 leading-[17px] tracking-[0.24px] pl-1.5 text-blue-800',
            )}>
            {i18n.t('CONVERSATION.ASSIGNEE.LABELS.ACTION')}
          </Animated.Text>
        </Pressable>
      </Animated.View>
      <BottomSheetModal
        ref={addLabelSheetRef}
        backdropComponent={BottomSheetBackdrop}
        handleIndicatorStyle={tailwind.style('overflow-hidden bg-blackA-A6 w-8 h-1 rounded-[11px]')}
        handleStyle={tailwind.style('p-0 h-4 pt-[5px]')}
        style={tailwind.style('rounded-[26px] overflow-hidden')}
        enablePanDownToClose
        snapPoints={[316]}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        onChange={handleChange}>
        <SearchBar
          isInsideBottomSheet
          onSubmitEditing={handleOnSubmitEditing}
          onChangeText={handleChangeText}
          placeholder={i18n.t("CONVERSATION.ASSIGNEE.LABELS.SEARCH_LABELS")}
          returnKeyLabel="done"
          returnKeyType="done"
        />
        <LabelStack
          filteredLabels={filteredLabels}
          selectedLabels={selectedLabels}
          isStandAloneComponent={allLabels.length > 3}
          handleLabelPress={handleAddOrUpdateLabels}
        />
        <Animated.View style={tailwind.style('items-start')}></Animated.View>
      </BottomSheetModal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  labelShadow: {
    shadowColor: '#00000040',
    shadowOffset: { width: 0, height: 0.15 },
    shadowRadius: 2,
    shadowOpacity: 0.35,
    elevation: 2,
  },
});
