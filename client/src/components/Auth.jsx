
// useState imported to change actions based on certin changes, useEffect used to addeventlisteners to html components
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

// image from assets folder
import signinImage from "../assets/signup.jpg";

const cookies = new Cookies();

// registration / login object
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

	// onSubmit function, getting url by login or signup, store all the data in cookies
	const handleSubmit = async(e) => {
		e.preventDefault();
		console.log(form);

		const {userName, password, phone, avatarURL} = form;

		const URL = 'http://localhost:5000/auth';

		const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            userName, password, fullName: form.fullName, phone, avatarURL,
        });

		cookies.set('token', token);
		cookies.set('username', userName);
		cookies.set('fullName', fullName);
		cookies.set('userId', userId);

		if(isSignup){
			cookies.set('phoneNumber', phone);
			cookies.set('avatarURL', avatarURL);
			cookies.set('hashedPassword', hashedPassword);
		}
		window.location.reload();
	};

	// use effect to display the avatar from the url when link changed
	useEffect(() => {
		if (form.avatarURL != "") {
			const img = document.createElement("img");
			img.src = form.avatarURL;
			img.width = 75;
			img.height = 75;
			img.alt = "image";
			img.id = "instavatar";
			img.style = "margin-top:10px";
			const old = document.getElementById("instavatar");
			document.querySelector(".avatar").replaceChild(img, old);
		} else {
			const img = document.createElement("img");
			img.src = form.avatarURL;
			img.id = "instavatar";
			const old = document.getElementById("instavatar");
			document.querySelector(".avatar").replaceChild(img, old);
		}
	}, [form.avatarURL]);

	// used to apply changes on the interface based on the input
	const handleChange = (e) => {
		if (e.target.name == "img") {
			setForm({
				...form,
				[e.target.name]: e.target.files[0],
				avatarURL:
					e.target.files[0] != null
						? URL.createObjectURL(e.target.files[0])
						: "",
			});
		} else {
			setForm({ ...form, [e.target.name]: e.target.value });
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
										<input
											type="file"
											onChange={handleChange}
											name="img"
											accept="image/*"
											required
										/>
										
										<img src="" alt="" id="instavatar" />
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
