import { fetchSampleDate } from '../../app/api/mockApi';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';
import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FETCH_EVENT,
} from './eventConstants';

export const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
};

export const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};

export const loadEvent = () => {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const events = await fetchSampleDate();
      dispatch({ type: FETCH_EVENT, payload: events });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
};

export const listenToEvents = (events) => {
  return {
    type: FETCH_EVENT,
    payload: events,
  };
};
