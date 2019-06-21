// import moment from 'moment; 
// This isn't going to work cause it will try to get the mocked version
// causing an infinite recall of itself, leading to memory overflow

const moment = require.requireActual('moment');

export default (timestamp = 0) => {
  return moment(timestamp);
};

// forces moment to start at a specific time if no time is provided.