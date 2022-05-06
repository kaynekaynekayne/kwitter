import React,{useState} from 'react';
import {collection, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {deleteObject, ref} from 'firebase/storage';
import { dbService,storageService } from '../../fbase';
import styles from './Kweet.module.css';

const Kweet=({kweet,isOwner,userObj})=>{
    
    const [editing,setEditing]=useState(false);
    const [newKweet,setNewKweet]=useState(kweet.text);

    const deleteKweet=async(id)=>{
        const docRef=doc(dbService,"kweets",id);
        const ok=window.confirm("Are you sure you want to delete this kweet?");
        
        const storageRef=ref(storageService,kweet.attachmentUrl);

        if(ok){
            await deleteDoc(docRef);
            await deleteObject(storageRef);
        } else{
            return;
        }
    }

    const toggleEditing=()=>{
        setEditing((prev)=>!prev);
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        editKweet(kweet.id);

    }
    const editKweet=async(id)=>{
        const docRef=doc(dbService,"kweets",id);
        await updateDoc(docRef,{
            text:newKweet,
        })
        setEditing(false);
    }

    return(
        <div className={styles.kweet}>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            onChange={(e)=>setNewKweet(e.target.value)}
                            value={newKweet} 
                            type="text"
                            required
                            className="formInput"
                            autoFocus    
                        />
                        <div className={styles.update__box}>
                            <input type="submit" value="확인" className={styles.form__btn}/>
                            <span onClick={toggleEditing}>취소</span>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <p>{kweet.text}</p>
                    {kweet.attachmentUrl && <img src={kweet.attachmentUrl} />}
                    {isOwner && (
                        <div className={styles.btns}>
                            <button className={styles.edit__btn} onClick={toggleEditing}>
                                수정
                            </button>
                            <button className={styles.delete__btn} onClick={()=>{deleteKweet(kweet.id)}}>
                                삭제
                            </button>
                        </div>
                    )}
                    <p>@{userObj.displayName}</p>
                </>
            )
        
        }
        </div>
    )
}

export default Kweet;