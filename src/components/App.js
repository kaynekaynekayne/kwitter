import React,{useEffect, useState} from 'react';
import AppRouter from './router/Router';
import {authService,dbService} from '../fbase';
import {onAuthStateChanged, updateProfile} from 'firebase/auth'

function App() {
  const [init,setInit]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userObj,setUserObj]=useState(null);
  
  useEffect(()=>{
    onAuthStateChanged(authService,(user)=>{
      //user->로그인한 유저
      if(user){
        setIsLoggedIn(true);
        //setUserObj(user); 밑에 수정 전
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:()=>updateProfile(user,{displayName:user.displayName})
        });
        if(user.displayName===null){
          updateProfile(userObj,{
            displayName:"anonymous",
          })
        }
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])

  const refreshUser=()=>{
    const user=authService.currentUser;
    console.log(user);
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile:()=>updateProfile(user,{
        displayName:user.displayName})
    });
  }

  return (
    <div>
      {init ? <AppRouter 
        userObj={userObj}
        isLoggedIn={isLoggedIn}
        refreshUser={refreshUser}
        /> : "Initializing.."
      }
    </div>
  );
}

export default App;
