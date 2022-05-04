import React, { useState } from "react";
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";

const AppRouter=({isLoggedIn,userObj,refreshUser})=>{
    
    return(
        <Router>
            <nav>
                {isLoggedIn && (
                    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                        <li >
                            <Link to="/" style={{ marginRight: 30 }}>Home</Link>
                        </li>
                        <li>
                            <Link to="/profile">{userObj.displayName}{userObj.displayName.endsWith('s') ? "'" : "'s"} profile</Link>
                        </li>
                    </ul>
                )}
            </nav>  
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home userObj={userObj}/>}/>
                        <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>
                    </>
                ) : (
                    <Route path="/" element={<Auth />}/>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;