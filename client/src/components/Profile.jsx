import React, { useState, useEffect } from 'react';
import { useChatContext, Avatar } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import axios from "axios";

const cookies = new Cookies();

const Profile = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { client } = useChatContext();
    if (client.user.role == "admin") setIsAdmin(true);
    // console.log(client.activeChannels);
    // console.log(client.updateUser({ id: client.user.id, { set: { role: "admin" } } }));
    // console.log(client.listPermissions());
    // console.log(client.listRoles());

    const handleAdmin = async (e) => {
        e.preventDefault();
        // const { permissions } = await client.listPermissions(); // List of Permission objects
        // console.log(permissions);
        if (!isAdmin) {
            console.log(await client.partialUpdateUser(
                {
                    id: client.user.id,
                    set:
                        { role: "admin" }
                }
            ));
            setIsAdmin(true);
        } else {
            console.log(await client.partialUpdateUser(
                {
                    id: client.user.id,
                    set:
                        { role: "user" }
                }
            ));
            setIsAdmin(false);
        }
    }

    const { channel } = useChatContext();
    const registerToAll = async (e) => {
        e.preventDefault();
        var auth;
        // await client.partialUpdateUser(
        //     {
        //         id: client.user.id,
        //         set:
        //             { role: "admin" }
        //     }
        // );
        const response = await client.queryUsers(
            { id: { $ne: client.userID } }, //ne not equal with current user
            { id: 1 }
        );
        const originalUser = client.user;

        for (var user in response.users) {
            console.log(user);
            console.log(response.users[user]);
            client.disconnectUser();
            const URL = 'http://localhost:5000/auth';
            var userName = response.users[user].name;
            var password = response.users[user].hashedPassword;
            var full = response.users[user].fullName;
            var avatarURL = response.users[user].image;
            var phone = response.users[user].phoneNumber;
            const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/login`, {
                userName, password, fullName: full, phone, avatarURL,
            });

            auth = token;
            await client.connectUser({
                id: userId,
                name: response.users[user].name,
                fullName: fullName,
                image: response.users[user].image,
                hashedPassword: hashedPassword,
                phoneNumber: response.users[user].phoneNumber,
            }, auth);

            console.log(client.user.name);
            var chan = await client.queryChannels({
                type: 'team',
                members: { $in: [response.users[user].id] }
            });
            await client.partialUpdateUser(
                {
                    id: client.user.id,
                    set:
                        { role: "user" }
                }
            );
            if (chan.length == 0) {
                for (var c in chan) {
                    // console.log('channels : ');
                    // console.log(channel);
                    console.log(chan[c]);
                    await chan[c].addMembers([originalUser.id]);
                }
            }

            console.log(chan);
        }
        await client.disconnectUser();


        client.connectUser({
            id: originalUser.id,
            name: originalUser.name,
            fullName: originalUser.fullName,
            image: originalUser.image,
            hashedPassword: originalUser.hashedPassword,
            phoneNumber: originalUser.phoneNumber,
        }, cookies.get("token"));
    }

    return (
        <>
            <div className="auth__form-container" style={{ width: "100%" }}>
                <div className="auth__form-container_fields" style={{ width: "100%", overflow: "auto" }}>
                    <div className="auth__form-container_fields-content" style={{ overflow: "auto" }}>
                        <p className='capitalize-me'>{client.user.name} Profile</p>
                        <Avatar image={client.user.image} name={client.user.fullName} size={125} />
                        <p className='capitalize-me'>Full Name : {client.user.fullName}</p>
                        <p className='capitalize-me'>Role : {client.user.role}</p>
                        <p>Registered in : {client.user.created_at.slice(0, 10)}</p>
                        <p>User status : {(client.user.banned) ? 'Banned' : "Active"}{(client.user.online) ? ' Online' : " Offline"}</p>
                        <p>Last time active: {client.user.last_active.slice(0, 10)}</p>
                        {/* <form onSubmit={registerToAll}> */}
                        <form>
                            <div className="auth__form-container_fields-content_button">
                                {/* <button>{isAdmin ? "To Admin" : "To User"}</button> */}
                                {/* <button>Register to All</button> */}
                            </div>
                        </form>
                    </div></div></div>
        </>
    );
}

export default Profile;