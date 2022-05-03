import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,

} from 'firebase/auth'
import { authService,googleProvider,githubProvider } from '../fbase';

const Auth=()=>{
    
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState("");

    const onSubmit=async(e)=>{
        e.preventDefault();
        try{
            if(newAccount){
                //create account
                const data=await createUserWithEmailAndPassword(authService,email,password);
                console.log(data);
            } else{
                //login
                const data=await signInWithEmailAndPassword(authService,email,password);
                console.log(data);
            }
        } catch(error){
            setError(error.message);
        }
    }
    const toggleAccount=()=>setNewAccount((prev)=>!prev);

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
            <form onSubmit={onSubmit}>
                <input
                    // name="email"
                    type="email" 
                    placeholder="Email" 
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    // name="password"
                    type="password" 
                    placeholder="Password" 
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <input
                    type="submit" 
                    value={newAccount ? "Create Account" : "Log In"} 
                    placeholder="Password" 
                    required
                />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Log in." : "Create account."}</span>
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