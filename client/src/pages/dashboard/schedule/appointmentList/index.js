import AJAX from '../../../../ajax.js';
import ListComponent from './list';
import Preview from './preview';
import React from 'react';

class ApptList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: null
    };
  }

  previewAppointment(appointment) {
    this.setState({
      appointment: appointment
    });
  }

  render() {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        minWidth: '500px',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="row" style={{
          width: '100%',
          height: '600px'
        }}>
          <div className="col-lg-4 col-sm-4" style={{
            padding: '0',
            height: '100%',
            backgroundColor: '#DCD8D7'
          }}>
            <ListComponent
              filter={this.props.filter}
              session={this.props.session}
              appointments={this.props.appointments}
              deleteAppointment={this.props.deleteAppointment}
              previewAppointment={this.previewAppointment.bind(this)}
            />
          </div>
          <Preview
            session={this.props.session}
            appointment={this.state.appointment}
          />
        </div>
      </div>
    );
  }
}

export default ApptList;