import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({channel, type}) => {
    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id} {/* ? mark to determine if the user exists */}
        </p>
    )

    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter( /* Object.values to get the real values */
            ({ user }) => user.id !== client.userID); 

            return (
                <div className="channel-preview__item single">
                    <Avatar 
                        image={members[0]?.user?.image}
                        name={members[0]?.user?.fullName}
                        size={24}
                    />
                    <p>{members[0]?.user?.fullName}</p>
                </div>
            )
    }

  return (
    <div className={
        channel?.id === activeChannel?.id
        ? 'channel-preview__wrapper__selected' /* If the channel is selected or not */
        : 'channel-preview__wrapper'
    }
    onClick={
        () => {
            console.log(channel);
        }
    }
    >
        {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  )
};

export default TeamChannelPreview