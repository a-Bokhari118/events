import React, { useState } from 'react';
import { Segment, Header, Button, Confirm } from 'semantic-ui-react';

import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listenToEvents } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import {
  addEventToFiresore,
  cancelEventToggle,
  listenToEventFromFiresore,
  updateEventInFiresore,
} from '../../../app/firestore/firestroeService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { toast } from 'react-toastify';
const EventForm = ({ match, history }) => {
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const { loading, error } = useSelector((state) => state.async);

  const dispatch = useDispatch();
  const initialValues = selectedEvent ?? {
    title: '',
    date: '',
    category: '',
    description: '',
    city: '',
    venue: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required('You must provide a description'),
    city: Yup.string().required('You must provide a city'),
    venue: Yup.string().required('You must provide a venue'),
    date: Yup.string().required('You must provide a date'),
  });

  const handelCancelToggle = async (event) => {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
      history.push('/events');
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  };

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFiresore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading Event...' />;
  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFiresore(values)
              : await addEventToFiresore(values);
            setSubmitting(false);
            history.push('/events');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details' />
            <MyTextInput name='title' placeholder='Event title' />
            <MySelectInput
              name='category'
              placeholder='Event category'
              options={categoryData}
            />
            <MyTextArea
              name='description'
              placeholder='Event description'
              rows={3}
            />
            <Header sub color='teal' content='Event Locattion Details' />
            <MyTextInput name='city' placeholder='Event city' />
            <MyTextInput name='venue' placeholder='Event venue' />
            <MyDateInput
              name='date'
              placeholderText='Event date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />

            <Button
              loading={isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              disabled={isSubmitting}
              type='submit'
              floated='right'
              content='Cancel'
              as={Link}
              to='/events'
            />
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                color={selectedEvent.isCancelled ? 'green' : 'red'}
                type='button'
                floated='left'
                content={
                  selectedEvent.isCancelled
                    ? 'Reactivate event'
                    : 'Cancel Event'
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}
          </Form>
        )}
      </Formik>

      <Confirm
        content={
          selectedEvent?.isCancelled
            ? 'This will reavtivate the event -- are you sure ?'
            : 'This will cancel the event -- are you sure ?'
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handelCancelToggle(selectedEvent)}
      />
    </Segment>
  );
};

export default EventForm;
