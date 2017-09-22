import React from 'react';
import Info from './info';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AJAX from '../../ajax.js';
import Star from 'material-ui/svg-icons/toggle/star';
import StarHalf from 'material-ui/svg-icons/toggle/star-half';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Message from './message'
import {BarChart, PieChart, LineChart} from 'react-d3';

const styles = {
  layout: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%'
  },
  bottom: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%'
  },
  left: {
    width: '12%',
    marginRight: '10px',
    paddingLeft: '10px'
  },
  right: {
    width: '70%',
    marginRight: '-30px',
    paddingLeft: '10px'
  },
};

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      open: false,
      star: 5,
      starHalf: 0,
      session: '',
      appointments: [],
      graphSwitch: false
    };
  };

  componentWillMount() {
    AJAX.get('/session', {}, (session) => {
      this.setState({session: session}, () => {
        this.setState({
          star: parseInt(this.state.session.rating),
          starHalf: this.state.session.rating % 1 > 0 ? 1 : 0,
        }, () => {
          if (this.state.session.type === 'trainer') {
            var options = {
              sender: this.state.session.id
            }
          } else {
            var options = {
              receiver: this.state.session.id
            }
          }

          AJAX.get('/appointments', options, (appointments) => {
            this.setState({appointments: appointments});
          });
        });
      });
    });
  }

  handleOpen() {
    this.setState({open: !this.state.open});
  };

  handleClose() {
    this.setState({open: false});
     AJAX.get('/session', {}, (session) => {
      this.setState({session: session});
    });
  };

  countStar() {
    var result = [];
    var i = 0;
    while (i < this.state.star) {
      result.push(<Star color={'#f44336'} key={Math.random()}/>);
      i ++;
    }
    this.state.starHalf > 0 ? result.push(<StarHalf color={'#f44336'} key={Math.random()}/>) : result;
    while (result.length < 5) {
      result.push(<StarBorder key={Math.random()}/>);
    }
    return result;
  };

  createPieData() {
    var result = [];
    if (this.state.appointments.length > 0) {
      this.state.appointments.forEach(appointment => {
        this.state.session.type === 'trainer' ? appointment.receiver ? result.push(appointment.receiver.first) : result : result.push(appointment.sender.first);
      })
      result = result.reduce((acc, curr) => {
        acc[curr] ? acc[curr] += 1 : acc[curr] = 1
        return acc;
      }, {})
      return Object.keys(result).reduce((acc, curr) => {
        acc.push({label: curr, value: Math.round((result[curr])/this.state.appointments.filter(x => x.receiver).length * 100)})
        return acc;
      }, []);
    };
  };

  createBarDate() {
    var barData = [{name: "BarData"}];
    var values = [
          { "x": 'Jan', "y":  0}, 
          { "x": 'Feb', "y":  0},
          { "x": 'Mar', "y":  0}, 
          { "x": 'Apr', "y":  0}, 
          { "x": 'May', "y":  0},
          { "x": 'Jun', "y":  0},
          { "x": 'Jul', "y":  0},
          { "x": 'Aug', "y":  0},
          { "x": 'Sep', "y":  0},
          { "x": 'Oct', "y":  0},
          { "x": 'Nov', "y":  0},
          { "x": 'Dec', "y":  0}];
    if(this.state.appointments.length > 0) {
      this.state.appointments.forEach(appointment => {
        var month = appointment.date.split(' ')[1]
        values.forEach(value => {
          if(value.x === month) {
            return this.state.session.type === 'trainer' ? value.y += appointment.price : value.y += 1
          }
        });
      });
    };
    barData[0]['values'] = values;
    return barData;
  };

  createLineDate() {
    var lineData = [{
    name: "Rating",
    values: [ { x: 0, y: 20 }, { x: 24, y: 10 } ]
    },
    {
    name: "Ranking",
    values: [ { x:0, y:15 }, { x: 35, y: 10 } ]
  }
  ];
  return lineData
  };

  handleGraphSwitch() {
    this.setState({
      graphSwitch: !this.state.graphSwitch
    });
  };

  render() {
    const action = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleOpen.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
    ];
    const pieData = this.createPieData();
    const barData = this.createBarDate();
    const lineData = this.createLineDate();
    return (
      <div>
        <Dialog
          actions={action}
          modal={true}
          open={this.state.open}
        >
          <Info />
        </Dialog>
        <div style={styles.layout}>
          <div style={{paddingLeft: '10px'}}>
            <Avatar size={150} src={this.state.session.image_url} style={{marginTop: '10px'}}/>
          </div>
          <div>
            <h1>{this.state.session.first + ' ' + this.state.session.last}</h1>
            <div>{this.countStar()}</div>
            <FlatButton 
              backgroundColor='#263238' 
              label='edit' 
              hoverColor={'#f44336'} 
              onClick={this.handleOpen.bind(this)} 
              style={{marginTop:'30px'}}
              labelStyle={{color: 'white'}}
            />
          </div>
          <div style={{marginTop:'30px'}}>
            <h4><PhoneIcon/>: {this.state.session.phone ? '   ' + this.state.session.phone : ''}</h4>
            <h4><EmailIcon/>: {'   ' + this.state.session.email}</h4>
          </div>
        </div>  
        <br />
        <br />
        <Divider />
        <div style={styles.bottom}>
          <div style={styles.left}>
            <PieChart
              data={pieData}
              width={300}
              height={210}
              radius={65}
              innerRadius={20}
              title={this.state.session.type === 'trainer' ? 'My trainee' : 'My trainer'}
            />
          </div>
          <div style={styles.right}>  
            {this.state.graphSwitch ? 
              <LineChart
                legend={true}
                data={lineData}
                width={550}
                height={210}
                title="Line Chart"
              /> : 
              <BarChart
                data={barData}
                width={600}
                height={210}
                fill={'#3182bd'}
                yAxisLabel={this.state.session.type === 'trainer' ? 'income' : 'counts'}
                title={this.state.session.type === 'trainer' ? 'Monthly income history' : 'Monthly trainning history'}
              />
            } 
          </div>  
        </div>
        <br/>
        <Divider />
        <div>
          <div>
            <Table>
              <TableBody displayRowCheckbox={false}>
                <TableRow selectable={false}>
                  <TableRowColumn><h4>Biography</h4></TableRowColumn>
                  <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}><h5>{this.state.session.biography}</h5></TableRowColumn>
                </TableRow>
                <TableRow selectable={false}>
                  <TableRowColumn ><h4>Goal</h4></TableRowColumn>
                  <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}><h5>{this.state.session.goals}</h5></TableRowColumn>
                </TableRow>
                <TableRow selectable={false}>
                  <TableRowColumn ><h4>Gyms</h4></TableRowColumn>
                  <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}><h5>{this.state.session.gyms}</h5></TableRowColumn>
                </TableRow>
                <TableRow selectable={false}>
                  <TableRowColumn ><h4>Qualification</h4></TableRowColumn>
                  <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}><h5>{this.state.session.qualification}</h5></TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
};


export default MyProfile;