import React from 'react';

import AppointmentEntry from './appointmentEntry';


class AppointmentsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div style={{height: '50%', width: '100%', backgroundColor: 'white', display: 'list', overflowY: 'scroll', backgroundColor: '#f5f5f5'}}>
        {
          this.props.appointments.map((appointment, i) => (
            appointment.receiver === null ?
              <div key={i} style={{padding: '2px 0'}}><AppointmentEntry appointment={appointment} session={this.props.session} book={this.props.book}/></div> :
              <span key={i}></span>
          ))
        }
      </div>

    );

  }
}

export default AppointmentsList;