import React, { useEffect, useState } from 'react';
import {signOut, updateProfile} from 'firebase/auth'
import { authService, dbService } from '../fbase';
import { useNavigate } from 'react-router-dom';
import { collection,getDocs,onSnapshot,orderBy,query,where } from 'firebase/firestore';

const Profile=({userObj,refreshUser})=>{

    const [kweetList,setKweetList]=useState([]);
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);

    let navigate=useNavigate();

    const logOutClick=()=>{
        signOut(authService)
        .then(()=>{
            navigate("/")
        })
    }

    const getMyKweets=async()=>{
        const kweetsRef=collection(dbService,"kweets");
        const q=query(kweetsRef,where("creatorId","==",userObj.uid),orderBy("createdAt","desc"))

        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc)
        })
        // onSnapshot(q,(snapshot)=>{
        //     setKweetList(snapshot.docs.map((doc)=>({...doc.data()})))
        //     console.log(kweetList)
        // })
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

    useEffect(()=>{
        getMyKweets();
    },[])

    return(
        <div className="container">
            <p>{userObj.displayName}{userObj.displayName.endsWith('s') ? "'" : "'s"} profile</p>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={(e)=>{setNewDisplayName(e.target.value)}} 
                    type="text" 
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile"/>
            </form>
            <button onClick={logOutClick}>Log out</button>
            <div>
                
            </div>
        </div>
    )
}

export default Profile;