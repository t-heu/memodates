import {action} from 'typesafe-actions';

import {EventTypes, Events, Event} from './types';

export const EventSuccess = ({events}: Events) =>
  action(EventTypes.EVENT_SUCCESS, {events});
export const EventFailure = () => action(EventTypes.EVENT_FAILURE);
export const EventUpdate = () => action(EventTypes.EVENT_UPDATE);
export const EventSave = ({event}: Event) =>
  action(EventTypes.EVENT_SAVE, {event});
export const EventCreate = ({event}: Event) =>
  action(EventTypes.EVENT_CREATE, {event});
