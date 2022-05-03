import React, { useEffect, useState } from 'react';
import {collection,addDoc,getDocs, doc, onSnapshot,query, orderBy} from 'firebase/firestore';
import { dbService } from '../fbase';
import { storageService } from '../fbase';
import Kweet from '../components/Kweet';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {v4} from 'uuid';

const Home=({userObj})=>{
    const [kweet,setKweet]=useState("");
    const [kweets,setKweets]=useState([]);

    const postsCollectionRef=collection(dbService,"kweets");

    //이미지 관련
    const [attachment,setAttachment]=useState("");
    const imageListRef=ref(storageService,"/images");

    useEffect(()=>{
        console.log('유저이펙트다제~~')
        const q=query(postsCollectionRef,orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=>{
            setKweets(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
        })

    },[]);

    const onSubmit=async(e)=>{
        e.preventDefault();
        
        let attachmentUrl="";
        if(attachment!=="") {
            const imageRef=ref(storageService,`images/${attachment.name+v4()}`);
            await uploadBytes(imageRef,attachment);
            attachmentUrl=await getDownloadURL(imageRef);
        };

        try{
            await addDoc(postsCollectionRef,{
                text:kweet,
                createdAt:Date.now(),
                creatorId:userObj.uid,
                attachmentUrl,
            });
        } catch(error){
            alert(error);
        }
        setKweet("");
        setAttachment("");

    }


    return(
        <div>
            <p>Kweet</p>
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    placeholder="what's on ur mind?"
                    maxLength={120}
                    value={kweet}
                    onChange={(e)=>{setKweet(e.target.value)}}   
                />
                <input 
                    type="submit"
                    value="Kweet"  
                />
                <input 
                    type="file"
                    onChange={(e)=>{setAttachment(e.target.files[0])}}
                />
            </form>
            <div>
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