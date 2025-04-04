import React, { memo } from 'react';
import { ImageURISource } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import { isEqual } from 'lodash';

import { Avatar, AvatarStatusType } from '@/components-next/common';
import { AnimatedNativeView } from '@/components-next/native-components';
import { tailwind } from '@/theme';
import { AvailabilityStatus } from '@/types';

type ConversationAvatarProps = {
  src: ImageURISource;
  name: string;
  status: AvailabilityStatus; 
};

const checkIfPropsAreSame = (prev: ConversationAvatarProps, next: ConversationAvatarProps) => {
  const arePropsEqual = isEqual(prev, next);
  return arePropsEqual;
};

// eslint-disable-next-line react/display-name
export const ConversationAvatar = memo((props: ConversationAvatarProps) => {
  const { src, name, status } = props;
  const safeSrc = src?.uri ? src : undefined;
  return (
    <AnimatedNativeView
      style={tailwind.style('')}
      layout={LinearTransition.springify().damping(28).stiffness(200)}>
      <Avatar size="4xl" src={safeSrc} {...{ name, status: status as AvatarStatusType }} />
    </AnimatedNativeView>
  );
}, checkIfPropsAreSame);
