import { Button } from 'antd';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CustomInput from '../components/Input';
import { useAppSelector } from '../store/hooks';
import SelectInput from '../components/SelectInput';

const Profile = () => {
  const phoneNumberRegex = /^(\+?27|0)[6-8][0-9]{8}$/;
  const { user } = useAppSelector((state) => state.auth);
  console.log('user information', user);

  const profielUpdateSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Firstname is too short')
      .max(50, 'Firstname is too long')
      .required('Firstname is required'),
    lastName: Yup.string()
      .min(2, 'Lastname is short!')
      .max(50, 'Lastname is too Long!')
      .required('Lastname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    cellNumber: Yup.string()
      .matches(phoneNumberRegex, 'Phone number is not valid')
      .required('Phone number is required.'),
  });

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    cellNumber: user?.cellNumber,
    roles: user?.roles,
  };


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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update Profile" />

      <div className="flex flex-col gap-10 max-w-115 mt-10">
        <Formik
          initialValues={initialValues}
          onSubmit={(values: Record<string, any>, actions) => {
            console.log('Call profile update method', values);
          }}
          validationSchema={profielUpdateSchema}
        >
          {({ values, handleChange, errors, touched, handleBlur, setFieldValue, setFieldTouched }) => (
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
              <div className="mt-4 mb-1"></div>
              <Button htmlType="submit" block type="primary">
                Submit
              </Button>
              <br />
            </Form>
          )}
        </Formik>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
