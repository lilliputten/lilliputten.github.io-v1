import { handleActions } from 'redux-actions';

export default handleActions({
  SELECT_VIEW: (state, action) => ({
    name: action.payload
  })
}, {});
