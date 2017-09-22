import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/navbar';
import SearchBar from './searchbar';
import Profile from './profile';
import ResultsList from './resultsList';

import AJAX from '../../ajax';

const filterFunctions = {
  'rating': (profiles, param) => {
    return profiles.filter((profile) => {
      return profile.rating >= param;
    });
  },
  'price': (profiles) => {
    return profiles.sort((a, b) => {
      return a.avg_price - b.avg_price;
    });
  }
};

class Finder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        rating: {
          toggled: false,
          param: ''
        },
        price: {
          toggled: false,
          param: ''
        },
      },
      session: '',
      profiles: [],
      selected: false,
      selectedProfile: {},
      trigger: false
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.fetchProfiles = this.fetchProfiles.bind(this);
    this.selectionHandler = this.selectionHandler.bind(this);
  }

  handleFilter(options) {
    if (options.action === 'toggle') {
      let filters = this.state.filters;
      filters[options.filter].toggled = !filters[options.filter].toggled;
      filters[options.filter].param = options.param || '';
      this.setState({
        filters
      }, this.applyFilters);
    }
    if (options.action === 'update') {
      let filters = this.state.filters;
      filters[options.filter].param = options.param || '';
      this.setState({
        filters
      }, this.applyFilters);
    }
  }

  /* applyFilters */
  applyFilters() {
    const { filters } = this.state;
    let found = false;
    for (let filter in filters) {
      if (filters[filter].toggled) {
        found = true;
        let options = {};
        this.state.session.type === 'trainer' ?
          options.filter = 'trainee' :
          options.filter = 'trainer';
        AJAX.get('/profilesByFilter', options, (profiles) => {
          let filtered = filterFunctions[filter](profiles, filters[filter].param);
          this.setState({
            profiles: filtered
          });
        });
      }
    }
    found === true ? null : this.fetchProfiles();
  }

  componentDidMount() {
    AJAX.get('/session', {}, (data) => {
      this.setState({
        session: data
      }, this.fetchProfiles);
    });
  }

  fetchProfiles() {
    let options = {};
    this.state.session.type === 'trainer' ?
      options.filter = 'trainee' :
      options.filter = 'trainer';
    AJAX.get('/profilesByFilter', options, (profiles) => {
      this.setState({
        profiles
      });
    });
  }

  selectionHandler(profile) {
    this.setState({
      selected: true,
      selectedProfile: profile
    });
  }

  toggleSelected() {
    this.setState({
      selected: false
    });
  }

  render() {

    const { session, profiles, selected, selectedProfile } = this.state;

    return (

      <div style={{
        height: '100%',
        width: '100%'
      }}>

        <Navbar session={session}/>

        <div className="col-sm-8 col-sm-offset-2" style={{
          height: '94.7%',
          backgroundColor: '#FFFFFF',
          padding: '0'
        }}>
          
          <SearchBar session={session} profiles={profiles} handleFilter={this.handleFilter}/>

          {
            selected === true ? 
              <Profile toggle={this.toggleSelected} profile={selectedProfile} session={session}/> :
              <ResultsList profiles={profiles} select={this.selectionHandler}/>
          }

        </div>


      </div>
      
    );
  }

}

export default Finder;