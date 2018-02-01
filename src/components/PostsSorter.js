import React from 'react';
import { connect } from 'react-redux';
import { sortByScore, sortByDate } from '../actions/sortersActions';

const PostsSorter = (props) => (
  <div className='col s6 m6'>
    Sort By: 
    <select className="browser-default "
      value={props.sorters.sortBy}
      onChange={(e) => {
        if (e.target.value === 'date') {
          props.dispatch(sortByDate());
        } else if (e.target.value === 'score') {
          props.dispatch(sortByScore());
        }
      }}
    >
      <option value="date">Date</option>
      <option value="score">Score</option>
    </select>
  </div>
);

const mapStateToProps = (state) => {
  return {
    sorters: state.sorter
  };
};

export default connect(mapStateToProps)(PostsSorter);