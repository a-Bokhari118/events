import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

const NavBar = ({ setFormOpen }) => {
  const [auth, setAuth] = useState(false);
  const history = useHistory();

  const handleSignOut = () => {
    setAuth(false);
    history.push('/');
  };
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img
            src='/assets/logo.png'
            alt='Re-vents'
            style={{ marginRight: '15px' }}
          />{' '}
          Re-vents
        </Menu.Item>
        <Menu.Item name='Events' as={NavLink} to='/events' />
        <Menu.Item name='Sandbox' as={NavLink} to='/sandbox' />
        {auth && (
          <Menu.Item as={NavLink} to='/createEvent'>
            <Button positive inverted content='Create Event' />
          </Menu.Item>
        )}

        {auth ? (
          <SignedInMenu signOut={handleSignOut} />
        ) : (
          <SignedOutMenu setAuth={setAuth} />
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;
