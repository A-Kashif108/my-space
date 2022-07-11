import { error } from "console";
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react"
import { db } from "../../services/firebase";
import { CommentsPropType } from "../../types/commentsPropType"
import Comment from "./comment";
import './comment.css'

const CommentSection:React.FC<CommentsPropType> = (props:CommentsPropType)=>{
    const{id} = props;
    const [data, setData] = useState<any[]>([]); // why use any ??
    
    
    useEffect(()=>{
        getComments();},
    []);
    function getComments() {
        const postCollectionQuery = query(collection(db,"Posts",id,"Comments"), orderBy("timestamp"));
        onSnapshot(postCollectionQuery,(querySnapshot)=>{
            const psts =
            querySnapshot.docs.map((doc)=>({
                ...doc.data(),
                    id:doc.id,
            })
            );
            setData(psts);
        },(error)=>{
            // remove console logs in pushed code
            console.log(error.code);
        });
    }

    return(
        <div className="commentSection">
        {data.map((doc)=>{
            return(
            <Comment user={doc.user} text={doc.text} id={doc.id}/>)})}
        </div>
    );
}

export default CommentSection;