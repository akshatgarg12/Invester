import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import AddInvestmentForm from '../Forms/AddInvestment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflowY:"scroll",
      margin:"auto",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    btn:{
      margin:"auto"
    }
  }),
);

interface AddInvestmentModalProps{
  open : boolean,
  handleClose : () => void 
}

const AddInvestmentModal : React.FC<any>= ({open, handleClose}:AddInvestmentModalProps) => {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
           <AddInvestmentForm
            closeModal = {handleClose}
           />
           {/* close directly */}
           <Button variant="outlined" className={classes.btn} onClick={handleClose}>Close</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddInvestmentModal