import React from "react";
import { UsernameProps } from "../../types/usernamePropType";
import './username.css';


const Username: React.FC<UsernameProps> = (props:UsernameProps)=>{
    const { username } = props;
    return(
        <div className="username">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Nomascus_gabriellae_25.JPG" alt="" />
            <h1>
                {username}
            </h1>
        </div>
    );
};

export default Username;