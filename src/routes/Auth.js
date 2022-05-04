import React, { useState } from 'react';
import {signInWithPopup} from 'firebase/auth'
import { authService,googleProvider,githubProvider } from '../fbase';
import AuthForm from '../components/AuthForm';

const Auth=()=>{

    const onSocialClick=async(e)=>{

        const {name}=e.target;

        if(name==="google"){
            signInWithPopup(authService,googleProvider);
        } else if(name==="github"){
            signInWithPopup(authService,githubProvider);
        }
    }

    return(
        <div>
           <AuthForm />
            <div>
                <button 
                    name="google"
                    onClick={onSocialClick}>Continue with Google</button>
                <button 
                    name="github"
                    onClick={onSocialClick}>Continue with GitHub</button>
            </div>
        </div>
    )
}

export default Auth;