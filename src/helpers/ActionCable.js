import BaseActionCableConnector from './BaseActionCableConnector';
import { store } from '@/store';
// import {
//   addOrUpdateMessage,
//   addConversation,
//   updateConversation,
//   updateConversationLastActivity,
// } from 'reducer/conversationSlice';
// import conversationActions from 'reducer/conversationSlice.action';
import { updateAgentsPresence } from 'reducer/inboxAgentsSlice';
import { setCurrentUserAvailability } from '@/store/auth/authSlice';
import { setTypingUsers, removeTypingUser } from '@/store/conversation/conversationTypingSlice';
import { addContact, updateContactsPresence } from '@/store/contact/contactSlice';
import { addNotification, removeNotification } from '@/store/notification/notificationSlice';

class ActionCableConnector extends BaseActionCableConnector {
  constructor(pubsubToken, webSocketUrl, accountId, userId) {
    super(pubsubToken, webSocketUrl, accountId, userId);
    this.CancelTyping = [];
    this.events = {
      'message.created': this.onMessageCreated,
      'message.updated': this.onMessageUpdated,
      'conversation.created': this.onConversationCreated,
      'conversation.status_changed': this.onStatusChange,
      'assignee.changed': this.onAssigneeChanged,
      'conversation.read': this.onConversationRead,
      'conversation.updated': this.onConversationUpdated,
      'presence.update': this.onPresenceUpdate,
      'conversation.typing_on': this.onTypingOn,
      'conversation.typing_off': this.onTypingOff,
      'notification.created': this.onNotificationCreated,
      'notification.deleted': this.onNotificationRemoved,
      // TODO: Handle all these events
      //   'conversation.contact_changed': this.onConversationContactChange,
      //   'contact.deleted': this.onContactDelete,
      //   'contact.updated': this.onContactUpdate,
      //   'conversation.mentioned': this.onConversationMentioned,
      //   'first.reply.created': this.onFirstReplyCreated,
    };
  }

  onMessageCreated = message => {
    // store.dispatch(addOrUpdateMessage(message));
    // const {
    //   conversation: { last_activity_at: lastActivityAt },
    //   conversation_id: conversationId,
    // } = message;
    // store.dispatch(updateConversationLastActivity({ lastActivityAt, conversationId }));
  };

  onMessageUpdated = data => {
    // store.dispatch(addOrUpdateMessage(data));
  };

  onConversationCreated = data => {
    // store.dispatch(addConversation(data));
    // store.dispatch(conversationActions.fetchConversationStats({}));
    // store.dispatch(addContact(data));
  };

  onStatusChange = data => {
    // store.dispatch(updateConversation(data));
    // store.dispatch(conversationActions.fetchConversationStats({}));
  };

  onAssigneeChanged = data => {
    const { id } = data;
    if (id) {
      // store.dispatch(updateConversation(data));
    }
    // store.dispatch(conversationActions.fetchConversationStats({}));
  };

  onConversationRead = data => {
    // store.dispatch(updateConversation(data));
  };

  onConversationUpdated = data => {
    const { id } = data;
    if (id) {
      // store.dispatch(updateConversation(data));
      store.dispatch(addContact(data));
    }
    // store.dispatch(conversationActions.fetchConversationStats({}));
  };

  onNotificationCreated = data => {
    store.dispatch(addNotification(data));
  };

  onNotificationRemoved = data => {
    store.dispatch(removeNotification(data));
  };

  onPresenceUpdate = ({ contacts, users }) => {
    // store.dispatch(
    //   updateAgentsPresence({
    //     users,
    //   }),
    // );
    // store.dispatch(
    //   updateContactsPresence({
    //     contacts,
    //   }),
    // );
    // store.dispatch(
    //   setCurrentUserAvailability({
    //     users,
    //   }),
    // );
  };

  onTypingOn = ({ conversation, user }) => {
    const conversationId = conversation.id;

    this.clearTimer(conversationId);

    store.dispatch(
      setTypingUsers({
        conversationId,
        user,
      }),
    );
    this.initTimer({ conversation, user });
  };

  onTypingOff = ({ conversation, user }) => {
    const conversationId = conversation.id;

    this.clearTimer(conversationId);

    store.dispatch(
      removeTypingUser({
        conversationId,
        user,
      }),
    );
  };

  initTimer = ({ conversation, user }) => {
    const conversationId = conversation.id;
    // Turn off typing automatically after 30 seconds
    this.CancelTyping[conversationId] = setTimeout(() => {
      this.onTypingOff({ conversation, user });
    }, 30000);
  };

  clearTimer = conversationId => {
    const timerEvent = this.CancelTyping.length && this.CancelTyping[conversationId];

    if (timerEvent) {
      clearTimeout(timerEvent);
      this.CancelTyping[conversationId] = null;
    }
  };
}

export default {
  init({ pubSubToken, webSocketUrl, accountId, userId }) {
    const actionCable = new ActionCableConnector(pubSubToken, webSocketUrl, accountId, userId);

    return actionCable;
  },
};
