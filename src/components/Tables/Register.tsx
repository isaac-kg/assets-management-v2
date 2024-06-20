import React, { useState } from "react";
import { Button } from "antd";
import { Form, Formik } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import CustomInput from "../Input";
import CustomModal from "../Modal";
import axios from "axios";

const Register = () => {
  const [openModal, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null);

  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Firstname is too short")
      .max(50, "Firstname is too long")
      .required("Firstname is required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    cellNumber: "",
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
              onSubmit={(values, actions) => {
                values.roles = "tester";
                values.password = "Admin@123";
                //TODO submit values to backend.
                // roles: admin, scanner, office-manager

              axios.post(`http://localhost:4000/signup`, values).then(res => {
                console.log("res =>", res)
                // navigate("/dashboard")
                res.data;
              }).catch(err => {
                console.log("err =>", err)
              })
              }}
              validationSchema={registerSchema}
              innerRef={formRef}
            >
              {({ values, handleChange, errors, touched, handleBlur }) => (
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
                </Form>
              )}
            </Formik>
          </div>
        }
        button={{
          label: isSubmitting ? "Submitting" : "Submit",
          action: () => {
            formRef?.current?.handleSubmit();
          },
          isOkDisabled: isSubmitting
        }}
        buttonClose={{
          label: "Cancel",
          action: () => {
            setModalOpen(false);
          },
          isCancelDisabled: isSubmitting
        }}
      />
    </React.Fragment>
  );
};

export default Register;
