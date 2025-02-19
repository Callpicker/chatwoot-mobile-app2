import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { LANGUAGES } from '@/constants';
import { TickIcon } from '@/svg-icons';
import { tailwind } from '@/theme';
import { useHaptic } from '@/utils';
import { Icon } from '@/components-next/common';
import i18n from '@/i18n';

export type LanguageItemType = {
  title: string;
  key: string;
};

type LanguageCellProps = {
  item: LanguageItemType;
  index: number;
  currentLanguage: string;
  onChangeLanguage: (locale: string) => void;
};

const LanguageCell = ({ item, index, currentLanguage, onChangeLanguage }: LanguageCellProps) => {
  const hapticSelection = useHaptic();
  const handlePress = () => {
    hapticSelection?.();
    onChangeLanguage(item.key);
  };

  const isLastItem = index ===  Object.keys(LANGUAGES).length - 1;
  const isSelected = currentLanguage === item.key;

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={tailwind.style('flex flex-row items-center')}>
        <Animated.View
          style={tailwind.style(
            'flex-1 ml-3 flex-row justify-between py-[11px] pr-3',
            !isLastItem && 'border-b-[1px] border-blackA-A3',
          )}>
          <Animated.Text
            style={tailwind.style(
              'text-base capitalize text-gray-950 font-inter-420-20 leading-[21px] tracking-[0.16px]',
            )}>
            {item.title}
          </Animated.Text>
          {isSelected && <Icon icon={<TickIcon />} size={20} />}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export const LanguageList = ({
  currentLanguage,
  onChangeLanguage,
}: {
  currentLanguage: string;
  onChangeLanguage: (locale: string) => void;
}) => {
  const languagesList = useMemo(() => {
    return Object.keys(LANGUAGES).map((languageCode) => ({
      title: i18n.t(`LANGUAGES.${languageCode}`, {
        defaultValue: LANGUAGES[languageCode as keyof typeof LANGUAGES],
      }),
      key: languageCode,
    }));
  }, [i18n.language]);

  return (
    <Animated.View style={tailwind.style('pt-1 pb-4 pl-2')}>
      {languagesList.map((item, index) => (
        <LanguageCell key={item.key} {...{ item, index, currentLanguage, onChangeLanguage }} />
      ))}
    </Animated.View>
  );
};
