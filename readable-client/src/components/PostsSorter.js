import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortByScore, sortByDate } from '../actions/sortersActions';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from '../styles/postSorter'

class PostsSorter extends Component{

  render(){
    return(
      <div>
        <SelectField 
          style={styles.select}
          fullWidth
          floatingLabelText="Sort by:"
          value={this.props.sorters.sortBy}
          onChange={(event, index, value) => {
            if (value === 'date') {
              this.props.dispatch(sortByDate());
            } else if (value === 'score') {
              this.props.dispatch(sortByScore());
            }
          }}
        >
          <MenuItem value='date' primaryText="Date" />
          <MenuItem value='score' primaryText="Score" />
        </SelectField>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    sorters: state.sorter
  };
};

export default connect(mapStateToProps)(PostsSorter);