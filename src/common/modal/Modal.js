import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const Modal = ({ open, onClose, winner }) => {
  return (
    <div>
      <BootstrapDialog onClose={onClose} open={open}>
        <DialogContent
          dividers
          sx={{
            width: 400,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Typography gutterBottom>Победил {winner}</Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
          }}
        >
          <Button autoFocus onClick={onClose}>
            Попробовать еще раз
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
