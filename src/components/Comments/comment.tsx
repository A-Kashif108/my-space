import React from "react"
import { CommentsPropType } from "../../types/commentsPropType"
import './comment.css'

const Comment:React.FC<CommentsPropType>=(props:CommentsPropType)=>{
    const{text,user} = props;
    return(
        <div className="comment">
            <div className="userNm">{user}</div>
            <p className="txt">{text}</p>
        </div>
    );
}

export default Comment;