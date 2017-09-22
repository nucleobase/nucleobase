import React from 'react';

class SplitList extends React.Component {
  constructor(props) {
    super(props);
    this.buildGyms = this.buildGyms.bind(this);
  }

  buildGyms(string) {
    if (string[0] === '[') {
      let array = JSON.parse(string);
      return array;
    } else {
      return string;
    }
  }

  render() {

    const gyms = this.buildGyms(this.props.gyms);

    return ( 

      <div style={{
        height: '175px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row'
        }}>
          <div style={{
            height: '100%',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span style={{fontStyle: 'italic', color: '#999999', padding: '10px 0 0 10px'}}>Services</span>
            <p style={{padding: '10px 0 0 30px'}}>
              {this.props.goals}
            </p>
          </div>

          <div style={{
            height: '100%',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span style={{fontStyle: 'italic', color: '#999999', padding: '10px 0 0 10px'}}>Gyms</span>
            {
              Array.isArray(gyms) ? 
                gyms.map((gym, i) => (
                  <div key={i} style={{padding: '10px 0 0 15px'}}>&bull;&nbsp;{gym}</div>
                )) : 
                <span style={{padding: '10px 0 0 15px'}}>&bull;&nbsp;{gyms}</span>
            }
          </div>
        </div>
      </div>

    );

  }
}

export default SplitList;