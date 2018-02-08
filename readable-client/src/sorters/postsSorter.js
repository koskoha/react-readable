
export default (posts, { sortBy }) => 
[...posts].sort((a, b) => {
    if (sortBy === 'date') {
      return getUnixTime(a.timestamp) < getUnixTime(b.timestamp) ? 1 : -1;
    }else if (sortBy === 'score') {
      return a.voteScore < b.voteScore ? 1 : -1;
    }
  });

const getUnixTime = (date) => parseInt((new Date(date).getTime() / 1000).toFixed(0))