import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { decrement, increment } from './testReducer';
import { toast } from 'react-toastify';

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
        onClick={() => {
          dispatch(decrement(10));
          toast.error('Somthing wrong happend!!!');
        }}
      />
      <Button
        content='Open Modal'
        color='teal'
        onClick={() =>
          dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        }
      />
    </Fragment>
  );
};

export default Sandbox;
