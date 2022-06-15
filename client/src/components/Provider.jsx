import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../assets';

const Provider = ({ setIsProvider }) => {
    const { client } = useChatContext();
    // const { channel, watchers } = useChannelStateContext();    
    // const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([])

    const getChannels = async () => {
        const channels = await client.queryChannels({
            type: 'team',
            members: { $in: [client.userID] }
        });

        console.log(channels);
        if (channels.length) setTeamChannels(channels);
    }

    if (teamChannels.length == 0) getChannels();

    const initialForm = {
        jobTitle: "",
        field: "",
        organization: "",
        experience: 0,
        serviceDesc: "",
        channel: ''
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        if (form.channel == '')
            setForm({ ...form, channel: teamChannels[0].id });
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        await client.partialUpdateUser(
            {
                id: client.user.id,
                set:
                {
                    role: 'admin',
                }
            }
        );
        for (var e in teamChannels) {
            console.log(e);
            console.log(teamChannels[e]);
            if (teamChannels[e].id == form.channel) {
                await teamChannels[e].updatePartial({ set: { ServiceProvider: client.userID } });
                // .state.members.filter(({ user }) => user.id == client.userID);
                console.log('successful edit');
                console.log(teamChannels[e]);
            }
        }
        await client.partialUpdateUser(
            {
                id: client.user.id,
                set:
                {
                    role: 'ServiceProvider',
                    jobTitle: form.jobTitle,
                    field: form.field,
                    organization: form.organization,
                    experience: form.experience,
                    serviceDesc: form.serviceDesc
                }
            }
        );
        setIsProvider(false);
    }

    return (
        <div className="create-channel__container" style={{ width: "100%" }}>
            <div className="auth__form-container">
                <div className="auth__form-container_fields">
                    <div className="auth__form-container_fields-content" style={{ overflow: "auto" }}>
                        <div className="create-channel__header">
                            <p>Become a Provider</p>
                            <CloseCreateChannel setIsProvider={setIsProvider} />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="auth__form-container_fields-content_input">
                                <p>Job Title</p>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    placeholder="Job Title"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <p>Field</p>
                                <input
                                    type="text"
                                    name="field"
                                    placeholder="Field"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <p>Organization</p>
                                <input
                                    type="text"
                                    name="organization"
                                    placeholder="Organization"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <p>Experience Level</p>
                                <input
                                    type="number"
                                    name="experience"
                                    min={0}
                                    placeholder="experience"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <p>Service Description</p>
                                <textarea
                                    name="serviceDesc"
                                    placeholder="Service Description"
                                    onChange={handleChange}
                                    required></textarea>
                            </div>
                            {teamChannels &&
                                <div className="auth__form-container_fields-content_input">
                                    <p>Group Channel</p>
                                    <select name="channel" id="channel" onChange={handleChange}>
                                        {teamChannels.map((channel, k) => <option key={k}>{channel.id}</option>)}
                                    </select>
                                </div>
                            }
                            <div className="auth__form-container_fields-content_button">
                                <button>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Provider;