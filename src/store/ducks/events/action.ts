import {action} from 'typesafe-actions';

import {EventTypes, Event} from './types';

export const EventSuccess = ({events}: Event) =>
  action(EventTypes.EVENT_SUCCESS, {events});
export const EventFailure = () => action(EventTypes.EVENT_FAILURE);
export const EventUpdate = () => action(EventTypes.EVENT_UPDATE);
