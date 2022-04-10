import React, {useState} from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import signinImage from '../assets/signup.jpg';
import {useForm} from "react-hook-form"

const Auth = () => {
    const [isSignup, setIsSignup]=useState(true)
    const [isFile, setIsFile]=useState(false)
    
    const {image, handleSubmit} = useForm()
    const onSubmitFile = (data)=>{
        console.log(data)
    }

    const handleChange = ()=>{}

  return (
    <div className="auth__form-container">
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                <p>{isSignup?'Sign Up':'Sign In'}</p>
                <form onSubmit={()=>{if(isFile) handleSubmit(onSubmitFile)}}>
                    {isSignup &&(
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" name="fullName" placeholder='Full Name' onChange={handleChange} required/>
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="userName">User Name</label>
                        <input type="text" name="userName" placeholder='User Name' onChange={handleChange} required/>
                    </div>
                    {isSignup &&(
                        <>
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="tel" name="phone" placeholder='Phone Number' onChange={handleChange} required/>
                            </div>
                            <div className="norm">
                                <input type="checkbox" name="uploadImg" onChange={()=>setIsFile(!isFile)} />
                                <label htmlFor="uploadImg">Upload Picture</label>
                            </div>
                            {isFile&&(
                                <div className="auth__form-container_fields-content_input">
                                    <label htmlFor="img">Upload your image</label>
                                    <input ref={image} type="file" name="img" required/>
                                </div>
                            )}
                            {!isFile&&(
                                <div className="auth__form-container_fields-content_input">
                                    <label htmlFor="avatarURL">Avatar URL</label>
                                    <input type="text" name="avatarURL" placeholder='Avatar URL' onChange={handleChange} required/>
                                </div>
                            )}
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder='Password' onChange={handleChange} required/>
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={handleChange} required/>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Auth;