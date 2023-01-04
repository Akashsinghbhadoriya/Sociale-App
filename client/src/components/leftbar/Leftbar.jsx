import React from 'react'
import "./leftbar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import {Users} from "../../dummyData";
import Closefriends from '../closefriends/Closefriends';

function Leftbar() {
  return (
    <div className='leftbar'>
        <div className="leftbarWrapper">
          <ul className="leftbarList">
            <li className="leftbarListItem">
              <RssFeedIcon className='leftbarListItemIcon'/>
              <span className="leftbarListItemText">Feed</span>
            </li>
            <li className="leftbarListItem">
              <ChatIcon className='leftbarListItemIcon'/>
              <span className="leftbarListItemText">Chats</span>
            </li>
            <li className="leftbarListItem">
              <VideoLibraryIcon className='leftbarListItemIcon'/>
              <span className="leftbarListItemText">Videos</span>
            </li>
            <li className="leftbarListItem">
              <GroupsIcon className='leftbarListItemIcon'/>
              <span className="leftbarListItemText">Groups</span>
            </li>
            <li className="leftbarListItem">
              <BookmarksIcon className='leftbarListItemIcon'/>
              <span className="leftbarListItemText">Bookmarks</span>
            </li>
            <li className="leftbarListItem">
              <HelpOutlineIcon className='leftbarListItemIcon'/>
              <span className="leftbarListItemText">Questions</span>
            </li>
            <li className="leftbarListItem">
              <WorkIcon className='leftbarListItemIcon'/>
              <span className="leftbarListItemText">Jobs</span>
            </li>
            <li className="leftbarListItem">
              <EventIcon className='leftbarListItemIcon'/>
              <span className="leftbarListItemText">Events</span>
            </li>
            <li className="leftbarListItem">
              <SchoolIcon className='leftbarListItemIcon'/>
              <span className="leftbarListItemText">Courses</span>
            </li>
          </ul>
          <button className="leftbarButton">show more</button>
          <hr className='leftbarHr'/>
          <ul className="leftbarFriendList">
            {Users.map((user)=>(
              <Closefriends key={user.id} user={user}/>
            ))}
          </ul>
        </div>
    </div>
  )
}

export default Leftbar