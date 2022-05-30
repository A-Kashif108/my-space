import React, { useEffect, useState } from 'react';
import './main.css';
import Button from '../../components/Button/button';
import Title from '../../components/Title/title';
import Feed from '../../components/Feed/feed';
import Username from '../../components/Username/username';
import { auth, db } from '../../services/firebase';
import {signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const Main:React.FC=()=> {
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const user = auth.currentUser;
    async function getUsername(){
        if (user) {
            const docRef = doc(db, "Users", user!.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setUsername(data!.userName);
    }}
    getUsername();
  return (
    <div className='main'>
    <div className='Header'>
        <>
        <Title />
        <Username username={username}/>
        <Button text='Sign Out' onClick={() => { signOut(auth).then(() => {
        // Sign-out successful.
        navigate(-1);
        }).catch((error) => {
  // An error happened.
        }); } } />
        </>
    </div>
    <div className="App">
      <Feed data={''}/>
    </div>
    </div>
  );
}

export default Main;