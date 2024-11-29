import React from 'react';
import { Platform } from 'react-native';
import { KeyboardGestureArea } from 'react-native-keyboard-controller';
import Animated, {
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import { tailwind } from '@/theme';
import { Message } from '@/types';
import { MessageItemContainer } from '../message-item';

export type FlashListRenderProps = {
  item: { date: string } | Message;
  index: number;
};

const AnimatedFlashlist = Animated.createAnimatedComponent(FlashList);
const PlatformSpecificKeyboardWrapperComponent =
  Platform.OS === 'android' ? Animated.View : KeyboardGestureArea;

type MessagesListPresentationProps = {
  messages: (Message | { date: string })[];
  messageListRef: React.RefObject<FlashList<Message>>;
  isFlashListReady: boolean;
  setFlashListReady: (ready: boolean) => void;
  onEndReached: () => void;
  progress: Animated.SharedValue<number>;
  height: Animated.SharedValue<number>;
};

export const MessagesList = ({
  messages,
  messageListRef,
  isFlashListReady,
  setFlashListReady,
  onEndReached,
  progress,
  height,
}: MessagesListPresentationProps) => {
  const handleRender = ({ item, index }: { item: Message | { date: string }; index: number }) => {
    return <MessageItemContainer item={item} index={index} />;
  };

  const animatedFlashlistStyle = useAnimatedStyle(() => {
    return {
      marginBottom: withSpring(interpolate(progress.value, [0, 1], [0, height.value]), {
        stiffness: 240,
        damping: 38,
      }),
    };
  });

  return (
    <PlatformSpecificKeyboardWrapperComponent
      style={tailwind.style('flex-1 bg-white')}
      interpolator="linear">
      <Animated.View
        layout={LinearTransition.springify().damping(38).stiffness(240)}
        style={[tailwind.style('flex-1 min-h-10'), animatedFlashlistStyle]}>
        <AnimatedFlashlist
          layout={LinearTransition.springify().damping(38).stiffness(240)}
          onScroll={() => {
            if (!isFlashListReady) {
              setFlashListReady(true);
            }
          }}
          ref={messageListRef}
          inverted
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
          renderItem={handleRender}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          data={messages}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item: { date: string } | Message) => {
            if ('date' in item) {
              return item.date.toString();
            } else if ('content' in item) {
              return item.id.toString();
            }
          }}
        />
      </Animated.View>
    </PlatformSpecificKeyboardWrapperComponent>
  );
};
