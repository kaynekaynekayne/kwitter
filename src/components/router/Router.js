import React, { useState } from "react";
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import Home from "../../routes/kweet_home/home";
import Auth from "../../routes/kweet_auth/auth";
import Setting from "../../routes/kweet_setting/setting";
import styles from './Router.module.css';

const AppRouter=({isLoggedIn,userObj,refreshUser})=>{
    return(
        <Router>
            <nav>
                {isLoggedIn && (
                    <ul className={styles.container}>
                        <li>
                            <Link to="/" style={{ marginRight: 80 }}>Home</Link>
                        </li>
                        <li>
                            <Link to="/setting" > <i id={styles.setting__icon} className="fas fa-cog"></i></Link>
                        </li>
                    </ul>
                )}
            </nav>  
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home userObj={userObj} isLoggedIn={isLoggedIn}/>}/>
                        <Route path="/setting" element={<Setting userObj={userObj} refreshUser={refreshUser}/>}/>
                    </>
                ) : (
                    <Route path="/" element={<Auth />}/>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;