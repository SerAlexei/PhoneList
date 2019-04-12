import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import {Link} from 'react-router-dom';

class Create extends Component{
    constructor(){
        super();
        this.ref = firebase.firestore().collection('boards');
        this.state = {
            phone_number: '',
            lastName: '',
            firstName: '',
            email: '',
            company:  ''
        };
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };
    onSubmit = (e) => {
        e.preventDefault();
        const {phone_number, lastName, firstName, email, company} = this.state;
        this.ref.add({
            phone_number,
            lastName,
            firstName,
            email,
            company
        }).then((docRef) => {
            this.setState({
                phone_number: "",
                lastName: "",
                firstName: "",
                email: "",
                company: ""
            });
            this.props.history.push("/")
        }).catch((error) => {
            console.log("Error adding document: ", error);
        });
    };

    render() {
        const {phone_number, lastName, firstName, email, company} = this.state;
        return (
            <div className='ui container'>
                <h3 className='ui header'>  Add Number </h3>

                <form className="ui form" onSubmit={this.onSubmit}>
                    <div className="field">
                        <label>First Name:</label>
                        <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={this.onChange}/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={this.onChange}/>
                    </div>
                    <div className="field">
                        <label>Phone Number</label>
                        <input type="text" name="phone_number" placeholder="Phone Number" value={phone_number} onChange={this.onChange}/>
                    </div>
                    <div className="field">
                        <label>E-mail</label>
                        <input type="text" name="email" placeholder="E-mail" value={email} onChange={this.onChange}/>
                    </div>
                    <div className="field">
                        <label>Company</label>
                        <input type="text" name="company" placeholder="Company" value={company} onChange={this.onChange}/>
                    </div>

                    <button className="ui button" type="submit">Submit</button>
                </form>

            </div>
        );
    }
}
export default Create;