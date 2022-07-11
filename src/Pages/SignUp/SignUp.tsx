import React, { useEffect, useState } from "react";
import {createUserWithEmailAndPassword } from "firebase/auth";
import './SignUp.css'
import { auth, db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

// use constants folder/file for constant value
const interestData = [
    { name: "Photography" },
    { name: "Fine Arts" },
    { name: "Stand Up" },
    { name: "Music" },
    { name: "Dance" }
  ];

const SignUp:React.FC =()=>{

    const [interests, setInterests] = useState<any>([]);
    var finalInterests: any[] =[];
    // specify types while using useState like useState<string>("")
    const [email,setEmail] =useState("");
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
          setInterests(interestData);
      }, []);

      // why use any ??
      const handleChange = (e: { target: { name: any; checked: any; }; }) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
          let tempInterest = interests.map((interest: any) => {
            return { ...interest, isChecked: checked };
          });
          setInterests(tempInterest);
        } else {
          let tempInterest = interests.map((interest: { name: any; }) =>
            interest.name === name ? { ...interest, isChecked: checked } : interest
          );
          setInterests(tempInterest);
        }
      };

      const SignUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
          .then(async(userCredential) => {
            // Signed in 
            interests.map((_interest: any)=>{
              if (_interest?.isChecked) {
                finalInterests.push(_interest.name);
              }
            });

            var user = userCredential.user;
            await setDoc(doc(db, "Users", user.uid), {
              userName: username,
              email: email,
              interests: finalInterests,
            });

            console.log(user.uid);
            navigate("/main");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode+": "+errorMessage);
            // ..
          });
      }



    return(
        <div className="main">
            <div className="box">
                    <p className="txt">SignUp</p>
                <form className="signUpForm" action="">
                    
                    <input className="cred" placeholder="Email" type="text" onChange={(e)=>{setEmail(e.target.value)}} />
                    
                    <input className="cred" placeholder="Username" type="text" onChange={(e)=>{setUsername(e.target.value)}}  />
                    
                    <input className="cred" placeholder="Password"  type="password" onChange={(e)=>{setPassword(e.target.value)}} />
                    <div className="selectInt">
                    <input
                    type="checkbox"
                    className="form-check-input"
                    name="allSelect"
                    // use a variable to show this don't write blogic inside UI
                    checked={!interests.some((interest: { isChecked: boolean; }) => interest?.isChecked !== true)}
                    onChange={handleChange}
            />
            <label className="form-check-label ms-2">All Select</label>
                    {interests.map((interest: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; isChecked: any; }, index: React.Key | null | undefined) => (
                    <div className="form-check" key={index}>
                        <input
                        type="checkbox"
                        className="form-check-input"
                        name={interest.name as string}
                        checked={interest?.isChecked || false}
                        onChange={handleChange}
                        />
                        <label className="form-check-label ms-2">{interest.name}</label>
                    </div>))}
                    </div>
                </form>
                    <button onClick={()=>{SignUp()}} >SignUp</button>
                    <p className="hvAcct" onClick={()=>{
                        navigate("/");
                    }} >Already have an Account ?
                    </p>
            </div>
        </div>
    );
}

export default SignUp;