import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title/Title';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import{ IconButton, Snackbar }from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});




export const CodeDisplayer = (props) => {

    const classes = useStyles();


    const [open, setOpen] = React.useState(false);

    const handleCopyCode = (userCode) => {
        navigator.clipboard.writeText(userCode).then(function() {
            setOpen(true);
            console.log('Async: Copying to clipboard was successful!');
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      }
    return (
        <React.Fragment>
            <Title> You user code is</Title>
            <Typography component="p" variant="h5">
                {props.userId}          <IconButton  onClick = { () => handleCopyCode(props.userId)}><FileCopyIcon color="primary" /> </IconButton>              
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                Your friends can share and use the same debts that you by introducing your code
        </Typography>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">User code copied!</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
        </React.Fragment>
    );
};