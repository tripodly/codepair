import { ADD_MESSAGE, RECEIVE_MESSAGE, LOAD_MESSAGES, LOAD_MESSAGES_SUCCESS, LOAD_MESSAGES_FAIL } from '../../actions/actionTypes';

const INITIAL_STATE = {
  loaded: false,
  data: [],
  fetchHistory: []
};
export default function messages(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {...state,
        data: [...state.data, action.message]
      };
    case RECEIVE_MESSAGE:
      return {...state,
        data: [...state.data, action.message]
      };
    case LOAD_MESSAGES:
      return {...state,
        loading: true
      };
    case LOAD_MESSAGES_SUCCESS:
      return {...state,
        loading: false,
        loaded: true,
        fetchHistory: [...state.fetchHistory, { lastFetch: action.date, channelName: action.channel }],
        data: [...state.data.filter(message => message.channelID !== action.channel), ...action.json]
      };
    case LOAD_MESSAGES_FAIL:
      return {...state,
        loading: false,
        loaded: false,
        error: action.error,
        data: [...state.data]
      };
    
    default:
      return state;
  }
}
