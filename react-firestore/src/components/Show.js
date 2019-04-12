import React, {Component} from 'react';
import firebase from '../Firebase';
import {Link} from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';

class Show extends Component{
    constructor(props){
        super(props);
        this.state = {
            boards: [],
            key:''
        };
    }
    componentDidMount() {
        const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    boards: doc.data(),
                    key: doc.id,
                    isLoading: false
                });

            } else {
                console.log("No such document!");
            }
        });
    }
    delete(id){
        firebase.firestore().collection('boards').doc(id).delete().then(()=>{
           console.log("Document successfully deleted!");
           this.props.history.push("/")
        }).catch((error)=>{
           console.error("Error removing document: ", error);
        });
    }

    render() {
        return(
            <div className='ui container'>
                <h4 className='ui-header'><Link to='/'/>Phone List</h4>
                <Card>
                    <Card.Content>
                        <Image/>
                        <Card.Header><h3 className=' phone_number'>{this.state.boards.phone_number}</h3></Card.Header>
                        <Card.Header>{this.state.boards.firstName}{this.state.boards.lastName}</Card.Header>
                        <Card.Meta>{this.state.boards.email}</Card.Meta>
                        <Card.Description>{this.state.boards.company}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'><Link to={`/edit/${this.state.key}`}>Approve</Link>
                            </Button>
                            <Button basic color='red' onClick={this.delete.bind(this, this.state.key)}>
                                Decline
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}
export default Show;