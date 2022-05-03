import React,{useEffect, useState} from 'react';
import AppRouter from './Router';
import {authService,dbService} from '../fbase';
import {onAuthStateChanged} from 'firebase/auth'

function App() {
  const [init,setInit]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userObj,setUserObj]=useState(null);
  
  useEffect(()=>{
    onAuthStateChanged(authService,(user)=>{
      //user->로그인한 유저
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])

  return (
    <div>
      {init ? <AppRouter 
        userObj={userObj}
        isLoggedIn={isLoggedIn}/> : "Initializing.."}
    </div>
  );
}

export default App;
