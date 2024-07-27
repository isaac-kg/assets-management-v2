import { Button } from 'antd';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CustomInput from '../components/Input';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import SelectInput from '../components/SelectInput';
import { useUpdateUserMutation } from '../Services/user';
import CustomAlert from '../components/Alerts';
import { setUser } from '../store/auth/reducers/auth.reducers';

const Profile = () => {
  const phoneNumberRegex = /^(\+?27|0)[6-8][0-9]{8}$/;
  const { user, userId} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const profielUpdateSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Firstname is too short')
      .max(50, 'Firstname is too long')
      .required('Firstname is required'),
    lastName: Yup.string()
      .min(2, 'Lastname is short!')
      .max(50, 'Lastname is too Long!')
      .required('Lastname is required'),
    idNumber: Yup.string()
      .matches(/^\d{13}$/, 'Id number is invalid')
      .required('Id number is required'),
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
    idNumber: user.idNumber,
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

  const [updateUser, {isLoading, isSuccess, isError}] = useUpdateUserMutation();

 const updateUserInfo = async (user: any) => {
  const {data} = await updateUser(user);
  if(data)
{
  console.log("Isallocaing: ", isLoading)
}  console.log("DAta", data);
dispatch(setUser(data.profile));
 }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update Profile" />

      <div className="flex flex-col gap-10 max-w-115 mt-10">
        <Formik
          initialValues={initialValues}
          onSubmit={(values: Record<string, any>, actions) => {
            updateUserInfo({userId, ...values})
          }}
          validationSchema={profielUpdateSchema}
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
                  label="ID Number"
                  name="idNumber"
                  value={values.idNumber}
                  placeholder="Enter ID Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.idNumber}
                  touched={touched.idNumber}
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
              <div className="mt-4 mb-1">
              {isSuccess && (
                    <CustomAlert message={"You have successfuly update the user"} type={'success'} />
                  )}
                  {isError && <CustomAlert message={"Cannot update user"} type={'error'} />}
              </div>
              <Button htmlType="submit" block type="primary" disabled={isLoading} loading={isLoading}>
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
