import React, { useState, useContext } from 'react';
import Help from './Help';
import { IconButton } from '@mui/material';
import HelpIcon from '@mui/icons-material/HelpOutlineOutlined';
import { ThemeSwitch } from '../customComponents/customSwitches';
import { ThemeContext } from '../App'
import '../style.css'

function Header({ setTheme }) {
  const theme = useContext(ThemeContext);
  const [openHelp, setOpenHelp] = useState(false);
  function handleHelpDialog() {
    setOpenHelp(!openHelp);
  }
  return (
    <div className={theme ? 'dark-header flex-center' : 'header flex-center'}>
      <div className='flex-center justify-content-between'
        style={{ width: '100%', margin: '4px', padding: '4px' }}>
          {true ? '' :
            <ThemeSwitch
              checked={theme}
              onChange={setTheme}
            />
          }
        <h1>Wordle</h1>
        <IconButton aria-label="delete" color='info' size='large' onClick={handleHelpDialog}>
          <HelpIcon />
        </IconButton>
      </div>
      <Help
        handleHelpDialog={handleHelpDialog}
        open={openHelp}
      />
    </div>
  )
}

export default Header