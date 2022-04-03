import React from 'react'

/* Styles */
import './App.css';

/* Important imports  */
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
/* Importing components */
import { ChannelContainer, ChannelListContainer } from './components'

/* API key implementation from StreamAPI */
const apiKey = '793eydgeka9b';

/* instance */
const client = StreamChat.getInstance(apiKey);


const App = () => {
  return (
    <div className='app__wrapper'>
      
      <Chat client={client} theme="team light"> {/* Channel container & Channel container list*/}
        <ChannelContainer />
        <ChannelListContainer />
      </Chat>
    </div>
  );
}

export default App