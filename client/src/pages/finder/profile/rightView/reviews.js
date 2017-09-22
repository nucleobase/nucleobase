import React from 'react';

import { GridList, GridTile } from 'material-ui/GridList';
import Star from 'material-ui/svg-icons/toggle/star';
import Divider from 'material-ui/Divider';


class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.countStars = this.countStars.bind(this);
  }

  countStars(review) {
    var stars = [];
    for (let i = 0; i < review.rating; i++) {
      stars.push(<Star color={'#f44336'} key={i} />);
    }
    return stars;
  }

  render() {

    return (

      <div style={{
        height: '25%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#263238'
      }}>

        <GridList cols={2} style={{
          margin: '0',
          flexWrap: 'nowrap',
          overflowX: 'scroll',
        }}>
          {
            this.props.reviews.map((review, i) => (
              <GridTile
                style={{minWidth: '200px'}}
                key={i}
              >
                <div id={'Tile' + i} style={{
                  height: '100%',
                  minWidth: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#b0bec5'
                }}>

                  <div style={{
                    height: '50px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {this.countStars(review)}
                  </div>

                  <div style={{
                    height: '125px',
                    width: '95%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <span style={{fontStyle: 'italic', alignText: 'center'}}>{review.review}</span>
                  </div>

                </div>
              </GridTile>
            ))
          }
        </GridList>
      </div>

    );

  }
}

export default Reviews;