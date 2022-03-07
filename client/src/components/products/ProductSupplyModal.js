import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";

export default function MaxWidthDialog({ isDialogOpened, handleCloseDialog }) {
  useEffect(() => {
    handleClickOpen();
  }, []);

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth] = useState("md");

  const handleClickOpen = () => {
    console.log('dd')
  };

  const handleClose = () => {
    //setOpen(false);
    handleCloseDialog(false);
  };

  /* const handleMaxWidthChange = event => {
    setMaxWidth(event.target.value);
  }; */

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isDialogOpened}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>Somthing in the Dialog</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
