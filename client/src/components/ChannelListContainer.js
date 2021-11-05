import React, { useState } from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import AxisIcon from '../assets/AxisLogo.png'
import logoutImg from '../assets/logout.png'
import ChannelSearch from './ChannelSearch'
import TeamChannelList from './TeamChannelList'
import TeamChannelPreview from './TeamChannelPreview'
import LogoText from '../assets/AxisTextLogo.png'

const cookies = new Cookies();

const SideBar = ({ logout }) => (

    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={AxisIcon} alt="Axis" width="50" height="50" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={logoutImg} alt="Logout" width="30" height="30" />
            </div>
        </div>
    </div>
)

const CompanyHeader = () => (
    <div className="channel-list__header">
        <img src={LogoText} alt="Logo" className="channel-list__header__text" />
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
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

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
           <SideBar logout={logout} />
           <div className="channel-list__list__wrapper">
               <CompanyHeader />
               <ChannelSearch setToggleContainer={setToggleContainer} />
               <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            isCreating = {isCreating}
                            setIsCreating = {setIsCreating}
                            setCreateType = {setCreateType}
                            setIsEditing = {setIsEditing}
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
               <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                            isCreating = {isCreating}
                            setIsCreating = {setIsCreating}
                            setCreateType = {setCreateType}
                            setIsEditing = {setIsEditing}
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
           </div>
        </>
    )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(true);

    return (
        <>
            <div className="channel-list__container">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing}
              />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#FA2D48"}}
            >
                <ChannelListContent 
                    setIsCreating={setIsCreating} 
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                    <div className="channel-list__container-toggle-button" />
                </div>
            </div>
        </>
    )

}

export default ChannelListContainer
