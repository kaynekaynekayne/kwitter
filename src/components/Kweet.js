import React,{useState} from 'react';
import {deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {deleteObject, ref} from 'firebase/storage';
import { dbService,storageService } from '../fbase';

const Kweet=({kweet,isOwner})=>{
    
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
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            onChange={(e)=>setNewKweet(e.target.value)}
                            value={newKweet} 
                            type="text"
                            required/>
                        <input type="submit" value="Update"/>
                        <button onClick={toggleEditing}>Cancel</button>
                    </form>
                </>
            ) : (
                <>
                    <h4>{kweet.text}</h4>
                    {kweet.attachmentUrl && <img src={kweet.attachmentUrl} />}
                    {isOwner && (
                        <>
                            <button onClick={()=>{deleteKweet(kweet.id)}}>Delete Kweet</button>
                            <button onClick={toggleEditing}>Edit Kweet</button>
                        </>
                    )}
                </>
            )
        
        }
        </div>
    )
}

export default Kweet;