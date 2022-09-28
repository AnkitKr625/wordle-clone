import {useState, useEffect, useRef, useCallback} from 'react';
import { Dialog, DialogTitle, Typography }from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import WordInput from './WordInput';

const COLORS = {
  CORRECT: '#008000d6',
  PARTIAL_CORRECT: '#dace01',
  WRONG: '#ff0000d6',
  DEFAULT: '#8f9396bf'
}

const KEYS =[
  { key: 'Q', bgColor: COLORS.DEFAULT },
  { key: 'W', bgColor: COLORS.DEFAULT },
  { key: 'E', bgColor: COLORS.DEFAULT },
  { key: 'R', bgColor: COLORS.DEFAULT },
  { key: 'T', bgColor: COLORS.DEFAULT },
  { key: 'Y', bgColor: COLORS.DEFAULT },
  { key: 'U', bgColor: COLORS.DEFAULT },
  { key: 'I', bgColor: COLORS.DEFAULT },
  { key: 'O', bgColor: COLORS.DEFAULT },
  { key: 'P', bgColor: COLORS.DEFAULT },
  { key: 'A', bgColor: COLORS.DEFAULT },
  { key: 'S', bgColor: COLORS.DEFAULT },
  { key: 'D', bgColor: COLORS.DEFAULT },
  { key: 'F', bgColor: COLORS.DEFAULT },
  { key: 'G', bgColor: COLORS.DEFAULT },
  { key: 'H', bgColor: COLORS.DEFAULT },
  { key: 'J', bgColor: COLORS.DEFAULT },
  { key: 'K', bgColor: COLORS.DEFAULT },
  { key: 'L', bgColor: COLORS.DEFAULT },
  { key: 'Z', bgColor: COLORS.DEFAULT },
  { key: 'X', bgColor: COLORS.DEFAULT },
  { key: 'C', bgColor: COLORS.DEFAULT },
  { key: 'V', bgColor: COLORS.DEFAULT },
  { key: 'B', bgColor: COLORS.DEFAULT },
  { key: 'N', bgColor: COLORS.DEFAULT },
  { key: 'M', bgColor: COLORS.DEFAULT },
]

