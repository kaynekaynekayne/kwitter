import React, { useState } from 'react';
import {signOut, updateProfile} from 'firebase/auth'
import { authService, dbService } from '../../fbase';
import { useNavigate } from 'react-router-dom';
import { collection,getDocs,onSnapshot,orderBy,query,where } from 'firebase/firestore';
import styles from './Setting.module.css';

const Setting=({userObj,refreshUser})=>{

    const [postedLists,setPostedLists]=useState([]);
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const [toggleSelect,setToggleSelect]=useState(false); 

    let navigate=useNavigate();
    
    const logOutClick=()=>{
        signOut(authService)
        .then(()=>{
            navigate("/")
        })
    }

    const getMyKweets=async()=>{
        setToggleSelect((prev)=>!prev);
        const kweetsRef=collection(dbService,"kweets");
        const q=query(kweetsRef,where("creatorId","==",userObj.uid),orderBy("createdAt","desc"));
        const posts=await getDocs(q);
        setPostedLists(posts.docs.map((post)=>({...post.data()})));

    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        if(userObj.displayname!==newDisplayName){
            await updateProfile(authService.currentUser,{
                displayName:newDisplayName,
                // photoURL:
            });
            refreshUser();
        }
    }
    
    return(
        <div className={styles.setting__container}>
            <p className={styles.setting__title}>{userObj.displayName}{userObj.displayName.endsWith('s') ? "'" : "'s"} profile 💜</p>
         
            <form className={styles.setting__form} onSubmit={onSubmit}>
                <input
                    className={styles.setting__input}
                    onChange={(e)=>{setNewDisplayName(e.target.value)}} 
                    type="text" 
                    placeholder="Display name"
                    value={newDisplayName}
                    maxLength={15}
                />
                <input className={styles.setting__submit} type="submit" value="Update Nickname"/>
            </form>

            <p className={styles.setting__list} onClick={getMyKweets}>글목록</p>
            {toggleSelect && postedLists.map((posted)=>
                <div key={posted.createdAt}>
                    <p>{posted.text}</p>
                    <p>{`${posted.created.year}.${posted.created.month}.${posted.created.date}
                        ${posted.created.hour} :
                        ${posted.created.min}
                    `}</p>
                </div>
            )}

            <button className={styles.setting__logout} onClick={logOutClick}>
                EXIT
            </button>
            <div>
                
            </div>
        </div>
    )
}

export default Setting;