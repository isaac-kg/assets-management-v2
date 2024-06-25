import { FC } from 'react';
import { Button } from 'antd';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import CustomInput from '../components/Input';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/auth/actions/auth.actions';
import CustomAlert from '../components/Alerts';

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const initialValues = {
    password: '',
    email: '',
  };

  const { error, isLoading } = useSelector((state) => state.auth);
  return (
    <div className="h-screen flex">
      <div className="w-6/12 bg-slate-200 hidden md:flex">
        <div className="m-auto w-96 px-10">
          <p>PWY CONSULTING</p>
          <p className="text-3xl my-6">
            Integrated engineered solutions for complete assets management.
          </p>
          <p>Managing Assets Made Simple.</p>
        </div>
      </div>

      <div className="md:w-6/12 flex m-auto">
        <div className="w-96 m-auto px-10">
          <p className="font-semibold text-2xl">Sign In</p>
          <p className="text-base mt-2 mb-8">
            Welcome to PWY Consulting assets management platform.
          </p>

          {error && <div className='mb-2'><CustomAlert message={error} type={'error'} /></div>}
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              dispatch(login({ values, navigate }));
            }}
            validationSchema={registerSchema}
          >
            {({ values, handleChange, errors, touched, handleBlur }) => (
              <Form>
                <div>
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
                <div className="mt-6">
                  <CustomInput
                    label="Password"
                    name="password"
                    value={values.password}
                    placeholder="Enter password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.password}
                    touched={touched.password}
                    type="password"
                  />
                </div>
                <p className="text-right mt-2">Forgot Password?</p>
                <div className="mt-6">
                  <Button
                    type="primary"
                    disabled={isLoading}
                    size="large"
                    block
                    htmlType="submit"
                    loading={isLoading}
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="mt-4 text-center text-base">
            Don't have an account?{' '}
            <span className="text-primary-color font-bold">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