function Body() {
  const wordOftheDay = useRef('');
  const[wordArray, setWordArray] = useState([]);
  const[word, setWord] = useState('');
  const wordRef = useRef('');
  const wordArrayRef = useRef('');
  const [foundWordArr, setFoundWordArr] = useState([]);
  const [keys, setKeys] = useState(KEYS);
  const [found, setFound] = useState(false);
  const [wordList, setWordList] = useState([]);
  const wordListRef = useRef([]);
  const [showDialog, setShowDialog] = useState(false);

  const handleEnterKey = () => {
    let cw = wordRef.current;
    let cwa = wordArrayRef.current;
    let list = wordListRef.current;
    if(cw.length === 5) {
      if(list.some((e) => e.toUpperCase() === cw)) {
        if(cwa.length < 6) {
          setWordArray([...cwa, cw]);
          setWord('');
        }
      } else {
        setShowDialog(true);
      }
    }
  }

  function handleBackspaceKey() {
    setWord(prevWord => {
      return prevWord.substring(0,prevWord.length-1);
    })
  }

  const handleKeyPress = useCallback((key) => {
    if(!found) {
      setWord((prevWord) => {
        if(prevWord.length >= 5) {
          return prevWord;
        } else {
          return prevWord + key.toUpperCase();
        }
      })
    }
  },[found])

  const handleKeyDown = useCallback((e) => {
    let keyCode = e.keyCode;
    if(keyCode === 8) {
      setWord(prevWord => prevWord.substring(0, prevWord.length -1));
    } else if (keyCode > 64 && keyCode < 91) {
      handleKeyPress(e.key.toUpperCase());
    } else if(keyCode === 13) {
      handleEnterKey();
    }
  },[handleKeyPress])

  useEffect(() => {
    wordRef.current = word;
  },[word]);

  useEffect(() => {
    wordArrayRef.current = [...wordArray];
    let newWord = wordArray[wordArray.length - 1];
    if(newWord) {
      let fndArr = [false, false, false, false, false];
      let newFndArr = [false, false, false, false, false];
      let woftd = wordOftheDay.current;
      for(let i=0;i<5;++i){
        if(woftd.charAt(i) === newWord.charAt(i)) {
          fndArr[i] = true;
          newFndArr[i] = true;
        }
      }
      if(fndArr.every((e) => e === true)) {
        setFound(true);
      }
      let colorArr = new Array(5);
      colorArr.fill(COLORS.WRONG);
      for(const i in woftd) {
        if(!fndArr[i]) {
          for(const j in newWord) {
            if(!newFndArr[j] && woftd.charAt(i) === newWord.charAt(j)) {
              colorArr[j] = COLORS.PARTIAL_CORRECT;
              newFndArr[j] = true;
              break;
            }
          }
        } else {
          colorArr[i] = COLORS.CORRECT;
        }
      }
      setKeys(prevKey => {
        let newKeyArr = [...prevKey];
        for(const i in newWord) {
          const key = newKeyArr.find((e) => e.key === newWord.charAt(i));
          if(key.bgColor !== COLORS.CORRECT) {
            key.bgColor = colorArr[i];
          }
        }
        return newKeyArr;
      })
      setFoundWordArr((prevArr) => {
        return [...prevArr, colorArr];
      })
    }
  },[wordArray])
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  },[handleKeyDown]);
  
  useEffect(() => {
    if(found) {
      window.removeEventListener('keydown', handleKeyDown);
    }
  },[found,handleKeyDown]);

  useEffect(() => {
    wordListRef.current = [...wordList];
    let index = Math.floor(Math.random() * wordList.length-1);
    wordOftheDay.current = wordList[index]?.toUpperCase();
  },[wordList])

  useEffect(() => {
    if(showDialog) {
      setTimeout(() => {
        setShowDialog(false);
      }, 2000);
    }
  },[showDialog]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b85170ef61msh3b96032521eea98p1f3c00jsna455f8dcb6a1',
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
      }
    };
    
    fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=20&wordLength=5', options)
      .then(response => response.json())
      .then(response => {
        setWordList(prev => {
          return [...response,...prev];
        })
      })
      .catch(err => console.error(err));
  },[])

  return (
    <div className='body'>
    <div className='flex-column-center'>
      { [1,2,3,4,5,6].map((e,i) => {
        return (
          <WordInput word={wordArray.length + 1 >= e ? wordArray[i] || word : ''} key={e} bgColor={foundWordArr[i]}/>
        )
      })}
    </div>
    <div>
      <div className='flex-center'>
        {keys.slice(0,10).map(({key, bgColor}) => {
          return (
            <div className='flex-center key cursor-pointer' style={{backgroundColor: bgColor, transition: '3s'}} onClick={() => handleKeyPress(key)} key={key}>{key}</div>
          )
        })}
      </div>
      <div className='flex-center'>
        {keys.slice(10,19).map(({key, bgColor}) => {
          return (
            <div className='flex-center key cursor-pointer' style={{backgroundColor: bgColor, transition: '3s'}} onClick={() => handleKeyPress(key)} key={key}>{key}</div>
          )
        })}
      </div>
      <div className='flex-center'>
        <div className="flex-center key cursor-pointer" style={{backgroundColor: '#8f9396bf'}} onClick={() => handleEnterKey()}>{'ENTER'}</div>
        {keys.slice(19).map(({key, bgColor}) => {
          return (
            <div className='flex-center key cursor-pointer' style={{backgroundColor: bgColor, transition: '3s'}} onClick={() => handleKeyPress(key)} key={key}>{key}</div>
          )
        })}
        <div className="flex-center key cursor-pointer" style={{backgroundColor: '#8f9396bf'}} onClick={() => handleBackspaceKey()}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="48" data-testid="icon-backspace"><path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>
        </div>
      </div>
    </div>
      <Dialog
        open={showDialog}
      >
        <DialogTitle className='flex-center justify-content-between'>
          <ErrorOutlineOutlinedIcon />
          <Typography component='span' variant='h6'>Word not in the list</Typography>
        </DialogTitle>
      </Dialog>
    </div>
  )
}

export default Body