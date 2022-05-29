import React from 'react';
import { HashRouter,Route, Routes } from "react-router-dom";
import SignUp from './Pages/SignUp/SignUp';
import Main from './Pages/Main/main';
import SignIn from './Pages/SignIn/signIn';

const App1: React.FC=()=> {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<Main />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
    </HashRouter>
  );
}


export default App1;

