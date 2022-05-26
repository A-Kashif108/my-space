import React from "react"
import { CommentsPropType } from "../../types/commentsPropType"
import './comment.css'

const CommentSection:React.FC<CommentsPropType> = (props:CommentsPropType)=>{
    return(
        <div className="commentSection">
            <button></button>
        </div>
    );
}

export default CommentSection;