import React,{useEffect, useState} from 'react';
import AppRouter from './components/router/Router';
import {authService,dbService} from './fbase';
import {onAuthStateChanged, updateProfile} from 'firebase/auth'


function App() {
  const [init,setInit]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userObj,setUserObj]=useState(null);
  
  useEffect(()=>{

    onAuthStateChanged(authService,(user)=>{
      if(user){
        setIsLoggedIn(true);
        console.log(user)
        if(user.displayName===null){
          setUserObj({
            displayName:"anonymous",
            uid:user.uid,
            email:user.email,
            updateProfile:()=>updateProfile(user,{displayName:user.displayName})
          })
        } else{
          setUserObj({
            displayName:user.displayName,
            uid:user.uid,
            email:user.email,
            updateProfile:()=>updateProfile(user,{displayName:user.displayName})
          });
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
        /> : <div>
        <i className="fas fa-kiwi-bird"></i>
      </div>
      }
    </div>
  );
}

export default App;
