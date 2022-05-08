import React,{useState,useEffect} from "react";
import {storageService,dbService} from '../../fbase';
import {addDoc,collection} from 'firebase/firestore'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
import styles from './KweetFactory.module.css';

const KweetFactory=({userObj})=>{
    const [kweet,setKweet]=useState("");
    const [attachment,setAttachment]=useState("");
    const [previewImg,setPreviewImg]=useState(null);
    
    const imageListRef=ref(storageService,"/images");
    const postsCollectionRef=collection(dbService,"kweets");
    
    useEffect(()=>{
        if(!attachment){
            setPreviewImg(undefined);
            return;
        }

        const objectUrl=URL.createObjectURL(attachment);
        setPreviewImg(objectUrl);

        return ()=>URL.revokeObjectURL(objectUrl)
    },[attachment])

    const onSubmit=async(e)=>{
        e.preventDefault();
        
        let attachmentUrl="";
        let date=new Date();

        if(attachment!=="") {
            const imageRef=ref(storageService,`images/${attachment.name+v4()}`);
            await uploadBytes(imageRef,attachment);
            attachmentUrl=await getDownloadURL(imageRef);
        };

        try{
            await addDoc(postsCollectionRef,{
                text:kweet,
                createdAt:Date.now(),
                created:{
                    year:date.getFullYear(),
                    month:date.getMonth()+1,
                    date:date.getDate(),
                    hour:date.getHours(),
                    min:date.getMinutes(),
                },
                creatorId:userObj.uid,
                nickName:userObj.displayName,
                attachmentUrl,
            });
        } catch(error){
            alert(error);
        }
        setKweet("");
        setAttachment("");
    }

    return(
    <>
        <form onSubmit={onSubmit} className={styles.factoryForm}>
            <div className={styles.factoryInput__container}>            
                <input  
                    type="text"
                    placeholder="kweet everything you want"
                    maxLength={120}
                    value={kweet}
                    autoFocus
                    onChange={(e)=>{setKweet(e.target.value)}}   
                    className={styles.factoryInput__input}
                />
                <label htmlFor="file-upload" className={styles.choose__file}>
                    <i className="fas fa-image" id={styles.image__upload}></i>
                </label>
                <input 
                    id="file-upload" 
                    type="file" 
                    onChange={(e)=>setAttachment(e.target.files[0])}
                    style={{display:"none"}}
                />
                <button className={styles.submit__btn} type="submit">
                    <i className="fas fa-pen" id={styles.text__upload}></i>
                </button>
            </div>
        </form>
        {attachment &&         
            <div className={styles.preview}>
                <img src={previewImg} height="auto" style={{maxWidth:'70px'}}/>
                <span className={styles.preview__text}>{attachment.name} 
                </span>
            </div>
        }
    </>


    )
}
export default KweetFactory;