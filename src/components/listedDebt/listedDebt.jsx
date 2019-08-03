import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import * as moment from 'moment';
import { withRouter } from "react-router-dom";
import useStyles  from "./style";
import {connect} from 'react-redux';
import DeleteDebtModal from '../../components/deleteDebtModal/deleteDebtModal';
import {deleteDebt} from '../../redux/actions/debts/deleteDebt';

const Debt =  (props) => {
  const classes = useStyles();
  const [deleteModalOpen, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  
  return (
    <div className={classes.root}>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
          <Typography  className={classes.heading}>{moment(props.date).format(`HH:mm    DD/MM/YYYY`)}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>{props.debtor}</Typography>
          </div>
          <div className={classes.column}>
          <Typography align= "right" className={classes.heading}>{props.amount}€</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
          <Typography className={classes.heading}>{props.reason}</Typography>
          </div>
          <div className={classes.column}>
          <Typography className={classes.heading}>{props.description}</Typography>
          </div>
          <div align = "right" className={classes.column}>
          <Button size="small" color="secondary" onClick ={handleClickOpen} >DELETE</Button>
          <Button size="small" color="primary"    
           onClick={() => {  props.history.push(`/debts/editDebt/${props.id}`); }}>
            EDIT
          </Button>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <DeleteDebtModal open= {deleteModalOpen}
        debtId = {props.id}
        handleClickOpen ={handleClickOpen}
        handleClose = {handleClose} />
      </div>
  );
}

export default connect(null, {deleteDebt})( withRouter(Debt));