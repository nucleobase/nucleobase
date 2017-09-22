import React from 'react';

// import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import Header from './header';
import Category from './category';
import SplitList from './splitList';
import Buttons from './buttons';


class TrainerProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div className="col-lg-6 col-sm-12" style={{height: '100%', backgroundColor: '#FFFFFF'}}>

        <Header 
          image={this.props.profile.image_url} 
          first={this.props.profile.first} 
          last={this.props.profile.last} 
          location={this.props.profile.location}
          rating={this.props.profile.rating}
          views={this.props.profile.total_view}
        />

        <Divider />

        <Category type={'Qualifications'} text={this.props.profile.qualification} />

        <Divider />

        <Category type={'Biography'} text={this.props.profile.biography} />

        <Divider />

        <SplitList goals={this.props.profile.goals} gyms={this.props.profile.gyms}/>

        <Buttons profile={this.props.profile} session={this.props.session}/>

      </div>

    );

  }
}

export default TrainerProfile;