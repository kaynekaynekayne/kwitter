import React, { useEffect, useState } from 'react';
import {collection, onSnapshot,query, orderBy} from 'firebase/firestore';
import { dbService } from '../fbase';
import Kweet from '../components/Kweet';
import KweetFactory from '../components/KweetFactory';

const Home=({userObj})=>{
    const [kweets,setKweets]=useState([]);
    const postsCollectionRef=collection(dbService,"kweets");
    
    useEffect(()=>{
        const q=query(postsCollectionRef,orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=>{
            setKweets(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
        })
        
    },[]);

    return(
        <div className="container">
            <KweetFactory userObj={userObj}/>
            <div style={{marginTop:30}}>
                {kweets.map((kweet)=>(
                    <Kweet 
                        key={kweet.id}
                        kweet={kweet}
                        isOwner={kweet.creatorId===userObj.uid}
                    />
                )
                )}
            </div>
        </div>
    )
};

export default Home;