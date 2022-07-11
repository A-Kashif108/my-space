import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import './SignIn.css';

const SignIn:React.FC =()=>{
    const [password,setPassword] =useState("");
    const [email,setEmail] =useState("");
    const navigate = useNavigate();
    
    const SignIn=()=>{
        // these firebase functions can be created in a seperate file and here can only be called
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
    // Signed in 
        const user = userCredential.user;
        navigate("/main");
        
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode+": "+errorMessage);
    });
    }


    return(
        <div className="main">
            <div className="SignInbox">
                    <p className="txt">SignIn</p>
                <form className="signInForm">
                    {/* dont use setState onchange it will update state every time data is changes.. just assign it to a variable and use it in logic*/}
                    <input className="cred" placeholder="Email" type="text" onChange={(e)=>{setEmail(e.target.value)}} />
                    
                    <input className="cred" placeholder="Password"  type="password" onChange={(e)=>{setPassword(e.target.value)}} />
                    <div className="selectInt">
                    </div>
                </form>
                    <button onClick={()=>{SignIn()}} >SignIn</button>
                    <p className="crtAcct" onClick={()=>{
                        navigate("/Signup");
                    }} >Create an Account
                    </p>
            </div>
        </div>
    );
}

export default SignIn;