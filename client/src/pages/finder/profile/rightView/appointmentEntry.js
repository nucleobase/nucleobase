import React from 'react';
import { Link } from 'react-router-dom';

import { parseTime } from '../../../../helpers/parseTime';
import { parseDateAbrv, parseDateFull, days } from '../../../../helpers/parseDate';

import Payment from '../../../payment';


class AppointmentEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let appointmentDate = this.props.appointment.date.split(' ');

    return (

      <div style={{
        height: '100px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3px 0',
        backgroundColor: '#cfd8dc'
      }}>

        {/* Date */}

        <div style={{
          height: '100px',
          minWidth: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: '0'
        }}>
          <div style={{
            height: '45px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
            <span style={{fontSize: '30px', fontWeight: 'bold'}}>{appointmentDate[1].toUpperCase()}</span>
          </div>

          <div style={{
            height: '55px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
            <span style={{fontSize: '20px', fontWeight: 'bold'}}>{appointmentDate[2]}</span>
            <span style={{fontSize: '12px', fontStyle: 'italic', color: '#999999'}}>{days[appointmentDate[0].toLowerCase()]}</span>
          </div>

        </div>

        {/* Location/time info */}

        <div style={{
          height: '100%',
          minWidth: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: '2'
        }}>
          <div style={{
            height: '25px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <span style={{fontWeight: 'bold'}}>{this.props.appointment.location}</span>
          </div>

          <div style={{
            height: '25px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <span>{`From: ${parseTime(this.props.appointment.time.from)} To: ${parseTime(this.props.appointment.time.to)}`}</span>
          </div>

          <div style={{
            height: '25px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            {
              typeof this.props.session === 'string' ? 
                <span><Link to="/login">Log in</Link>&nbsp;to purchase</span> :
                <Payment appointment={this.props.appointment} sessionID={this.props.session.id} book={this.props.book}/>
            }
          </div>

        </div>

        {/* Price */}

        <div style={{
          height: '100px',
          width: '100px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: '0'
        }}>
          <span style={{fontSize: '30px', fontWeight: 'bold'}}>${this.props.appointment.price}</span>
        </div>
      </div>

    );
  }
}

export default AppointmentEntry;