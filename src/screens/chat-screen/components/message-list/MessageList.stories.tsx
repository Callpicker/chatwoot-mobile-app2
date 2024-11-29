import { Meta, StoryObj } from '@storybook/react';
import { ScrollView } from 'react-native';
import { tailwind } from '@/theme';
import { MessagesList } from './MessagesList';
import { ALL_MESSAGES_MOCKDATA } from './messagesListMockdata';
import { useAppKeyboardAnimation } from '@/utils';
import { ChatWindowProvider } from '@/context';

const meta: Meta<typeof MessagesList> = {
  title: 'Messages List',
  component: MessagesList,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MessagesList>;

export const AllVariants: Story = {
  render: function AllVariantsComponent() {
    const { progress, height } = useAppKeyboardAnimation();

    return (
      <ChatWindowProvider conversationId={29}>
        <ScrollView contentContainerStyle={tailwind.style('flex')}>
          <MessagesList
            messages={ALL_MESSAGES_MOCKDATA}
            messageListRef={null}
            isFlashListReady={false}
            setFlashListReady={() => {}}
            onEndReached={() => {}}
            progress={progress}
            height={height}
          />
        </ScrollView>
      </ChatWindowProvider>
    );
  },
};
