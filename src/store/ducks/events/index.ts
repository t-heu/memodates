import {Reducer} from 'redux';
import produce from 'immer';

import {EventState, EventTypes} from './types';

const INITIAL_STATE: EventState = {
  birthday: [],
  error: false,
};

const reducer: Reducer<EventState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case EventTypes.EVENT_SUCCESS: {
        draft.birthday = action.payload.events;
        break;
      }
      case EventTypes.EVENT_FAILURE: {
        draft.error = false;
        break;
      }
      default:
        return state;
    }
  });
};

export default reducer;
