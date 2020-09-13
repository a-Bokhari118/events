import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import { Route, useLocation } from 'react-router-dom';
import EventForm from '../../features/events/eventForm/EventForm';
import Sandbox from '../../features/sandbox/Sandbox';
function App() {
  const { key } = useLocation();
  return (
    <Fragment>
      <Route path='/' component={HomePage} exact />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container className='main'>
              <Route path='/events' component={EventDashboard} exact />
              <Route path='/sandbox' component={Sandbox} exact />
              <Route path='/events/:id' component={EventDetailedPage} exact />
              <Route
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                exact
                key={key}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default App;
