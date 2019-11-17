import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
      width: '100%',
    }

}));


 function FriendSelector ({friends,initialPerson, handler, error}) {
const person = {...friends.filter( (friend) => friend._id === initialPerson)[0]};
console.log(person.email);
    const classes = useStyles();
    const [value, setValues] = React.useState(
      {
        email: '',
        _id: '',
      });  

      React.useEffect(() => {
          setValues(person);
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [person.email]);
    function handleChange(event) {
      
      handler(event.target.value);
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
    }
    return (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email-helper">Email:</InputLabel>
          <Select
            error = {error}
            onChange={handleChange}
            value={value._id}
            inputProps={{
              name: 'email',
              id: '_id',
            }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            { friends.map( (friend) => {
              console.log(friend);
                 return <MenuItem key={friend.email} value={friend._id}>{friend.email}</MenuItem>
            }) }
          </Select>
        </FormControl>
    );
  }

  export default FriendSelector;