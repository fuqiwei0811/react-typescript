import React from 'react';
import './App.css';
import MemoList from './memo/MemoList.tsx';
import InfoComponent from './memo/InfoComponent.tsx';
import AddComponent from './memo/AddComponent.tsx';
import SearchComponent from './memo/SearchComponent.tsx';

function App() {
  return (
    <div id='rootDIV'>
        <header>Memo List</header>
        <InfoComponent />
        <AddComponent />
        <SearchComponent />
        <MemoList />
      </div>
  );
}

export default App;
