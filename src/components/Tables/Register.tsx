import React, { useState } from 'react';
import { Button } from 'antd';
import { Form, Formik } from 'formik';
import { useRef } from 'react';
import * as Yup from 'yup';
import CustomInput from '../Input';
import CustomModal from '../Modal';
import SelectInput from '../SelectInput';
import CustomAlert from '../Alerts';
import { useAddUserMutation } from '../../Services/user';

const Register = () => {
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formRef = useRef(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const option = [
    {
      label: 'User',
      value: 'user',
    },
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'Manager',
      value: 'manager',
    },
  ];

  const phoneNumberRegex = /^(\+?27|0)[6-8][0-9]{8}$/;

  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Firstname is too short')
      .max(50, 'Firstname is too long')
      .required('Firstname is required'),
    lastName: Yup.string()
      .min(2, 'Lastname is short!')
      .max(50, 'Lastname is too Long!')
      .required('Lastname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    roles: Yup.array().required("Roles is required"),
    cellNumber: Yup.string()
      .matches(phoneNumberRegex, 'Phone number is not valid')
      .required('Phone number is required.'),
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    cellNumber: '',
    roles: null,
  };

  const [addUser] = useAddUserMutation();
  const submitUser = async (value: any) => {
    setIsSubmitting(true)
    const {data, error: userError} = await addUser(value);
    if(data || userError){
      if(userError){
        console.log("User Error", userError)
       setError(userError?.data?.message)
      }else{
        setSuccess("Account has been created.")
      }
    }

    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000)
    setIsSubmitting(false)
  };

  return (
    <React.Fragment>
      <Button
        type="primary"
        onClick={() => {
          setModalOpen(true);
          formRef?.current?.resetForm()
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
                submitUser(values) 
              }}
              validationSchema={registerSchema}
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
                      mode="multiple"
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
          isOkLoading: isSubmitting,
        }}
        buttonClose={{
          label: 'Cancel',
          action: () => {
            if(!isSubmitting){
              setModalOpen(false);
            }
          },
          isCancelDisabled: isSubmitting,
        }}
      />
    </React.Fragment>
  );
};

export default Register;
