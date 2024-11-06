import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import type { NotificationResponse } from './notificationTypes';
import { Notification } from '@/types/Notification';
import { notificationActions } from './notificationAction';
import { updateBadgeCount } from '@/helpers/PushHelper';

export interface NotificationState {
  unreadCount: number;
  totalCount: number;
  currentPage: string;
  error: string | null;
  uiFlags: {
    isLoading: boolean;
  };
}

export const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.last_activity_at - a.last_activity_at,
});

const initialState = notificationsAdapter.getInitialState<NotificationState>({
  unreadCount: 0,
  totalCount: 0,
  currentPage: '1',
  error: null,
  uiFlags: {
    isLoading: false,
  },
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetNotifications: state => {
      notificationsAdapter.removeAll(state);
      state.unreadCount = 0;
      state.totalCount = 0;
      state.currentPage = '1';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch notifications
      .addCase(notificationActions.fetchNotifications.pending, state => {
        state.uiFlags.isLoading = true;
        state.error = null;
      })
      .addCase(
        notificationActions.fetchNotifications.fulfilled,
        (state, action: PayloadAction<NotificationResponse>) => {
          const {
            data: { meta, payload },
          } = action.payload;
          state.unreadCount = meta.unread_count;
          state.totalCount = meta.count;
          state.currentPage = meta.current_page;
          state.uiFlags.isLoading = false;
          updateBadgeCount({ count: meta.unread_count });
          if (meta.current_page === '1') {
            notificationsAdapter.setAll(state, payload);
          } else {
            notificationsAdapter.upsertMany(state, payload);
          }
        },
      )
      .addCase(notificationActions.fetchNotifications.rejected, (state, action) => {
        state.uiFlags.isLoading = false;
        state.error = (action.payload as string) ?? 'Failed to fetch notifications';
      });
  },
});

export const { resetNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
