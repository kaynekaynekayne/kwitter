import React,{useState,useEffect} from "react";
import {storageService,dbService} from '../../fbase';
import {addDoc,collection} from 'firebase/firestore'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
import styles from './KweetFactory.module.css';

const KweetFactory=({userObj})=>{
    const [kweet,setKweet]=useState("");
    const [attachment,setAttachment]=useState("");
    const imageListRef=ref(storageService,"/images");
    const postsCollectionRef=collection(dbService,"kweets");
    
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
        <form onSubmit={onSubmit} className={styles.factoryForm}>
            <div className={styles.factoryInput__container}>            
                <input  
                    type="text"
                    placeholder="what's on ur mind?"
                    maxLength={120}
                    value={kweet}
                    onChange={(e)=>{setKweet(e.target.value)}}   
                    className={styles.factoryInput__input}
                />
                <input 
                    type="submit"
                    value="Kweet"  
                />
                <input 
                    type="file"
                    onChange={(e)=>{setAttachment(e.target.files[0])}}
                />
            </div>
        </form>
    )
}
export default KweetFactory;