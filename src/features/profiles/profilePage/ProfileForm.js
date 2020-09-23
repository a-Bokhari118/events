import React from 'react';
import { Formik, Form } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { updateUserProfile } from '../../../app/firestore/firestroeService';
const ProfileForm = ({ profile, setEditMode }) => {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || '',
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
          setEditMode(false);
          toast.success('Your profile has been Updated');
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className='ui form'>
          <MyTextInput name='displayName' placeholder='Display Name' />
          <MyTextArea name='description' placeholder='Description' rows={4} />
          <Button
            type='submit'
            size='large'
            positive
            content='Update Profile'
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated='right'
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
