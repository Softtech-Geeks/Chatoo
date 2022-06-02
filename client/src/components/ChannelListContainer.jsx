import React, { useState } from 'react';
/* importing componenets & Cookies */
import { Avatar, ChannelList, useChat, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { TeamChannelList, TeamChannelPreview, ChannelSearch, Dashboard, Profile } from './';
/* importing assets */
import ChatooIcon from '../assets/ChatooIcon.png'
import LogoutIcon from '../assets/logout.png'
import DashboardIcon from '../assets/dashboard.png'
//import { useState } from 'react/cjs/react.production.min';
import { initialState } from 'stream-chat-react/dist/components/Channel/channelState';

const cookies = new Cookies();

/* The sidebar or navigation-bar components*/
const SideBar = ({ logout, client, setIsProfile, setIsDashboard }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner" onClick={() => { setIsProfile(false); setIsDashboard(false); }}>
        <img src={ChatooIcon} alt="Chatoo" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={() => { setIsProfile(true); setIsDashboard(false); }}>
        <Avatar image={client.user.image} name={client.fullName || client.id} size={52} />
        {/* <img src={LogoutIcon} alt="Logout" width="30" /> */}
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={() => { setIsProfile(false); setIsDashboard(true); }}>
        <img src={DashboardIcon} alt="dashboard" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Chatoo</p>
  </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer, isProfile, isDashboard, setIsProfile, setIsDashboard }) => {
  const { client } = useChatContext();
  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  }

  const filters = { members: { $in: [client.userID] } }

  return (
    <>
      <SideBar logout={logout} client={client} setIsProfile={setIsProfile} setIsDashboard={setIsDashboard} />
      {isProfile &&
        <div className="channel__container">
          <Profile setIsProfile={setIsProfile} />
        </div>
      }
      {isDashboard &&
        <div className="channel__container">
          <Dashboard setIsDashboard={setIsDashboard} />
        </div>
      }
      {!isDashboard && !isProfile &&
        <div className="channel-list__list__wrapper">
          <CompanyHeader />
          <ChannelSearch setToggleContainer={setToggleContainer} />

          {/* Channel list for Group messages */}
          <ChannelList
            filters={filters}
            channelRenderFilterFn={customChannelTeamFilter}
            List={(listProps) => (
              <TeamChannelList
                {...listProps}
                type="team"
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            )}

            Preview={(previewProps) => (
              <TeamChannelPreview
                {...previewProps}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                type="team"
              />
            )}
          />
          {/* Channel list for Direct messages */}
          <ChannelList
            filters={filters}
            channelRenderFilterFn={customChannelMessagingFilter}
            List={(listProps) => (
              <TeamChannelList
                {...listProps}
                type="messaging"
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            )}

            Preview={(previewProps) => (
              <TeamChannelPreview
                {...previewProps}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                type="messaging"
              />
            )}
          />
        </div>}
    </>
  );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing, isProfile, isDashboard, setIsProfile, setIsDashboard }) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <>
      <div className='channel-list__container'>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          isProfile={isProfile}
          isDashboard={isDashboard}
          setIsProfile={setIsProfile}
          setIsDashboard={setIsDashboard}
        />
      </div>
      <div className='channel-list__container-responsive'
        style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff" }}
      >
        <div className='channel-list__container-toggle' onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
        </div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  )
}

export default ChannelListContainer;