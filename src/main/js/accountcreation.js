import React from 'react';

var AccountComponent = React.createClass({

    getInitialState () {
        return {
             name : "",
             password : "",
             success : ""
        }
    },

    handleNameChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ name : e.target.value , success : "..."});
    },
    

    handleSubmit(e) {
        // Prevents reinitialization
        e.preventDefault();
        let name = this.state.name;
        let password = this.state.password;
        fetch('http://localhost:8080/AccountCreation/createAccount?'
            + 'userName=' + name + "&password=" + password, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success: 'Account Created!'});
            }
            else{
                this.setState({success: 'Nope, this username is already taken'});
            }
        })
    },

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.name} onChange={this.handleNameChange}/>

                    </label>
                    <input type="submit" value="Create Account!" />
                </form>
                Name: {this.state.name}
                <br/>
                Success: {this.state.success}
            </div>
        );
    },




});

export class AccountCreation extends React.Component {

    constructor() {
        super();
    }



    render(){
        return(
            <div>
                <AccountComponent/>
            </div>
        );

    }

}
