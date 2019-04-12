import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './App.css';
import firebase from './Firebase';
import {Button} from "semantic-ui-react";


class App extends Component{
  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscrible = null;
    this.state = {
      boards: []
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const {phone_number, lastName, firstName, email, company, } = doc.data();
      boards.push({
        key: doc.id,
        doc,
        phone_number,
        lastName,
        firstName,
        email,
        company,
      });
    });
    this.setState({
      boards
    });
  };

  componentDidMount() {
    this.unsubscrible = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return(
        <div className='ui container'>
          <h3 className='ui header'>  Phone List </h3>
          <Button><Link to='/create/'>Add Number</Link></Button>
          <table className='ui celled table'>
            <thead>
            <tr>
              <th>Phone Number</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>E-mail</th>
              <th>Company</th>
            </tr>
            </thead>
            <tbody>
            {this.state.boards.map(boards =>
                <tr>
                  <td data-label="Phone Number"> <Link to={`/show/${boards.key}`}>{boards.phone_number}</Link></td>
                  <td data-label="Last Name">{boards.lastName}</td>
                  <td data-label="First Name">{boards.firstName}</td>
                  <td data-label="E-mail">{boards.email}</td>
                  <td data-label="Company">{boards.company}</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
    );
  }
}
export default App;