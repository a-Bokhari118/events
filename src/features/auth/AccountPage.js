import { Form, Formik } from 'formik';
import React from 'react';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UpdateUserPassword } from '../../app/firestore/firebaseService';
import { toast } from 'react-toastify';

const AccountPage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const history = useHistory();
  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      {currentUser.providerId === 'password' && (
        <>
          <Header color='teal' sub content='Change Password' />
          <p>Use this form to change your password</p>
          <Formik
            initialValues={{ newPassword1: '', newPassword2: '' }}
            validationSchema={Yup.object({
              newPassword1: Yup.string().required('Password is required'),
              newPassword2: Yup.string().oneOf(
                [Yup.ref('newPassword1'), null],
                'passwords do not match'
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await UpdateUserPassword(values);
                history.push('/events');
                toast.success('Your password has been Updated');
              } catch (error) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className='ui form'>
                {errors.auth && (
                  <Label
                    basic
                    color='red'
                    style={{
                      marginBottom: 10,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    content={errors.auth}
                  />
                )}
                <MyTextInput
                  name='newPassword1'
                  type='password'
                  placeholder='New Password'
                />
                <MyTextInput
                  name='newPassword2'
                  type='password'
                  placeholder='Confirm Password'
                />
                <Button
                  type='submit'
                  disabled={!isValid || isSubmitting || !dirty}
                  size='large'
                  positive
                  content='Update Password'
                  loading={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </>
      )}
      {currentUser.providerId === 'facebook.com' && (
        <>
          <Header color='teal' sub content='Facebook Account' />
          <p>Please visit Facebook to update your account</p>
          <Button
            icon='facebook'
            color='facebook'
            as={Link}
            to='https://facebook.com'
            content='Go to Facebook'
          />
        </>
      )}

      {currentUser.providerId === 'google.com' && (
        <>
          <Header color='teal' sub content='Google Account' />
          <p>Please visit Google to update your account</p>
          <Button
            icon='google'
            color='google plus'
            as={Link}
            to='https://facebook.com'
            content='Go to Google'
          />
        </>
      )}
    </Segment>
  );
};

export default AccountPage;
