import { SET_HASH } from 'redux/actions/hashActions';

const initialState = { value : '' };

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_HASH:
      return { value : action.value };
    default:
      return state;
  }
}
