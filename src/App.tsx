import React from 'react';
import './App.css';
import Button from './components/Button/button';
import Title from './components/Title/title';
import Feed from './components/Feed/feed';
import Username from './components/Username/username';

function App1() {
  return (
    <div className='main'>
    <div className='Header'>
    <Title />
    <Username username={'kash'}/>
    <Button text='Sign Out' onClick={() => { console.log("click"); } } />
    </div>
    <div className="App">
      <Feed data={''}/>
    </div>
    </div>
  );
}

export default App1;

