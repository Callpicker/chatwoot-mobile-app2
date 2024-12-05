import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { tailwind } from '@/theme';
import { Channel, Message } from '@/types';
import { MenuOption } from '@/components-next/chat/message-menu';
import {
  AudioCell,
  ComposedCell,
  FileCell,
  ImageCell,
  VideoCell,
} from '@/components-next/chat/message-components';
import { TextMessageCell } from '@/components-next/chat/TextMessageCell';

type DateSectionProps = { item: { date: string } };

type MessageItemPresentationProps = {
  item: Message | { date: string };
  channel?: Channel;
  getMenuOptions: (message: Message) => MenuOption[];
};

const DateSection = ({ item }: DateSectionProps) => {
  return (
    <Animated.View style={tailwind.style('flex flex-row justify-center items-center py-5')}>
      <Animated.View style={tailwind.style('rounded-lg py-1 px-[7px] bg-blackA-A3')}>
        <Animated.Text
          style={tailwind.style(
            'text-cxs font-inter-420-20 tracking-[0.32px] text-blackA-A11 leading-[15px]',
          )}>
          {item.date}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export const MessageItem = ({ item, channel, getMenuOptions }: MessageItemPresentationProps) => {
  if ('date' in item) {
    return <DateSection item={item} />;
  }

  const isReplyMessage = item.contentAttributes?.inReplyTo;
  const attachments = item.attachments;

  // Message has only one attachment, no content and not a reply message
  if (attachments?.length === 1 && !item.content && !isReplyMessage) {
    const commonProps = {
      sender: item.sender,
      timeStamp: item.createdAt,
      shouldRenderAvatar: !!item.shouldRenderAvatar,
      messageType: item.messageType,
      status: item.status,
      isPrivate: !!item.private,
      channel,
      sourceId: item.sourceId,
      menuOptions: getMenuOptions(item),
    };

    switch (attachments[0].fileType) {
      case 'image':
        return <ImageCell {...commonProps} imageSrc={attachments[0].dataUrl} />;
      case 'audio':
        return <AudioCell {...commonProps} audioSrc={attachments[0].dataUrl} />;
      case 'video':
        return <VideoCell {...commonProps} videoSrc={attachments[0].dataUrl} />;
      case 'file':
        return <FileCell {...commonProps} fileSrc={attachments[0].dataUrl} />;
      default:
        return null;
    }
  }

  if (attachments?.length >= 1 || isReplyMessage) {
    return <ComposedCell messageData={item} channel={channel} menuOptions={getMenuOptions(item)} />;
  }

  if (item.content) {
    return <TextMessageCell item={item} channel={channel} menuOptions={getMenuOptions(item)} />;
  }

  return <View />;
};
