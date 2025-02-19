import React from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { tailwind } from '@/theme';
import { INBOX_TYPES } from '@/constants';
import { Inbox } from '@/types/Inbox';
import { Conversation } from '@/types';
import i18n from '@/i18n';
import { REPLY_POLICY } from '@/constants/url';
import { openURL } from '@/helpers/UrlHelper';

type ReplyWarningProps = {
  inbox: Inbox;
  conversation: Conversation;
};

export const ReplyWarning = ({ inbox, conversation }: ReplyWarningProps) => {
  const { additionalAttributes = {}, settings = {} } = inbox;
  const channel = conversation?.meta?.channel;
  const isAPIChannel = channel === INBOX_TYPES.API;
  const isAWhatsappChannel = channel === INBOX_TYPES.WHATSAPP;
  const isGupshupAPIChannel = isAPIChannel && settings.typeApi === 'gupshup';

  const replyBannerMessage = () => {
    if (isAWhatsappChannel || isGupshupAPIChannel) {
      return i18n.t('BANNER.TWILIO_WHATSAPP_CAN_REPLY');
    }
    if (isAPIChannel) {
      return additionalAttributes?.agentReplyTimeWindowMessage ?? '';
    }

    return i18n.t('BANNER.CANNOT_REPLY');
  };

  const replyWindowLink = () => {
    if (isAWhatsappChannel || isGupshupAPIChannel) {
      return REPLY_POLICY.TWILIO_WHATSAPP;
    }

    return !isAPIChannel ? REPLY_POLICY.FACEBOOK : '';
  };

  const replyWindowLinkText = () => {
    if (isAWhatsappChannel || isGupshupAPIChannel) {
      return i18n.t('BANNER.24_HOURS_WINDOW');
    }

    return !isAPIChannel ? i18n.t('BANNER.TWILIO_WHATSAPP_24_HOURS_WINDOW') : '';
  };

  return (
    <Pressable style={tailwind.style('flex flex-row flex-wrap items-center px-4 py-3 bg-ruby-700 -z-10')}>
      <Animated.View style={tailwind.style('flex-1')}>
        <Animated.Text
          style={tailwind.style(
            'text-sm tracking-[0.32px] leading-[18px] font-inter-420-20 text-white flex-shrink-0'
          )}
        >
          {`${replyBannerMessage()} `}
          <Animated.Text
            onPress={() => openURL({ URL: replyWindowLink() })}
            style={tailwind.style(
              'text-sm tracking-[0.32px] leading-[18px] font-inter-420-20 text-white underline'
            )}
          >
            {replyWindowLinkText()}
          </Animated.Text>
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};
