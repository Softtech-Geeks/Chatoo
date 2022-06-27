import React, { useState, useEffect } from 'react';
import { useChatContext, Avatar } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import axios from "axios";
import { PickerOverlay } from 'filestack-react';

import { CloseCreateChannel } from '../assets';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const fileApi = 'A1k2ydUGKQDCtHaCnNuwYz';

const EditProfile = ({ setIsEdit }) => {
    const { client } = useChatContext();
    const [isFile, setIsFile] = useState(false);
    const [isPicker, setIsPicker] = useState(false);
    const [image, setImage] = useState("");

    const editForm = {
        fullName: "",
        userName: "",
        phone: "",
        avatarURL: "",
    };

    const [form, setForm] = useState(editForm);

    const handleEdit = async (e) => {
        e.preventDefault();
        if ((form.avatarURL == '') && (form.fullName == '') && (form.phone == '') && (form.userName == ''))
            return MySwal.fire(<p>Please Enter at Least One Field</p>)

        await client.partialUpdateUser(
            {
                id: client.user.id,
                set:
                {
                    fullName: (form.fullName != '') ? form.fullName : client.user.fullName,
                    name: (form.userName != '') ? form.userName : client.user.name,
                    image: (form.avatarURL != '') ? form.avatarURL : client.user.image,
                    phone: (form.phone != '') ? form.phone : client.user.phone
                }
            }
        );

        MySwal.fire(<p>User Updated Successfully</p>);
        setIsEdit(false);
        // window.location.reload();
    }

    // used to apply changes on the interface based on the input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form);
    };

    // use effect to display the avatar from the url when link changed
    useEffect(() => {
        if (form.avatarURL != "" && !isFile) {
            const img = document.createElement("img");
            img.src = form.avatarURL;
            img.width = 75;
            img.height = 75;
            img.alt = "image";
            img.id = "instavatar";
            img.style = "margin-top:10px";
            const old = document.getElementById("instavatar");
            document.querySelector(".avatar").replaceChild(img, old);
        } else if (form.avatarURL == "" && !isFile) {
            const img = document.createElement("img");
            img.src = form.avatarURL;
            img.id = "instavatar";
            const old = document.getElementById("instavatar");
            document.querySelector(".avatar").replaceChild(img, old);
        }
    }, [form.avatarURL]);

    return (
        <div className="create-channel__container" style={{ width: "100%" }}>
            <div className="auth__form-container">
                <div className="auth__form-container_fields">
                    <div className="auth__form-container_fields-content" style={{ overflow: "auto" }}>
                        <div className="create-channel__header">
                            <p>Edit Profile</p>
                            <CloseCreateChannel setIsEdit={setIsEdit} />
                        </div>
                        <p className='capitalize-me'>{client.user.name} Profile</p>
                        <Avatar image={client.user.image} name={client.user.fullName} size={125} />
                        <form onSubmit={handleEdit}>
                            <div className="auth__form-container_fields-content_input">
                                <p className='capitalize-me'>Full Name : {client.user.fullName}</p>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    style={{ display: "inline" }}
                                />
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <p className='capitalize-me'>User Name : {client.user.name}</p>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="User Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <p className='capitalize-me'>Phone Number : {client.user.phoneNumber}</p>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="norm">
                                <input
                                    type="checkbox"
                                    name="uploadImg"
                                    onChange={() => setIsFile(!isFile)}
                                />
                                <label htmlFor="uploadImg">Upload Picture</label>
                            </div>
                            {isFile && (
                                <div className="avatar img auth__form-container_fields-content_input">
                                    <label htmlFor="img">
                                        Upload your image (png, jpg, jpeg)
                                    </label>
                                    {
                                        image ? (
                                            <img
                                                src={image && image.filesUploaded[0].url}
                                                alt="imageUploded"
                                                style={{ width: 75, height: 75 }}
                                            />
                                        ) : (
                                            <div className="auth__form-container_fields-content_button">
                                                <button onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))}>Choose Image</button>
                                            </div>)
                                    }
                                    {
                                        isPicker && <PickerOverlay
                                            apikey={fileApi}
                                            onSuccess={(res) => {
                                                console.log(res)
                                                setImage(res);
                                                setForm({ ...form, avatarURL: res.filesUploaded[0].url });
                                                setIsPicker(false);
                                            }}
                                            onError={(res) => alert(res)}
                                            pickerOptions={{
                                                maxFiles: 1,
                                                accept: ["image/*"],
                                                errorsTimeout: 2000,
                                                maxSize: 1 * 1000 * 1000,
                                            }}
                                        />
                                    }

                                    <img src="" alt="" id="instavatar" />
                                </div>
                            )}
                            {
                                !isFile && (
                                    <div className="avatar auth__form-container_fields-content_input">
                                        <label htmlFor="avatarURL">Avatar URL</label>
                                        <input
                                            type="text"
                                            name="avatarURL"
                                            placeholder="Avatar URL"
                                            onChange={handleChange}
                                        />

                                        <img src="" alt="" id="instavatar" />
                                    </div>
                                )
                            }
                            <div className="auth__form-container_fields-content_button">
                                <button>Update</button>
                            </div>
                        </form>
                    </div></div></div>
        </div>
    );
}
export default EditProfile;