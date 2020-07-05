import {Reducer} from 'redux';
import produce from 'immer';
import {format} from 'date-fns-tz';

import {EventState, EventTypes} from './types';

const INITIAL_STATE: EventState = {
  events: [],
  error: false,
  event: {
    title: '',
    startDate: new Date(`${format(new Date(), 'yyyy-MM-dd')}T10:00:00.000Z`),
    endDate: new Date(`${format(new Date(), 'yyyy-MM-dd')}T10:00:00.000Z`),
    date: new Date(),
    id: '',
  },
};

const reducer: Reducer<EventState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case EventTypes.EVENT_SUCCESS: {
        draft.events = action.payload.events;
        break;
      }
      case EventTypes.EVENT_FAILURE: {
        draft.error = true;
        break;
      }
      case EventTypes.EVENT_UPDATE: {
        draft.error = false;
        break;
      }
      case EventTypes.EVENT_SAVE: {
        const {date, title, startDate, endDate, id} = action.payload.event;
        if (date) {
          draft.event.date = date;
        }
        if (endDate) {
          draft.event.endDate = endDate;
        }
        if (startDate) {
          draft.event.startDate = startDate;
        }
        if (id) {
          draft.event.id = id;
        }
        if (title) {
          draft.event.title = title;
        }
        break;
      }
      case EventTypes.EVENT_CREATE: {
        draft.error = false;
        break;
      }
      default:
        return state;
    }
  });
};

export default reducer;
