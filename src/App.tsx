import React from 'react';
import './App.css';
import User from './components/user';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <User />
      </header>
    </div>
  );
}

export default App;
