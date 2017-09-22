import React from 'react';

import Avatar from 'material-ui/Avatar';
import Star from 'material-ui/svg-icons/toggle/star';


const Header = (props) => (

  <div style={{
    height: '200px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <Avatar 
      size={150}
      src={props.image === null ? 'https://lh3.googleusercontent.com/-_G3XieI-P7Y/AAAAAAAAAAI/AAAAAAAAAEY/AU_AGutjoWQ/s640/photo.jpg' : props.image}
    />
    <div style={{
      height: '100px',
      display: 'flex',
      flexDirection: 'column',
      paddingRight: '30px'
    }}>

      <div style={{height: '30%'}}>
        <span style={{fontSize: '24px'}}>{`${props.first} ${props.last}`.toUpperCase()}</span>
      </div>

      <div style={{height: '20%'}}>
        <span style={{fontStyle: 'italic', color: '#999999'}}>{props.location === '' ? 'No Location Specified' : props.location}</span>
      </div>

      <div style={{height: '50%'}}>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          fontStyle: 'italic',
          color: '#999999',
        }}>
          <Star style={{color: '#333333'}}/>&nbsp;{props.rating === null ? 'No Ratings' : props.rating.toFixed(2)}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          fontStyle: 'italic',
          color: '#999999',
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>&nbsp;{props.views === null ? 'No Views' : props.views}
        </div>

      </div>

    </div>

  </div>

);

export default Header;