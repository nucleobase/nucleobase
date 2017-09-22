import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const Main = (props) => (

  <div className="col-sm-8 col-sm-offset-2" style={{
    height: '94.8%',
    backgroundColor: '#FFFFFF'
  }}>

    <h1></h1>

    <form action="/signup" method="post">
      <div className="form-group">
        <label>Email</label>
        <input type="text" className="form-control" name="email" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" name="password" />
      </div>


      <FlatButton type="submit" label="Signup" style={{color: 'white'}} backgroundColor="#263238" hoverColor="#f44336" />
    </form>

    <hr />
    <div>
      Or signup with any of the following services:<br />
      <a style={{marginRight: '15px'}} href="/auth/facebook"><img src="social-facebook.png" style={{width: '25px', height: '25px'}}/></a>
      <a style={{marginLeft: '15px', marginRight: '15px'}} href="/auth/google"><img src="social-google.png" style={{width: '25px', height: '25px'}}/></a>
      <a style={{marginLeft: '15px'}} href="/auth/twitter"><img src="social-twitter.png" style={{width: '25px', height: '25px'}}/></a>
    </div>
    <hr />

    <p>Already have an account? <Link to="/login">Login</Link></p>
    <p>Or go <Link to="/">home</Link>.</p>

  </div>

);

export default Main;