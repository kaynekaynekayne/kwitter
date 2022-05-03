import React from 'react';
import {signOut} from 'firebase/auth'
import { authService } from '../fbase';
import { useNavigate } from 'react-router-dom';

const Profile=()=>{

    let navigate=useNavigate();

    const logOutClick=()=>{
        signOut(authService)
        .then(()=>{
            navigate("/")
        })
    }

    return(
        <>
            <button onClick={logOutClick}>Log out</button>
        </>
    )
}

export default Profile;