import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

const NavBar = () => {
  const { authenticated } = useSelector((state) => state.auth);

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
        {authenticated && (
          <Menu.Item as={NavLink} to='/createEvent'>
            <Button positive inverted content='Create Event' />
          </Menu.Item>
        )}

        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
};

export default NavBar;
