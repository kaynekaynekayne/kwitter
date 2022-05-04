import React, { useState } from "react";
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import Home from "../../routes/Home";
import Auth from "../../routes/Auth";
import Profile from "../../routes/Profile";
import styles from './Router.module.css';

const AppRouter=({isLoggedIn,userObj,refreshUser})=>{
    
    return(
        <Router>
            <nav>
                {isLoggedIn && (
                    <ul className={styles.container}>
                        <li >
                            <Link to="/" style={{ marginRight: 30 }}>Home</Link>
                        </li>
                        <li>
                            <Link to="/profile"> <i class="fas fa-cog"></i></Link>
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