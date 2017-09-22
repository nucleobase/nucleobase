import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Messages from './Messages';
import AJAX from '../../../../ajax.js';
import Dialog from 'material-ui/Dialog';
import StarRatingComponent from 'react-star-rating-component';
import TextField from 'material-ui/TextField';

export default class AffiliationsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      messages: [],
      message: 'sdfsdf',
      selected: null,
      open: false,
      rating: 1,
      reviews: '',
      name: ''
    };
  }

  selectUser() {
    this.setState({
      selected: this.props.info
    }, () => {
      this.getMessages();
      this.setState({expanded: !this.state.expanded});
    });
  }

  getMessages() {
    AJAX.get('/messages', {
      sender: this.props.session.id,
      receiver: this.state.selected.id
    }, (messagesA) => {
      AJAX.get('/messages', {
        sender: this.state.selected.id,
        receiver: this.props.session.id
      }, (messagesB) => {
        this.setState({
          messages: messagesA.concat(messagesB).sort((messageA, messageB) => {
            return messageA.id - messageB.id;
          })
        });
      });
    });
  }

  handleReviewClick() {
    this.setState({open: !this.state.open});
  }

  handleClose() {
    this.setState({
      open: !this.state.open
    });


    //select * from ratings where user_id=24 and trainer_id=receiver: this.state.session.id
    AJAX.get('/ratings', {user_id: this.props.session.id, trainer_id: this.props.info.id}, (data) => {

      if (data.length) {
        //update
        AJAX.put('/ratings', {

          id: data[0].id,
          // value between 1-5
          user_rating: this.state.rating,
          // not used
          trainer_rating: 0,

        }, () => {});

      } else {
        //create
        AJAX.post('/ratings', {

          // user_id => rater can be user or trainer
          user_id: this.props.session.id,
          // trainer_id => rated person can be a user or a trainer 
          trainer_id: this.props.info.id, 
          // value between 1-5
          user_rating: this.state.rating,
          // not used
          trainer_rating: 0,

        }, () => {});
      }
    });
    AJAX.post('/reviews', {
      // user_id => reviewer can be trainee or trainer
      user_id: this.props.session.id,
      // trainer_id => reviewee person can be a trainee or a trainer 
      trainer_id: this.props.info.id, 
      // value between 1-5
      review: this.state.review
    }, () => {});
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  handleReviewChange(event) {
    this.state.review = event.target.value;
  }

  updateMessage(event) {
    this.setState({message: event.target.value});
  }

  submitMessage(event) {
    if (event.type === 'click' || (event.type === 'keypress' && event.key === 'Enter')) {
      AJAX.post('/messages', {
        sender: this.props.session.id,
        receiver: this.props.info.id,
        message: this.state.message
      }, (message) => {
        this.setState({message: ''}, () => {
          this.getMessages();
        });
      });
    }
  }


  render() {
    const action = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleReviewClick.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
    ];
    return (
      <div>
        <Card expanded={this.state.expanded}>
          <CardHeader
            title= {this.props.info.first + this.props.info.last}
            subtitle={this.props.info.biography}
            avatar= {this.props.info.image_url}
          />
          <CardActions>
            <FlatButton label="Review me" onClick={this.handleReviewClick.bind(this)} />
            <FlatButton label="Messages" onClick={this.selectUser.bind(this)} />
          </CardActions>
          <CardText expandable={true}>
            <Messages session={this.props.session} messages={this.state.messages} updateMessage={this.updateMessage.bind(this)} submitMessage={this.submitMessage.bind(this)}/>
          </CardText>
        </Card>
        <Dialog
          actions={action}
          modal={true}
          open={this.state.open}
        >
          <h4>Your review</h4><br/>
          <div>
            <StarRatingComponent 
              name='star'
              starCount={5}
              value={this.state.rating}
              onStarClick={this.onStarClick.bind(this)}
            />
            <h4>
              {this.state.rating < 5 ? this.state.rating < 4 ? this.state.rating < 3 ? this.state.rating < 2 ? 'Meh, I experienced better.' : 'I may not book the second one with this trainer.' : 'A-Ok.' : 'Yay! I am a fan.' : 'Woohoo! This tranier is awsome!'}
            </h4>
          </div>
          <TextField hintText='Please write a review'
            floatingLabelText="Your review"
            fullWidth={true}
            multiLine={true}
            onChange={this.handleReviewChange.bind(this)}
          /><br/>
        </Dialog>
        <br/>
      </div>
    );
  }
}