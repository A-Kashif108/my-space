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
        {/* dont use capital letters for routes instead use use "/signin* or "/register"*/}
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
    </HashRouter>
  );
}

// For folder and file structure follow the convention mentioned during the lecture.(refer Services, API and Firebae)
// > services
//    >api
//       >axios.ts
//       >apiService.ts
//       >animalApi.ts
//    >firebase

export default App1;

