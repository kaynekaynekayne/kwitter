import React, { useState } from "react";
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";

const AppRouter=({isLoggedIn,userObj})=>{
    
    return(
        <Router>
            <nav>
                {isLoggedIn && (
                    <>
                        <Link to="/">Home    </Link>
                        <Link to="/profile">My Profile</Link>
                    </>
                )}
            </nav>  
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home userObj={userObj}/>}/>
                        <Route path="/profile" element={<Profile />}/>
                    </>
                ) : (
                    <Route path="/" element={<Auth />}/>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;