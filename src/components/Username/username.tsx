import React from "react";
import { UsernameProps } from "../../types/usernamePropType";
import './username.css';

//Variable Names should make sense. (Username should not be name of a component)
const Username: React.FC<UsernameProps> = (props:UsernameProps)=>{
    const { username } = props;
    return(
        <div className="username">
            {/* why use fix image .. use random image api ?*/}
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Nomascus_gabriellae_25.JPG" alt="" />
            <h1>
                {username}
            </h1>
        </div>
    );
};

export default Username;