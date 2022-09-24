import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Divider }from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../style.css'

function Help({open, handleHelpDialog}) {

  return (
    <div>
      <Dialog
        open={open}
      >
        <DialogTitle className='flex-center justify-content-between'>
          <Typography component='span' variant='h5'>How To Play</Typography>
          <IconButton
            aria-label="close"
            onClick={handleHelpDialog}
            color="error"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <Typography>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia quisquam ratione recusandae harum accusantium corporis iste ut dolore repellat vel. Quam laudantium quibusdam harum molestiae quis vitae repudiandae corrupti optio.</Typography>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Help