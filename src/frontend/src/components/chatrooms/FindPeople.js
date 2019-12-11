import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {getUsersByUsername} from "../../actions/users";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from "@material-ui/core/Toolbar";
import AskFriendList from "./AskFriendList";

export class FindPeople extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            username: "",
            showList:false
        }
    }


    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
        if (e.target.value.length > 1) {
            this.props.getUsersByUsername(this.state.username);
            this.setState({showList:true})
        }
        else{
            this.setState({showList:false})
        }
    };

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>

                    </div>
                    <InputBase
                        name="username"
                        placeholder="Search…"
                        onChange={this.onChange}
                        value={this.state.username}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                    />
                </div>
                {this.state.showList ? <AskFriendList users={this.props.users}/> : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.chatrooms.users
})

export default connect(mapStateToProps,
    {getUsersByUsername})(FindPeople);