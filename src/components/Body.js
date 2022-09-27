import {useState, useEffect, useRef} from 'react';
import WordInput from './WordInput';

function Body() {
  const wordOftheDay = 'APPLE';
  const[wordArray, setWordArray] = useState([]);
  const[word, setWord] = useState('');
  const currWord = useRef('');
  const currWordArr = useRef('');
  // const [foundWordArr, setFoundWordArr] = useState([]);
  
  // function handleInput(word) {
  //   const newWord = word.trim().substring(0,5).toUpperCase();
  //   setWord(newWord);
  // }

  // function keyboardInput(e) {
  //   let c = e.charCode;
  //   if(c === 13) {
  //     e.preventDefault();
  //     handleEnterKey();
  //   } else if((c > 64 && c < 91) || (c > 96 && c < 123)) {
  //     handleKeyPress(e.key.toUpperCase());
  //   }
  // }

  function handleEnterKey() {
    let cw = currWord.current;
    let cwa = currWordArr.current;
    if(cw.length === 5) {
      if(cwa.length < 6) {
        setWordArray([...cwa, cw]);
        setWord('');
      }
    }
  }

  function handleBackspaceKey() {
    setWord(prevWord => {
      return prevWord.substring(0,prevWord.length-1);
    })
  }

  function handleKeyPress(key) {
    setWord((prevWord) => {
      if(prevWord.length >= 5) {
        return prevWord;
      } else {
        return prevWord + key.toUpperCase();
      }
    })
  }

  function handleKeyDown(e) {
    let keyCode = e.keyCode;
    if(keyCode === 8) {
      setWord(prevWord => prevWord.substring(0, prevWord.length -1));
    } else if (keyCode > 64 && keyCode < 91) {
      handleKeyPress(e.key.toUpperCase());
    } else if(keyCode === 13) {
      handleEnterKey();
    }
  }

  useEffect(() => {
    currWord.current = word;
  },[word]);

  useEffect(() => {
    currWordArr.current = [...wordArray];
    let newWord = wordArray[wordArray.length - 1];
    let fndArr = [false, false, false, false, false];
    for(let i=0;i<5;++i){
      if(wordOftheDay.charAt(i) === newWord?.charAt(i)) {
        fndArr[i] = true;
      }
    }
  },[wordArray])
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  },[handleKeyDown]);

  return (
    <>
    <div className='flex-column-center'>
      { [1,2,3,4,5,6].map((e,i) => {
        return (
          <WordInput word={wordArray.length + 1 >= e ? wordArray[i] || word : ''} key={e}/>
        )
      })}
    </div>
    <div className='flex-center'>
      {['q','w','e','r','t','y','u','i','o','p'].map((l) => {
        return (
          <div className='flex-center key cursor-pointer' onClick={() => handleKeyPress(l)} key={l}>{l}</div>
        )
      })}
    </div>
    <div className='flex-center'>
      {['a','s','d','f','g','h','j','k','l'].map((l) => {
        return (
          <div className='flex-center key cursor-pointer' onClick={() => handleKeyPress(l)} key={l}>{l}</div>
          )
        })}
    </div>
    <div className='flex-center'>
      <div className="flex-center key cursor-pointer" onClick={() => handleEnterKey()}>{'ENTER'}</div>
      {['z','x','c','v','b','n','m'].map((l) => {
        return (
          <div className='flex-center key cursor-pointer' onClick={() => handleKeyPress(l)} key={l}>{l}</div>
          )
        })}
      <div className="flex-center key cursor-pointer" onClick={() => handleBackspaceKey()}>{'BACKSPACE'}</div>
    </div>
    </>
  )
}

export default Body