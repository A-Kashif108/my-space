import {useRef, useState} from "react";
import React from "react";
import { PostProps } from "../../types/postPropType";
import './post.css';
import CommentSection from "../Comments/CommentSection";
import { collection, addDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";

const Post: React.FC<PostProps> = (props:PostProps)=>{

  // never write db, firebase logic in UI
  const [showModal, setShowModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  var comment="";
    const {user,  id, imageurl} = props;
    const {like,dislike} = props;
    const[liked, setLiked] = useState(false);
    const[disLiked, setDisLiked] = useState(false);
    var[Like,setLike] = useState(like);
    var[disLike,setDisLike] = useState(dislike);
    const PostRef = doc(db, "Posts", id);
    const handleLike =async()=>{
      if(!liked){
      setLike(Like+1);
      await updateDoc(PostRef, {
        like:Like+1,
      });
      setLiked(true);
      if (disLiked) {
        setDisLike(disLike-1);
        await updateDoc(PostRef, {
          dislike:disLike-1,
        });
        setDisLiked(false);
      }
    }else{
      setLike(Like-1);
      await updateDoc(PostRef, {
        like:Like-1,
      });
      setLiked(false);
    }
    }
    const handleDislike =async()=>{
      if(!disLiked){
      setDisLike(disLike+1);
      await updateDoc(PostRef, {
        dislike:disLike+1,
      });
      setDisLiked(true);
      if (liked) {
        setLike(Like-1);
        await updateDoc(PostRef, {
          like:Like-1,
        });
        setLiked(false);
      }
    }else{
      setDisLike(disLike-1);
      await updateDoc(PostRef, {
        dislike:disLike-1,
      });
      setDisLiked(false);
    }
    }

    // create this component in a different file
    const ModalPost: React.FC<PostProps> = (props:PostProps)=>{
        return (
          <div className="mod-bg" >
            <div className="row">
            <div className="mod" >
              <div className="post_mod" >
                <div className="user">
                  <p>{user}</p>
                </div>
          <img className="mod_img" src={imageurl} alt="" />
        </div>
            <div className="actions">
              {!liked&&<button onClick={handleLike} >{Like} Like </button>}
              {liked&&<button onClick={handleLike} >{Like} Liked</button>}
              {!disLiked&&<button onClick={handleDislike}>{disLike} Dislike </button>}
              {disLiked&&<button onClick={handleDislike}>{disLike} Disliked </button>}
              <button onClick={()=>{
                setShowComments(!showComments);
                console.log("clicked");
                }} > Comments </button>
              <button className="" onClick={()=>setShowModal(false)}>
                close
              </button>
            </div>
            </div>
            <div className="colmn">
            {showComments&&<CommentSection user={""} text={""} id={id}/>}
            {showComments&&<div><input ref={inputRef} type="text" onChange={async(e)=>{
              comment=e.target.value;
              }} id="addComment" name="comnt" placeholder="Add a comment..."></input>
              {/* WHY WRITE LOGIC INSIDE UI */}
            <button onClick={async()=>{
              inputRef.current!.value="";
              const user = auth.currentUser;
              if (user) {
                const userRef  = doc(db,"Users",user!.uid);
                const userSnap = await getDoc(userRef);
                const data = userSnap.data();
                const docRef = await addDoc(collection(db, 'Posts',id,"Comments"), {
                  user: data!.userName,
                  text: comment,
                  timestamp: serverTimestamp(),
                });
                
              }
            }} >Post</button></div>}
            </div>
          </div>
          </div>
        );
  }
    return(
      <>
      {showModal&&<ModalPost user={""} like={like} dislike={dislike} imageurl={""} id={""} />}
       <div className="post" onClick={() => setShowModal(true)}>
          <div className="user">
            <p>{user}</p>
          </div>
          <img className="img" src={imageurl} alt="" />
        </div>
        </>
    );

}
export default Post;

