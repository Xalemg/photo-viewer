import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import * as moment from 'moment';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop:"10px",
    paddingLeft: "1%",
    paddingRight: "1%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
const Debt =  (props) => {
  const classes = useStyles();

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
          <Button size="small">Close</Button>
          <Button size="small" color="primary"    
           onClick={() => {  props.history.push('/debts/editDebt'); }}>
            Edit
          </Button>
          </div>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
         
        </ExpansionPanelActions>
      </ExpansionPanel>
      </div>
  );
}

export default withRouter(Debt);