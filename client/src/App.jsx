import React from "react";

/* Styles */
import "./App.css";

const cookies = new Cookies();

/* Important imports  */
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
/* Importing components */
import { ChannelContainer, ChannelListContainer, Auth } from "./components";

/* API key implementation from StreamAPI */
const apiKey = "793eydgeka9b";
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
	// used to display Auth component
	if (!authToken) {
		return <Auth />;
	}

	return (
		<div className="app__wrapper">
			<Chat client={client} theme="team light">
				{" "}
				{/* Channel container & Channel container list*/}
				<ChannelListContainer />
				<ChannelContainer />
			</Chat>
		</div>
	);
};

export default App;
