import {useState, useRef, useEffect} from 'react';
import WordInput from './WordInput';

function Body() {
  const[wordArray, setWordArray] = useState([]);
  const[word, setWord] = useState('');
  const inputRef = useRef();
  
  function handleInput(word) {
    const newWord = word.trim().substring(0,5).toUpperCase();
    setWord(newWord);
  }

  function handleEnterKey(e) {
    if(!e || e.charCode === 13) {
      e?.preventDefault();
      if(word.length === 5) {
        let newWordArr = [...wordArray, word];
        setWordArray(newWordArr);
        setWord('');
        inputRef.current.focus();
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

  useEffect(() => {
    inputRef.current.focus();
  })

  return (
    <>
    <div className='flex-column-center'>
      { [1,2,3,4,5,6].map((e,i) => {
        return (
          <>
            <WordInput word={wordArray[i]} key={e}/>
          </>
        )
      })}
    </div>
    <input ref={inputRef} type="text" value={word} onChange={(e) => handleInput(e.target.value)} onKeyPress={(e) => handleEnterKey(e)}/>
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