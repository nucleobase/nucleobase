import {List, ListItem, makeSelectable} from 'material-ui/List';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import { parseDateAbrv } from './../../../../helpers/parseDate';
import { parseTime } from './../../../../helpers/parseTime';
import React from 'react';

class ListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  filter(appointment) {
    if (this.props.filter.length) {
      for (var key in appointment) {
        if (appointment[key]){
          for (var i = 0; i !== this.props.filter.length; i++) {
            if (key === 'sender' || key === 'receiver' ) {
              if (JSON.stringify(appointment[key].first + appointment[key].last).toUpperCase().includes(this.props.filter[i].toUpperCase())) {
                return true;
              }
            } else if (JSON.stringify(appointment[key]).toUpperCase().includes(this.props.filter[i].toUpperCase())) {
              return true;
            }
          }
        }
      }
    } else {
      return true;
    }

    return false;
  }

  render() {
    const iconButtonElement = (appointment, index) => (
      this.props.session.type === 'trainer' && !appointment.receiver ?
      <IconButton
        key={'IconButton' + index}
        tooltip="Cancel"
        tooltipPosition="bottom-center"
        onClick={() => {this.props.deleteAppointment(appointment)}}
      >
        <ClearIcon/>
      </IconButton> :
      ''
    );

    const appointmentElement = (appointment, index) => (
      <div key={'div' + index}>
        <ListItem
          key={'List' + index}
          hoverColor={
            appointment.receiver ?
            "#f44336" :
            "#263238"
          }
          style={{padding: '0'}}
          rightIconButton={iconButtonElement(appointment, index)}
          onClick={() => this.props.previewAppointment(appointment)}
          primaryText={`${parseDateAbrv(appointment.date)}`}
          secondaryText={
            <div key={'div' + index} style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <span key={'span' + index} >
                {`${parseTime(appointment.time.from)} - ${parseTime(appointment.time.to)}`}
              </span>
            </div>
          }
        />
        <Divider
          key={'Divider' + index}
          inset={true}
        />
      </div>
    );

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'list',
        overflowY: 'scroll',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}>
        <List>
          <Subheader>
            Appointments
          </Subheader>{
            this.props.appointments.map((appointment, index) => {
              if (this.filter(appointment)) {
                return appointmentElement(appointment, index);
              }
            })
          }
        </List>
      </div>
    );
  }
}

export default ListComponent;