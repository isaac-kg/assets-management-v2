import { FC } from "react";
import { Input, Button, Typography } from "antd";

const Login:FC = () => {
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
          <div>
            <p className="text-base mb-1">Email Address</p>
            <Input size="large" name="name" placeholder="Enter email address" />
          </div>
          <div className="mt-6">
            <p className="text-base mb-1">Password</p>
            <Input size="large" name="name" placeholder="Enter email address" />
          </div>
          <p className="text-right mt-2">Forgot Password?</p>
          <div className="mt-6">
            <Button type="primary" size="large" block>
              Sign In
            </Button>
          </div>
          <p className="mt-4 text-center text-base">
            Don't have an account?{" "}
            <span className="text-primary font-bold">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
