import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default (props) => {
  if (!props.show) {
    return null;
  }

  const [open, setOpen] = React.useState(props.show);

  useEffect(() => {
    console.log("didMount");
    setOpen(props.show);
  }, [props.show]);

  const onClickPositive = () => {
    setOpen(false);
    props.onClickPositive(props.id);
  };

  const onClickNegative = () => {
    setOpen(false);
    props.onClickNegative();
  };

  const handleClose = () => {
    setOpen(false);
    props.onClickNegative();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This is permanent. You cannot undo this later.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickNegative} color="primary">
          CANCEL
        </Button>
        <Button onClick={onClickPositive} color="primary" autoFocus>
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};
