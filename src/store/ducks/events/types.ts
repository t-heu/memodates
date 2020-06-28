/**
 * Action types
 */
export enum EventTypes {
  EVENT_SUCCESS = '@event/EVENT_SUCCESS',
  EVENT_FAILURE = '@event/EVENT_FAILURE',
}
/**
 * Data Types
 */
export interface Event {
  events: Ibirthday[];
}

/**
 * State Types
 */
export interface EventState {
  readonly birthday: [] | Ibirthday[];
  readonly error: boolean;
}

interface Ibirthday {
  start: Date;
  end: Date;
  date: Date;
  id: string;
  summary: string;
  color: string;
}
