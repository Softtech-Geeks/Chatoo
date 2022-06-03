import React, { useState, useEffect } from 'react';
import { useChatContext, Avatar } from 'stream-chat-react';

const Profile = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { client } = useChatContext();
    // console.log(client.activeChannels);
    // console.log(client.updateUser({ id: client.user.id, { set: { role: "admin" } } }));
    // console.log(client.listPermissions());
    // console.log(client.listRoles());

    const handleSubmit = async (e) => {
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

    return (
        <>
            <div className="auth__form-container" style={{ width: "100%" }}>
                <div className="auth__form-container_fields" style={{ width: "100%" }}>
                    <div className="auth__form-container_fields-content">
                        <p>{client.user.fullName} Profile</p>

                        <form onSubmit={handleSubmit}>
                            <div className="auth__form-container_fields-content_button">
                                <button>{isAdmin ? "To Admin" : "To User"}</button>
                            </div>
                        </form>
                    </div></div></div>
        </>
    );
}

export default Profile;