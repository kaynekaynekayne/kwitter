import React, { useState } from 'react';
import {signInWithPopup} from 'firebase/auth'
import { authService,googleProvider,githubProvider } from '../../fbase';
import AuthForm from '../../components/auth_Form/AuthForm';
import styles from './Auth.module.css'; 

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
            <div className={styles.auth__container}>
                <button 
                    className={styles.login__google}
                    name="google"
                    onClick={onSocialClick}>
                    <i className="fab fa-google"></i>
                    Sign in with Google
                </button>
                <button 
                    className={styles.login__github}
                    name="github"
                    onClick={onSocialClick}>
                    <i className="fab fa-github"></i>
                    Sign in with Github
                </button>
            </div>
        </div>
    )
}

export default Auth;