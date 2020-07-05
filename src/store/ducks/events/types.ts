/**
 * Action types
 */
export enum EventTypes {
  EVENT_SUCCESS = '@event/EVENT_SUCCESS',
  EVENT_FAILURE = '@event/EVENT_FAILURE',
  EVENT_UPDATE = '@event/EVENT_UPDATE',
  EVENT_SAVE = '@event/EVENT_SAVE',
  EVENT_CREATE = '@event/EVENT_CREATE',
}
/**
 * Data Types
 */
export interface Event {
  event: IEvent;
}

export interface Events {
  events: Ievents[];
}

/**
 * State Types
 */
export interface EventState {
  readonly events: any[] | Ievents[];
  readonly error: boolean;
  readonly event: IEvent;
}
/*
{
  "alarms": [
    {"date": "2020-09-07T00:30:00.000Z"}
  ],
  "allDay": false,
  "attendees": [],
  "availability": "busy",
  "calendar": {
    "allowedAvailabilities": ["busy", "free"],
    "allowsModifications": true,
    "color": "#9FE1E7",
    "id": "4",
    "isPrimary": true,
    "source": "teuzin375@gmail.com",
    "title": "astrocraft@outlook.com",
    "type": "com.google"
  },
    "description": "",
    "endDate": "2020-09-08T00:00:00.000Z",
    "id": "57",
    "location": "",
    "startDate": "2020-09-07T00:00:00.000Z",
    "title": "EUEU"
  }
*/
export interface IEvent {
  title?: string;
  startDate?: Date;
  endDate?: Date;
  date?: Date;
  id?: string;
}

interface Ievents {
  description: string;
  endDate: string;
  id: string;
  location: string;
  startDate: string;
  title: string;
  color: string;
}
