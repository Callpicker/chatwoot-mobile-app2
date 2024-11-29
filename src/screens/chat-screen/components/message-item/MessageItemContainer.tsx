import React from 'react';
import { Message } from '@/types';
// import { useAppDispatch, useAppSelector } from '@/hooks';
// import { selectConversationById } from '@/store/conversation/conversationSelectors';
import { useChatWindowContext } from '@/context';
// import { setQuoteMessage } from '@/store/conversation/sendMessageSlice';
// import { conversationActions } from '@/store/conversation/conversationActions';
import { INBOX_FEATURES, inboxHasFeature, is360DialogWhatsAppChannel, useHaptic } from '@/utils';
import { showToast } from '@/helpers/ToastHelper';
import i18n from '@/i18n';
import Clipboard from '@react-native-clipboard/clipboard';
import { MESSAGE_TYPES } from '@/constants';
import { CopyIcon, Trash } from '@/svg-icons';
import { MenuOption } from '@/components-next/chat/message-menu';
import { MessageItem } from './MessageItem';
// import { FlashListRenderProps } from '../MessagesList';

export const MessageItemContainer = (props: FlashListRenderProps) => {
  // const dispatch = useAppDispatch();
  // const { conversationId } = useChatWindowContext();
  // const conversationId = 29;
  const hapticSelection = useHaptic();
  // const conversation = useAppSelector(state => selectConversationById(state, conversationId));

  const handleQuoteReplyAttachment = () => {
    // dispatch(setQuoteMessage(props.item as Message));
  };

  const handleCopyMessage = (content: string) => {
    hapticSelection?.();
    if (content) {
      Clipboard.setString(content);
      showToast({ message: i18n.t('CONVERSATION.COPY_MESSAGE') });
    }
  };

  const handleDeleteMessage = (messageId: number) => {
    // dispatch(conversationActions.deleteMessage({ conversationId, messageId }));
  };

  const inboxSupportsReplyTo = (channel: string) => {
    const incoming = inboxHasFeature(INBOX_FEATURES.REPLY_TO, channel);
    const outgoing =
      inboxHasFeature(INBOX_FEATURES.REPLY_TO_OUTGOING, channel) &&
      !is360DialogWhatsAppChannel(channel);

    return { incoming, outgoing };
  };

  const getMenuOptions = (message: Message): MenuOption[] => {
    const { messageType, content, isPrivate, attachments } = message;
    const hasText = !!content;
    const hasAttachments = !!(attachments && attachments.length > 0);
    // const channel = conversation?.meta?.channel;
    const channel = 'whatsapp';
    const isDeleted = message.contentAttributes?.deleted;

    const menuOptions: MenuOption[] = [];
    if (messageType === MESSAGE_TYPES.ACTIVITY || isDeleted) {
      return [];
    }

    if (hasText) {
      menuOptions.push({
        title: 'Copy',
        icon: <CopyIcon />,
        handleOnPressMenuOption: () => handleCopyMessage(content),
        destructive: false,
      });
    }

    if (!isPrivate && channel && inboxSupportsReplyTo(channel).outgoing) {
      menuOptions.push({
        title: 'Reply',
        icon: null,
        handleOnPressMenuOption: handleQuoteReplyAttachment,
        destructive: false,
      });
    }

    if (hasAttachments || hasText) {
      menuOptions.push({
        title: 'Delete message',
        icon: <Trash />,
        handleOnPressMenuOption: () => handleDeleteMessage(message.id),
        destructive: true,
      });
    }

    return menuOptions;
  };

  return (
    <MessageItem
      item={props.item}
      // channel={conversation?.meta?.channel}
      channel="whatsapp"
      getMenuOptions={getMenuOptions}
    />
  );
};
