import React, { useState } from 'react';
import Header from './components/Header.js'
import Body from './components/Body.js';
import './App.css';

export const ThemeContext = React.createContext();

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  function setTheme() {
    setIsDarkTheme((prevTheme) => !prevTheme);
  }
  return (
    <ThemeContext.Provider value={isDarkTheme}>
      <div className="App">
        <Header setTheme={setTheme} />
        <div style={{marginTop: '8px'}}>
          <Body/>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
