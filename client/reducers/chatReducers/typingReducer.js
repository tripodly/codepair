import { TYPING, STOP_TYPING } from '../../actions/actionTypes';

const INITIAL_STATE = [];
export default function typers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPING:
      if (state.indexOf(action.username) === - 1) {
        return [...state, action.username];
      }
      return state;
    case STOP_TYPING:
      return state.filter(user =>
        user !== action.username
      );
    default:
      return state;
  }
}
