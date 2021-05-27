import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import { InvestmentCardProps } from '../InvestmentCard';
import UpdateInvestmentForm from '../Forms/UpdateInvestment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding:"10px"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    btn:{
      margin:"10px 5px 0px 0px"
    }
  }),
);

interface UpdateInvestmentModalProps{
  loading:boolean,
  open : boolean,
  closeModal : () => void,
  initialData : InvestmentCardProps 
}

const UpdateInvestmentModal : React.FC<any>= ({loading, open, closeModal, initialData}:UpdateInvestmentModalProps) => {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
           <UpdateInvestmentForm
              closeModal = {closeModal}
              initialData = {initialData}
           />
           {/* close directly */}
           <Button variant="outlined" className={classes.btn} onClick={closeModal}>Close</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default UpdateInvestmentModal