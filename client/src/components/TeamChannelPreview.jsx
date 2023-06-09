import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'
const TeamChannelPreview = ({ setActiveChannel, channel, type, setToggleContainer, setIsCreating, setisEditing }) => {

    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => (
        <p className='channel-preview__item'>
            #{channel?.data?.name || channel?.data?.id}
        </p>

    )
    const DirectPreview = () => {
        // destructuring user from members ({ user })
        const members = Object.values(channel.state.members).filter(({ user }) =>
            user.id !== client.userID);
        //excludes the user from direct message previews
        return (
            <>
                <div className='channel-preview__item single'>
                    <Avatar
                        image={members[0]?.user?.image}
                        name={members[0]?.user?.fullName || members[0]?.user?.id}
                        size={24}
                    />
                    <p> {members[0]?.user?.fullName}</p>
                </div>
            </>
        )
    }
    return (
        <>
            <div className={channel?.id === 'activeChannel'?.id
                ? 'channel-preview__wrapper-selected'
                : 'channel-preview__wrapper'
            }
                onClick={() => {
                    setIsCreating(false);
                    setisEditing(false);
                    setActiveChannel(channel)
                    if (setToggleContainer) {
                        setToggleContainer((prevState) => !prevState);
                    }
                }}
            >
                {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
            </div>
        </>
    )
}

export default TeamChannelPreview