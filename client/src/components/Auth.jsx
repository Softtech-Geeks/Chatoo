// useState imported to change actions based on certin changes
import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import signinImage from "../assets/signup.jpg";

// react-icons used to provide different kinds of icons for react projects
import { FaUserCheck, FaUserPlus, FaPhone } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillFileImageFill } from "react-icons/bs";

// registration object
const initialState = {
	fullName: "",
	userName: "",
	phone: "",
	password: "",
	confirm: "",
	avatarURL: "",
	img: null,
};

// main function
const Auth = () => {
	// isSignup used to show if the user has account or not
	const [isSignup, setIsSignup] = useState(true);
	// isFile used to show if upload file checkbox is checked or not to display file input
	const [isFile, setIsFile] = useState(false);
	// form used to show the changes occured on registration object attributes
	const [form, setForm] = useState(initialState);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
	};

	// used to apply changes on the interface based on the input
	const handleChange = (e) => {
		if (e.target.name == "avatarURL") {
			setForm({ ...form, [e.target.name]: e.target.value });
			const img = document.createElement("img");
			img.src = form.avatarURL;
			img.width = 75;
			img.height = 75;
			img.alt = "image";
			img.id = "instavatar";
			img.style = "margin-top:10px";
			const old = document.getElementById("instavatar");
			return document.querySelector(".avatar").replaceChild(img, old);
		} else if (e.target.name != "img") {
			setForm({ ...form, [e.target.name]: e.target.value });
		} else {
			setForm({ ...form, [e.target.name]: e.target.files[0] });
			const img = document.createElement("img");
			img.src = URL.createObjectURL(form.img);
			img.width = 75;
			img.height = 75;
			img.alt = "image";
			img.id = "instfile";
			img.style = "margin-top:10px";
			const old = document.getElementById("instfile");
			return document.querySelector(".img").replaceChild(img, old);
		}
		console.log(form);
	};

	// used to switch between sign in and sign up pages
	const switchMode = () => {
		setIsSignup((prev) => !prev);
		setIsFile(false);
	};

	return (
		<div className="auth__form-container">
			<div className="auth__form-container_fields">
				<div className="auth__form-container_fields-content">
					<p>{isSignup ? "Sign Up" : "Sign In"}</p>
					<form onSubmit={handleSubmit}>
						{isSignup && (
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="fullName">Full Name</label>
								<input
									type="text"
									name="fullName"
									placeholder="Full Name"
									onChange={handleChange}
									style={{ display: "inline" }}
									required
								/>
								<FaUserPlus
									style={{
										color: "#005fff",
										marginLeft: "80%",
										marginTop: "-25px",
									}}
								/>
							</div>
						)}
						<div className="auth__form-container_fields-content_input">
							<label htmlFor="userName">User Name</label>
							<input
								type="text"
								name="userName"
								placeholder="User Name"
								onChange={handleChange}
								required
							/>
							<FaUserCheck
								style={{
									color: "#005fff",
									marginLeft: "80%",
									marginTop: "-25px",
								}}
							/>
						</div>
						{isSignup && (
							<>
								<div className="auth__form-container_fields-content_input">
									<label htmlFor="phoneNumber">Phone Number</label>
									<input
										type="tel"
										name="phone"
										placeholder="Phone Number"
										onChange={handleChange}
										required
									/>
									<FaPhone
										style={{
											color: "#005fff",
											marginLeft: "80%",
											marginTop: "-25px",
										}}
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
									<div className="img auth__form-container_fields-content_input">
										<label htmlFor="img">
											Upload your image (png, jpg, jpeg)
										</label>
										<input
											type="file"
											onChange={handleChange}
											name="img"
											accept="image/*"
											required
										/>
										<BsFillFileImageFill
											style={{
												color: "#005fff",
												marginLeft: "80%",
												marginTop: "-25px",
											}}
										/>
										<img src="" alt="" className="instfile" id="instfile" />
									</div>
								)}
								{!isFile && (
									<div className="avatar auth__form-container_fields-content_input">
										<label htmlFor="avatarURL">Avatar URL</label>
										<input
											type="text"
											name="avatarURL"
											placeholder="Avatar URL"
											onChange={handleChange}
											required
										/>
										<BsFillFileImageFill
											style={{
												color: "#005fff",
												marginLeft: "80%",
												marginTop: "-25px",
											}}
										/>
										<img src="" alt="" id="instavatar" />
									</div>
								)}
							</>
						)}
						<div className="auth__form-container_fields-content_input">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								placeholder="Password"
								onChange={handleChange}
								required
							/>
							<RiLockPasswordFill
								style={{
									color: "#005fff",
									marginLeft: "80%",
									marginTop: "-25px",
								}}
							/>
						</div>
						{isSignup && (
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="confirmPassword">Confirm Password</label>
								<input
									type="password"
									name="confirm"
									placeholder="Confirm Password"
									onChange={handleChange}
									required
								/>
								<RiLockPasswordFill
									style={{
										color: "#005fff",
										marginLeft: "80%",
										marginTop: "-25px",
									}}
								/>
							</div>
						)}
						<div className="auth__form-container_fields-content_button">
							<button>{isSignup ? "Sign Up" : "Sign In"}</button>
						</div>
					</form>
					<div className="auth__form-container_fields-account">
						<p>
							{isSignup ? "Already have account?" : "Don't have an account?"}
						</p>
						<span onClick={switchMode}>{isSignup ? "Sign In" : "Sign Up"}</span>
					</div>
				</div>
			</div>
			<div className="auth__form-container_image">
				<img src={signinImage} alt="sign in" />
			</div>
		</div>
	);
};

export default Auth;
