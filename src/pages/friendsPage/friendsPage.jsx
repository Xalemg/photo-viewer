import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getUserInfo } from '../../redux/actions/users/getUserInfo';
import { listDebts } from '../../redux/actions/debts/listDebts';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styles from "./style";
import classNames from 'classnames';
import Loader from '../../components/loader/loader';
import { CodeDisplayer } from '../../components/CodeDisplayer/CodeDisplayer';
import {FriendAdder} from '../../components/FriendAdder/FriendAdder';
import {FriendCard} from '../../components/FriendCard/FriendCard';
import Title from '../../components/Title/Title';





const FriendsPage = (props) => {

  useEffect(() => {
    props.getUserInfo(props.user.email, props.user.token);
    props.listDebts(props.user.token);

  }, []);

  const { classes } = { ...props };

  return (


    props.user ?
      <Container maxWidth="xl" className={classNames(classes.friendPage)}>
        <Grid container
          spacing={3}
          direction="row"
          justify="space-between"
          alignItems="stretch"
          className={classNames(classes.container)} >
         
          <Grid item xl={8} xm={8} lg={8} xs={12 }  >
            <Paper  className={ classNames(classes.header)}>
              <FriendAdder userId={props.user.id} />
            </Paper>
          </Grid>
          <Grid item xl={4} xm={4} lg={4} xs={12}>
            <Paper  className={ classNames(classes.header)}>
              <CodeDisplayer userId={props.user.id} />
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper>
            <Container maxWidth="xl" className={classNames(classes.friendPage)} >
            <Grid container
            spacing={5}
            direction="row"
            justify="center"
            alignContent="space-between"
            alignItems="flex-start"
            >
              <Grid xs={12} item>
              <Title>You have { props.user ? ` ${props.user.friends.length} friend`  :" 0 friends "} </Title>
              </Grid>
              { props.user ? props.user.friends.map(friend => 
                (<Grid item key = {friend._id}>
                  <FriendCard email= {friend.email}
                   id = {friend._id}
                   userId = {props.user.id}
                   debts={props.debts.filter( (debt) => debt.debtorId === friend._id || debt.userId === friend._id ? debt : null )} 
                   name= {friend.name}
                   ></FriendCard>
                   </Grid>)
              ) : ":("}
            </Grid>
            </Container>
          </Paper>
          </Grid>
        </Grid>
      </Container >
      : <Loader />
  )
}
const mapStateToProps = state => {
  return {
    user: state.user,
    debts: state.debts.debts
  }
}
export default withStyles(styles)(connect(mapStateToProps, { getUserInfo, listDebts })(FriendsPage));