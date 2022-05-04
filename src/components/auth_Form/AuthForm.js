import React,{useState} from 'react';
import { authService } from '../../fbase';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';

const AuthForm=()=>{

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState("");

    const toggleAccount=()=>setNewAccount((prev)=>!prev);
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
    return(
        <>
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
            <span onClick={toggleAccount}>
                {newAccount ? "Log in." : "Create account."}
            </span>
        </>
    )
}
export default AuthForm;