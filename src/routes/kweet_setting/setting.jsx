import React, { useState } from 'react';
import {signOut, updateProfile} from 'firebase/auth'
import { authService, dbService } from '../../fbase';
import { useNavigate } from 'react-router-dom';
import { collection,getDocs,onSnapshot,orderBy,query,QuerySnapshot,where, } from 'firebase/firestore';
import styles from './setting.module.css';

const Setting=({userObj,refreshUser})=>{
    
    const [postedLists,setPostedLists]=useState([]);
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const [toggleSelect,setToggleSelect]=useState(false); 

    let navigate=useNavigate();
    
    const logOutClick=()=>{
        const ok=window.confirm("로그아웃 하시겠습니까?");
        
        if(ok){            
            signOut(authService)
            .then(()=>{
                navigate("/")
            })
        } else{
            return;
        }
    }

    const getMyKweets=async()=>{
        setToggleSelect((prev)=>!prev);
        const kweetsRef=collection(dbService,"kweets");
        const q=query(kweetsRef,where("creatorId","==",userObj.uid),orderBy("createdAt","desc"));
        const posts=await getDocs(q);
        setPostedLists(posts.docs.map((post)=>({...post.data(),id:post.id,})));

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

    const handleDate=(time)=>{
        if(time<10){
            return `0${time}`
        } else{
            return time;
        }
    }
    
    
    return(
        <div className={styles.setting__container}>
            <p className={styles.setting__title}>{userObj.displayName}{userObj.displayName.endsWith('s') ? "'" : "'s"} profile 💚</p>
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

            <p className={styles.setting__list} onClick={getMyKweets}>작성글</p>
            {toggleSelect && postedLists.map((posted)=>
                <div className={styles.post__list} key={posted.createdAt}>
                    <p style={{wordBreak:'break-all'}} className={styles.post__title}>{posted.text}</p>
                    <span className={styles.post__date}>{`${posted.created.year}.${handleDate(posted.created.month)}.${handleDate(posted.created.date)}
                        ${handleDate(posted.created.hour)}:${handleDate(posted.created.min)}
                        `}</span>
                </div>
            )}
            <button className={styles.setting__logout} onClick={logOutClick}>
                <i className="fas fa-sign-out-alt"></i>
            </button>

        </div>
    )
}

export default Setting;