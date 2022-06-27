import React, { useState, useEffect } from 'react';
import { Avatar, useChatContext, user, admin, ServiceProvider, role, useUserRole} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import axios from "axios";
import Profile from './Profile';
import Provider from './Provider';
import { StyleSheet } from 'react';
import Button from "./CustomButtonComponent.tsx";



const Dashboard = () => {

const { client } = useChatContext();
//Admin
if (client.user.role == "admin") {
    return <div>Hi Admin</div>, <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      width: 1400
    }}
  ><a href="https://chatoo-dasboard-admin.netlify.app/" target="_blank" ><Button
    
    border="none"
    color="skyBlue"
    height = "500px"
    href= "www.google.com"
    onClick={() => console.log("You clicked on the blue circle!")}
    radius = "50%"
    width = "500px"
    children = "I'm a blue circle!"
    > <h1> (Admin) <br></br><br></br>Click me to go to your dashboard page!</h1> </Button></a></div>;
 
// Service Provider
} else if (client.user.role == "ServiceProvider") {
    return <div>Hi Service Provider</div>, <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      width: 1400
    }}
  ><a href="https://chatoo-dashboard-sp.netlify.app/" target="_blank" ><Button
    
    border="none"
    color="DeepSkyBlue"
    height = "500px"
    href= "www.google.com"
    onClick={() => console.log("You clicked on the blue circle!")}
    radius = "50%"
    width = "500px"
    children = "I'm a blue circle!"
    > <h1> (Service Provider) <br></br><br></br> Click me to go to your dashboard page!</h1> </Button></a></div>;
} 

// User
else {
    return <div>Hi User</div>, <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      width: 1400
    }}
  ><a href="https://chatoo-dashboard-user.netlify.app/" target="_blank" ><Button
    
    border="none"
    color="LightSkyBlue"
    height = "500px"
    href= "www.google.com"
    onClick={() => console.log("You clicked on the blue circle!")}
    radius = "50%"
    width = "500px"
    children = "I'm a blue circle!"
    > <h1> (User) <br></br><br></br> Click me to go to your dashboard page!</h1> </Button></a></div>;
}


}



export default Dashboard;