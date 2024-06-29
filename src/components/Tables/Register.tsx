import React, { useState } from 'react';
import { Alert, Button, Select } from 'antd';
import { Form, Formik } from 'formik';
import { useRef } from 'react';
import * as Yup from 'yup';
import CustomInput from '../Input';
import CustomModal from '../Modal';
import SelectInput from '../SelectInput';
import CustomAlert from '../Alerts';
import { signUp } from '../../store/auth/actions/auth.actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Register = () => {
  const [openModal, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const { error, success, isLoading } = useAppSelector((state) => state.auth);

  const [option, setOption] = useState([
    {
      label: 'User',
      value: 'user',
    },
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'Tester',
      value: 'tester',
    },
  ]);

  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Firstname is too short')
      .max(50, 'Firstname is too long')
      .required('Firstname is required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    roles: Yup.string().required('Role is required'),
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    cellNumber: '',
    roles: 'user',
  };

  return (
    <React.Fragment>
      <Button
        type="primary"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Create Users
      </Button>
      <CustomModal
        title="Create User"
        isOpen={openModal}
        content={
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={(values: Record<string, any>, actions) => {
                dispatch(signUp({ values }));
              }}
              //validationSchema={registerSchema}
              innerRef={formRef}
            >
              {({
                values,
                handleChange,
                errors,
                touched,
                handleBlur,
                setFieldValue,
                setFieldTouched,
              }) => (
                <Form>
                  <CustomInput
                    label="Firstname"
                    name="firstName"
                    value={values.firstName}
                    placeholder="Enter Firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errors={errors.firstName}
                    touched={touched.firstName}
                  />

                  <div className="mt-4 mb-1">
                    <CustomInput
                      label="Lastname"
                      name="lastName"
                      value={values.lastName}
                      placeholder="Enter Lastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.lastName}
                      touched={touched.lastName}
                    />
                  </div>
                  <div className="mt-4 mb-1">
                    <CustomInput
                      label="Email Address"
                      name="email"
                      value={values.email}
                      placeholder="Enter email address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.email}
                      touched={touched.email}
                    />
                  </div>
                  <div className="mt-4 mb-1">
                    <CustomInput
                      label="Cell Number"
                      name="cellNumber"
                      placeholder="Enter Cell Number"
                      value={values.cellNumber}
                      onChange={handleChange}
                      errors={errors.cellNumber}
                      touched={touched.cellNumber}
                    />
                  </div>
                  <div className="mt-4 mb-1">
                    <SelectInput
                      label={'Role'}
                      placeholder={"Enter user 's role"}
                      name={'roles'}
                      onChange={(value) => {
                        setFieldValue('roles', value);
                        setFieldTouched('roles', true);
                      }}
                      value={values.roles}
                      option={option}
                      errors={errors.roles}
                      touched={touched.roles}
                    />
                  </div>
                  {success && (
                    <CustomAlert message={success} type={'success'} />
                  )}
                  {error && <CustomAlert message={error} type={'error'} />}
                  <br />
                </Form>
              )}
            </Formik>
          </div>
        }
        button={{
          label: isSubmitting ? 'Submitting' : 'Submit',
          action: () => {
            formRef?.current?.handleSubmit();
          },
          isOkDisabled: isSubmitting,
          isOkLoading: isLoading,
        }}
        buttonClose={{
          label: 'Cancel',
          action: () => {
            setModalOpen(false);
          },
          isCancelDisabled: isSubmitting,
        }}
      />
    </React.Fragment>
  );
};

export default Register;
