import React,{useState} from 'react';
import { authService } from '../../fbase';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import styles from './AuthForm.module.css';

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
        <div className={styles.authform__container}>
            <p className={styles.kwitter}>Kwitter</p>
            <form className={styles.form__container} onSubmit={onSubmit}>
                <input
                    type="email" 
                    placeholder="Email" 
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className={styles.auth__input}
                />
                <input
                    type="password" 
                    placeholder="Password" 
                    required
                    maxLength={20}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className={styles.auth__input}
                />
                <input
                    type="submit" 
                    value={newAccount ? "Create Account" : "Log In"} 
                    className={styles.auth__btn}
                    required
                />
                {error}
            </form>
            <span onClick={toggleAccount} className={styles.toggle__btn}>
                {newAccount ? "Log in 👈" : "Create account 👈"}
            </span>
        </div>
    )
}
export default AuthForm;