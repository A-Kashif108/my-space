import {useState} from "react";
import React from "react";
import { PostProps } from "../../types/postPropType";
import './post.css';
import CommentSection from "../Comments/CommentSection";

const Post: React.FC<PostProps> = (props:PostProps)=>{

  const [showModal, setShowModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
    const {user, like, dislike, commentData, imageurl} = props;

    const CommentStream: React.FC<PostProps>=(props:PostProps)=>{
      return(
        <div className="comments">
        </div>
      );
    }

    const ModalPost: React.FC<PostProps> = (props:PostProps)=>{
      if (!showModal) {
          return null;
        }
        return (
          <div className="mod-bg" >
          <div className="mod" >
          <div className="post" >
          <div className="user">
            <p>{user}</p>
          </div>
          <img src={imageurl} alt="" />
        </div>
            <div className="actions">
            <button>{like} Like </button>
            <button>{dislike} Dislike </button>
            <button onClick={()=>{setShowComments(!showComments)}} > Comments </button>
              <button className="toggle-button" onClick={()=>setShowModal(false)}>
                close
              </button>
            </div>
            {showComments&&<CommentSection user={""} text={""}/>}
          </div>
          </div>
        );
  }
    return(
      <>
      <ModalPost user={""} like={0} dislike={0} commentData={""} imageurl={""} />
       <div className="post" onClick={() => setShowModal(true)}>
          <div className="user">
            <p>{user}</p>
          </div>
          <img src={imageurl} alt="" />
        </div>
        </>
    );

}

export default Post;

