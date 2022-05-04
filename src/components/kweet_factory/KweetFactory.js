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
                    placeholder="kweet everything you want"
                    maxLength={120}
                    value={kweet}
                    onChange={(e)=>{setKweet(e.target.value)}}   
                    className={styles.factoryInput__input}
                />
                <button className={styles.submit__btn} type="submit">
                    <i class="fas fa-pen"></i>
                </button>
                <label htmlFor="file-upload" className={styles.choose__file}>
                    <i className="fas fa-image"></i>
                </label>
                <input 
                    id="file-upload" 
                    type="file" 
                    onChange={(e)=>{setAttachment(e.target.files[0])}}
                    style={{display:"none"}}
                />
                
                
                {/* <input
                    className={styles.choose__file}
                    type="file"
                    onChange={(e)=>{setAttachment(e.target.files[0])}}
                /> */}
            </div>
        </form>
    )
}
export default KweetFactory;