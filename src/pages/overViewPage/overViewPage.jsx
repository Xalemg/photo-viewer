import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { listDebts } from '../../redux/actions/debts/listDebts';
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styles from "./style";
import classNames from 'classnames';
import DebtList from '../../components/DebtList/DebtList';
import Title from '../../components/Title/Title';
import Summary from '../../components/Summary/Summary';
import { Typography } from '@material-ui/core';
import Loader from '../../components/loader/loader';
import OverviewChart from '../../components/overviewChart/overviewChart';
import { calculateSum } from '../../components/auxiliar/functions/auxFunctions';


export class overViewPage extends React.Component {

  componentDidMount =() => {    
      this.props.listDebts(this.props.user.token);

  }

  getLastDate = (debts) => {
    
    if (debts.length > 0) {
     const dates = debts.map( (debt) => {
       return new Date (debt.date);
     });          
     const maxDate =  new Date(Math.max.apply(null,dates));
     return maxDate.toDateString();
    } else {
      return debts;
    }
  }

  render() {

    const { classes } = {...this.props};
    return (
      this.props.debts ? 
      <Container maxWidth="xl" >
      <Grid container spacing={3} className = {classNames(classes.container)} >
         <Grid item xs={12} md={4} lg={3}>
          <Paper className = {classNames(classes.summary) }>
          <Summary lastDate = { this.getLastDate( this.props.debts.debts)}
          totalDebt = {  calculateSum( this.props.debts.debts, this.props.user.id) }>
          </Summary>
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={classNames(classes.header)}>
            <OverviewChart
            legend ={true}
            userId = {this.props.user.id}
            debts={this.props.debts.debts}/>
          </Paper>
        </Grid>
        {/* Recent Debts */}
        <Grid item xs={12} className = {classNames(classes.debtPaper)} >
        <Title textAlign= 'left' >Recent Debts</Title>
        {this.props.debts.debts.length >= 1 ? 
        <DebtList debts = { this.props.debts.debts} user={this.props.user} className = {classNames(classes.debtTable)}/> :
        <Typography variant="h6" component="h1"> There's no payment yet</Typography>}
        </Grid>
      </Grid>
    </Container>
     : <Loader/>
       )
  }
}
const mapStateToProps = state => {
  return {
   debts: state.debts,
   user: state.user
  }
}
export default  withStyles(styles)(connect(mapStateToProps, {listDebts})(overViewPage))