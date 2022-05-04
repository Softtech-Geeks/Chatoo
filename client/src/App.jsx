/* Important imports  */
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

/* Importing components */
import { ChannelContainer, ChannelListContainer, Auth } from "./components";

import React, {useState} from "react";

import 'stream-chat-react/dist/css/index.css';
import './App.css';

/* Styles */
import "./App.css";

const cookies = new Cookies();

/* API key implementation from StreamAPI */
const apiKey = "jwcz5fsyyybp";
const authToken = cookies.get("token");

/* instance */
const client = StreamChat.getInstance(apiKey);

/*Gets all data from by token */
if(authToken){
	client.connectUser({
		token: cookies.get('token'),
		username: cookies.get('username'),
		fullName: cookies.get('fullName'),
		userId: cookies.get('userId'),
		phoneNumber: cookies.get('phoneNumber'),
		avatarURL: cookies.get('avatarURL'),
		hashedPassword: cookies.get('hashedPassword'),
	}, authToken)
}

const App = () => {
	const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

	// used to display Auth component
	if (!authToken) {
		return <Auth />;
	}

	return (
		<div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
	);
};

export default App;
