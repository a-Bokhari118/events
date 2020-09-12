import React, { Fragment } from 'react';
import EventListItem from './EventListItem';
const EventList = ({ events, selectEvent, deleteEvent }) => {
  return (
    <Fragment>
      {events.map((event) => (
        <EventListItem
          event={event}
          key={event.id}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </Fragment>
  );
};

export default EventList;
