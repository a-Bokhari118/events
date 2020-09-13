import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { decrement, increment } from './testReducer';

const Sandbox = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  return (
    <Fragment>
      <h1>Testing 123</h1>
      <h3>Data is: {data}</h3>
      <Button
        content='Increment'
        color='green'
        onClick={() => dispatch(increment(20))}
      />
      <Button
        content='Decrement'
        color='red'
        onClick={() => dispatch(decrement(10))}
      />
    </Fragment>
  );
};

export default Sandbox;
