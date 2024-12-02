import camelcaseKeys from 'camelcase-keys';
import { Message } from '@/types';
import { getGroupedMessages } from '@/utils';
import { flatMap } from 'lodash';

export const messagesListMockdata = {
  meta: {
    labels: [],
    additional_attributes: {
      browser: {
        device_name: 'Unknown',
        browser_name: 'Chrome',
        platform_name: 'macOS',
        browser_version: '119.0.0.0',
        platform_version: '10.15.7',
      },
      referer:
        'https://cdpn.io/cpe/boomboom/index.html?key=index.html-a53856e0-be6d-6a3b-1532-19b08d472acc',
      initiated_at: {
        timestamp: 'Tue Nov 28 2023 08:11:28 GMT+0530 (India Standard Time)',
      },
      browser_language: 'en',
    },
    contact: {
      additional_attributes: {
        city: '',
        country: '',
        description: '',
        company_name: '',
        country_code: '',
        social_profiles: {
          github: '',
          twitter: '',
          facebook: '',
          linkedin: '',
          instagram: '',
        },
      },
      custom_attributes: {},
      email: null,
      id: 1141,
      identifier: null,
      name: 'Merrile Petruk',
      phone_number: '',
      thumbnail: '',
      type: 'contact',
    },
    agent_last_seen_at: '2023-11-28T02:43:51.476Z',
    assignee_last_seen_at: null,
  },
  payload: [
    {
      id: 1,
      content: 'Good morning guys',
      inbox_id: 496,
      conversation_id: 29,
      message_type: 0,
      content_type: 'text',
      status: 'sent',
      content_attributes: {},
      created_at: 1695109376,
      private: false,
      source_id: null,
      sender: {
        id: 8,
        name: 'Muhsin Keloth',
        available_name: 'Muhsin Keloth',
        avatar_url:
          'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBLZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e89de2e9fa509fb65b6e7c1ccc36e8c1a68173ff/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--ce8d9b19491f8636c1337c68f260c671ad75441d/me.jpeg',
        type: 'user',
        availability_status: 'online',
        thumbnail:
          'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBLZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e89de2e9fa509fb65b6e7c1ccc36e8c1a68173ff/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--ce8d9b19491f8636c1337c68f260c671ad75441d/me.jpeg',
      },
    },
    {
      id: 2,
      content:
        'Chatwoot enables your team to be more productive, faster, and collaborate without switching apps.',
      inbox_id: 496,
      conversation_id: 29,
      message_type: 0,
      content_type: 'text',
      status: 'sent',
      content_attributes: {},
      created_at: 1695109376,
      private: false,
      source_id: null,
      sender: {
        id: 8,
        name: 'Muhsin Keloth',
        available_name: 'Muhsin Keloth',
        avatar_url:
          'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBLZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e89de2e9fa509fb65b6e7c1ccc36e8c1a68173ff/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--ce8d9b19491f8636c1337c68f260c671ad75441d/me.jpeg',
        type: 'user',
        availability_status: 'online',
        thumbnail:
          'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBLZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e89de2e9fa509fb65b6e7c1ccc36e8c1a68173ff/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--ce8d9b19491f8636c1337c68f260c671ad75441d/me.jpeg',
      },
    },
    {
      id: 3,
      content: 'Automation System added cloud',
      inbox_id: 496,
      conversation_id: 29,
      message_type: 2,
      content_type: 'text',
      status: 'sent',
      content_attributes: {},
      created_at: 1695109377,
      private: false,
      source_id: null,
    },
    {
      id: 4,
      content: 'Hey, Good morning!',
      inbox_id: 496,
      conversation_id: 29,
      message_type: 1,
      content_type: 'text',
      status: 'read',
      content_attributes: {},
      created_at: 1695109377,
      private: false,
      source_id: null,
      sender: {
        id: 138,
        name: 'Shane Watson',
        available_name: 'Shane Watson',
        avatar_url:
          'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbDBkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--34e96fee5401cc5ebd290cfaf83044f0f1689d45/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--ce8d9b19491f8636c1337c68f260c671ad75441d/shane.jpeg',
        type: 'user',
        availability_status: 'offline',
        thumbnail:
          'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbDBkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--34e96fee5401cc5ebd290cfaf83044f0f1689d45/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--ce8d9b19491f8636c1337c68f260c671ad75441d/shane.jpeg',
      },
    },
    {
      id: 14,
      content: 'Setup automation rules to handle all the grunt work.',
      inbox_id: 496,
      conversation_id: 29,
      message_type: 1,
      content_type: 'text',
      status: 'sent',
      content_attributes: {},
      created_at: 1701153887,
      private: true,
      sender: {
        id: 142,
        name: 'Merrile Petruk',
        available_name: 'Merrile Petruk',
        avatar_url:
          'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcGRZIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--396ceb13ebbab6db14b7810928d0450ba5069783/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--5f5542a6fcb9acc5e0cc0bc7d148ca5ee9eb6c6d/0.jpg',
        type: 'user',
        availability_status: 'offline',
        thumbnail:
          'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcGRZIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--396ceb13ebbab6db14b7810928d0450ba5069783/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--5f5542a6fcb9acc5e0cc0bc7d148ca5ee9eb6c6d/0.jpg',
      },
    },
    {
      id: 39,
      content: 'Now you can long press message to open Context Menu.💥',
      inbox_id: 496,
      conversation_id: 29,
      message_type: 0,
      content_type: 'text',
      status: 'read',
      content_attributes: {},
      created_at: 1704614990,
      private: false,
      source_id: null,
      sender: {
        id: 156,
        name: 'Donetta Johnson',
        available_name: 'Donetta Johnson',
        avatar_url:
          'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcDRkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--dfba2cf7fe2ede53e3dc9fae0dde19ef47e1f47f/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--ce8d9b19491f8636c1337c68f260c671ad75441d/image',
        type: 'user',
        availability_status: 'online',
        thumbnail:
          'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcDRkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--dfba2cf7fe2ede53e3dc9fae0dde19ef47e1f47f/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNIYVFINk1BPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--ce8d9b19491f8636c1337c68f260c671ad75441d/image',
      },
    },
    {
      id: 55917,
      content:
        'Hey there,\n\nThank you for reaching out to Paperlayer. Please join our discord server and post your query on our support channel https://discord.gg.\n\nHave a good day,\nShane',
      inbox_id: 333,
      conversation_id: 5,
      message_type: 1,
      content_type: 'text',
      status: 'sent',
      content_attributes: {},
      created_at: 1679996583,
      private: false,
      source_id: null,
    },
    {
      id: 55918,
      content: 'Conversation was marked resolved by Janice',
      inbox_id: 333,
      conversation_id: 5,
      message_type: 2,
      content_type: 'text',
      status: 'sent',
      content_attributes: {},
      created_at: 1679996583,
      private: false,
      source_id: null,
    },
    {
      id: 60695,
      content: 'Mathew M self-assigned this conversation',
      inbox_id: 333,
      conversation_id: 5,
      message_type: 2,
      content_type: 'text',
      status: 'sent',
      content_attributes: {},
      created_at: 1732242838,
      private: false,
      source_id: null,
    },
    {
      id: 60696,
      content: 'This message was deleted',
      inbox_id: 333,
      conversation_id: 5,
      message_type: 3,
      content_type: 'text',
      status: 'sent',
      content_attributes: {
        deleted: true,
      },
      created_at: 1732242838,
      private: false,
      source_id: null,
    },
    {
      id: 1925,
      content: null,
      account_id: 1,
      inbox_id: 2,
      conversation_id: 248,
      message_type: 1,
      created_at: 1731661946,
      updated_at: '2024-11-15T09:12:27.017Z',
      private: false,
      status: 'read',
      source_id: null,
      content_type: 'text',
      content_attributes: {},
      sender_type: 'User',
      sender_id: 1,
      external_source_ids: {
        slack: 'cw-origin-1731661946.889789',
      },
      additional_attributes: {},
      sentiment: {},
      conversation: {
        assignee_id: 1,
        unread_count: 0,
        last_activity_at: 1731661946,
        contact_inbox: {
          source_id: 'fa66b86d-7483-4b86-b9b3-b8b9953cef04',
        },
      },
      sender: {
        id: 1,
        name: 'Muhsin Keloth',
        available_name: 'Muhsin Keloth',
        avatar_url:
          'https://alfred-tunnel.chatwoot.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--41e959bf92ed59d8fcb7dd738bdf616ed4465a55/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--df796c2af3c0153e55236c2f3cf3a199ac2cb6f7/user-1.jpg',
        type: 'user',
        availability_status: 'offline',
        thumbnail:
          'https://alfred-tunnel.chatwoot.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--41e959bf92ed59d8fcb7dd738bdf616ed4465a55/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--df796c2af3c0153e55236c2f3cf3a199ac2cb6f7/user-1.jpg',
      },
      attachments: [
        {
          id: 695,
          message_id: 59099,
          file_type: 'image',
          account_id: 51,
          extension: null,
          data_url:
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2hpdGUlMjBiYWNrZ3JvdW5kJTIwZnVybml0dXJlfGVufDB8fDB8fHww',
          thumb_url:
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2hpdGUlMjBiYWNrZ3JvdW5kJTIwZnVybml0dXJlfGVufDB8fDB8fHww',
          file_size: 1807725,
        },
        {
          id: 695,
          message_id: 59099,
          file_type: 'image',
          account_id: 51,
          extension: null,
          data_url:
            'https://images.unsplash.com/photo-1687515006095-44d8a25b4440?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          thumb_url:
            'https://images.unsplash.com/photo-1687515006095-44d8a25b4440?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          file_size: 1807725,
        },
      ],
    },
    {
      id: 1926,
      content: null,
      account_id: 1,
      inbox_id: 2,
      conversation_id: 248,
      message_type: 1,
      created_at: 1731661946,
      updated_at: '2024-11-15T09:12:27.017Z',
      private: false,
      status: 'sent',
      source_id: null,
      content_type: 'text',
      content_attributes: {},
      sender_type: 'User',
      sender_id: 1,
      external_source_ids: {
        slack: 'cw-origin-1731661946.889789',
      },
      additional_attributes: {},
      sentiment: {},
      conversation: {
        assignee_id: 1,
        unread_count: 0,
        last_activity_at: 1731661946,
        contact_inbox: {
          source_id: 'fa66b86d-7483-4b86-b9b3-b8b9953cef04',
        },
      },
      sender: {
        id: 1,
        name: 'Muhsin Keloth',
        available_name: 'Muhsin Keloth',
        avatar_url:
          'https://alfred-tunnel.chatwoot.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--41e959bf92ed59d8fcb7dd738bdf616ed4465a55/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--df796c2af3c0153e55236c2f3cf3a199ac2cb6f7/user-1.jpg',
        type: 'user',
        availability_status: 'offline',
        thumbnail:
          'https://alfred-tunnel.chatwoot.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--41e959bf92ed59d8fcb7dd738bdf616ed4465a55/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--df796c2af3c0153e55236c2f3cf3a199ac2cb6f7/user-1.jpg',
      },
      attachments: [
        {
          id: 708,
          message_id: 59318,
          file_type: 'audio',
          account_id: 51,
          extension: null,
          data_url:
            'https://staging.chatwoot.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2VIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c9b2664c9a6091c6455b453ab3c86957818c757c/file_example_MP3_700KB.mp3',
          thumb_url: '',
          file_size: 733645,
        },
      ],
    },
    {
      id: 1927,
      content: null,
      account_id: 1,
      inbox_id: 2,
      conversation_id: 248,
      message_type: 1,
      created_at: 1731661946,
      updated_at: '2024-11-15T09:12:27.017Z',
      private: false,
      status: 'read',
      source_id: null,
      content_type: 'text',
      content_attributes: {},
      sender_type: 'User',
      sender_id: 1,
      external_source_ids: {
        slack: 'cw-origin-1731661946.889789',
      },
      additional_attributes: {},
      sentiment: {},
      conversation: {
        assignee_id: 1,
        unread_count: 0,
        last_activity_at: 1731661946,
        contact_inbox: {
          source_id: 'fa66b86d-7483-4b86-b9b3-b8b9953cef04',
        },
      },
      sender: {
        id: 1,
        name: 'Muhsin Keloth',
        available_name: 'Muhsin Keloth',
        avatar_url:
          'https://alfred-tunnel.chatwoot.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--41e959bf92ed59d8fcb7dd738bdf616ed4465a55/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--df796c2af3c0153e55236c2f3cf3a199ac2cb6f7/user-1.jpg',
        type: 'user',
        availability_status: 'offline',
        thumbnail:
          'https://alfred-tunnel.chatwoot.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--41e959bf92ed59d8fcb7dd738bdf616ed4465a55/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--df796c2af3c0153e55236c2f3cf3a199ac2cb6f7/user-1.jpg',
      },
      attachments: [
        {
          id: 707,
          message_id: 59317,
          file_type: 'video',
          account_id: 51,
          extension: null,
          data_url:
            'https://staging.chatwoot.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2FIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a80da05407ab40826cfdbef9c8c6770d979322dd/big_buck_bunny_720p_1mb.mp4',
          thumb_url: '',
          file_size: 1055736,
        },
      ],
    },
    {
      id: 19278,
      content: null,
      account_id: 1,
      inbox_id: 2,
      conversation_id: 248,
      message_type: 1,
      created_at: 1731661946,
      updated_at: '2024-11-15T09:12:27.017Z',
      private: false,
      status: 'sent',
      source_id: null,
      content_type: 'text',
      content_attributes: {},
      sender_type: 'User',
      sender_id: 1,
      external_source_ids: {
        slack: 'cw-origin-1731661946.889789',
      },
      additional_attributes: {},
      sentiment: {},
      conversation: {
        assignee_id: 1,
        unread_count: 0,
        last_activity_at: 1731661946,
        contact_inbox: {
          source_id: 'fa66b86d-7483-4b86-b9b3-b8b9953cef04',
        },
      },
      sender: {
        id: 1,
        name: 'Muhsin Keloth',
        available_name: 'Muhsin Keloth',
        avatar_url:
          'https://alfred-tunnel.chatwoot.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--41e959bf92ed59d8fcb7dd738bdf616ed4465a55/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--df796c2af3c0153e55236c2f3cf3a199ac2cb6f7/user-1.jpg',
        type: 'user',
        availability_status: 'offline',
        thumbnail:
          'https://alfred-tunnel.chatwoot.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBclFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--41e959bf92ed59d8fcb7dd738bdf616ed4465a55/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--df796c2af3c0153e55236c2f3cf3a199ac2cb6f7/user-1.jpg',
      },
      attachments: [
        {
          id: 697,
          message_id: 59151,
          file_type: 'file',
          account_id: 51,
          extension: null,
          data_url:
            'https://staging.chatwoot.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUNIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8d9f726bfe03d1d09308256473a30299a2002946/sample-indexing-beyond-the-basics.pdf',
          thumb_url:
            'https://staging.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUNIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8d9f726bfe03d1d09308256473a30299a2002946/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9UY21WemFYcGxYM1J2WDJacGJHeGJCMmtCK2pBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--31a6ed995cc4ac2dd2fa023068ee23b23efa1efb/sample-indexing-beyond-the-basics.pdf',
          file_size: 11880167,
        },
      ],
    },
    {
      id: 1928,
      content: 'Sure thing! What specific feature are you interested in learning more about?',
      inbox_id: 2,
      conversation_id: 248,
      message_type: 1,
      content_type: 'text',
      status: 'failed',
      content_attributes: {
        external_error:
          'Authentication failed. Confirm that the access token in the authorization header is valid.',
      },
      created_at: 1704694375,
      private: false,
      source_id: null,
      sender: {
        id: 2,
        name: 'Michael Scott',
        available_name: 'Michael Scott',
        avatar_url:
          'https://alfred-tunnel.chatwoot.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1645760c94016f2317bd374712226fc2ec4bc664/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--df796c2af3c0153e55236c2f3cf3a199ac2cb6f7/50.jpg',
        type: 'user',
        availability_status: 'offline',
        thumbnail:
          'https://alfred-tunnel.chatwoot.dev/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1645760c94016f2317bd374712226fc2ec4bc664/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWZvdyIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--df796c2af3c0153e55236c2f3cf3a199ac2cb6f7/50.jpg',
      },
    },
  ],
};

const MESSAGES_LIST_MOCKDATA = [...messagesListMockdata.payload].reverse();

const messages = MESSAGES_LIST_MOCKDATA.map(
  value => camelcaseKeys(value, { deep: true }) as unknown as Message,
);

const groupedMessages = getGroupedMessages(messages);

const allMessages = flatMap(groupedMessages, section => [...section.data, { date: section.date }]);

export const ALL_MESSAGES_MOCKDATA = allMessages;
