import React from 'react';
import {connect} from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import {FindPeople} from "./FindPeople";
import Button from "@material-ui/core/Button";
import {sendRequestForFriendShip} from "../../actions/users";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        position: "absolute",
        backgroundColor: "#424242",
        margin: "2% 3%"
    },
}));

export default function AskFriendList(users) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }


        setChecked(newChecked);
    };

    const dispatch = useDispatch();

    const sendRequest = () => {
        dispatch(sendRequestForFriendShip(checked));
    }

    const userList = users.users;

    const disableButton = (
        <Button variant="contained" disabled>
            Save
        </Button>
    );

    const activeButton = (
        <Button variant="contained" color="primary" onClick={sendRequest}>
            Save
        </Button>
    );

    return (
        <List dense className={classes.root}>
            {userList.map(user => {
                const labelId = `checkbox-list-secondary-label-${user['id']}`;
                return (
                    <ListItem key={user['id']} button>
                        <ListItemAvatar>
                            <Avatar
                                alt={user['username']}
                                src={``}
                            />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={user['username']}/>
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(user['id'])}
                                checked={checked.indexOf(user['id']) !== -1}
                                inputProps={{'aria-labelledby': labelId}}
                                value={user['id']}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
            <ListItem>
                { checked.length > 0 ? activeButton : disableButton }
            </ListItem>
        </List>
    );
}

