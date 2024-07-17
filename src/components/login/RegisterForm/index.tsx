import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Field } from "formik";

import REGISTER_MUTATION from "./registerForm.graphql";
import { registerSchema } from "./registerForm.schema";

import Loading from "@/components/utility/Loading";
import ErrorMessage from "@/components/utility/ErrorMessage";
import SuccessMessage from "@/components/utility/SuccessMessage";
import FormErrorMessage from "@/components/utility/FormErrorMessage";
import Button from "@/components/common/Button";
import Captcha from "@/components/common/Captcha";

import Styles from "./registerForm.module.scss";

const RegisterForm = ({ source = "website" }) => {
  const [validRecaptcha, setValidRecaptcha] = useState(false);
  const [register, { error, loading, data }] = useMutation(REGISTER_MUTATION);

  const registerInfo = {
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    source,
  };

  const handleCaptchaChange = useCallback(
    (isValid: any) => {
      setValidRecaptcha(isValid);
    },
    [setValidRecaptcha]
  );

  return data && data.register ? (
    <SuccessMessage message={data.register.message} />
  ) : (
    <Formik
      initialValues={registerInfo}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await register({ variables: { ...values } });
        setSubmitting(false);
      }}
    >
      {(formikProps) => {
        const disabled =
          !validRecaptcha ||
          !formikProps.dirty ||
          !formikProps.isValid ||
          formikProps.isSubmitting ||
          loading;

        return (
          <div className={Styles["form"]}>
            <form onSubmit={formikProps.handleSubmit}>
              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="firstName">
                  First Name
                </label>
                <div className={Styles["form-field"]}>
                  <Field
                    type="text"
                    onChange={formikProps.handleChange}
                    id="firstName"
                    name="firstName"
                  />
                  <FormErrorMessage name="firstName" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="lastName">
                  Last Name
                </label>
                <div className={Styles["form-field"]}>
                  <Field
                    type="text"
                    onChange={formikProps.handleChange}
                    id="lastName"
                    name="lastName"
                  />
                  <FormErrorMessage name="lastName" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="email">
                  Email
                </label>
                <div className={Styles["form-field"]}>
                  <Field
                    type="email"
                    onChange={formikProps.handleChange}
                    id="email"
                    name="email"
                  />
                  <FormErrorMessage name="email" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="confirmEmail">
                  Confirm Email
                </label>
                <div className={Styles["form-field"]}>
                  <Field
                    type="email"
                    onChange={formikProps.handleChange}
                    id="confirmEmail"
                    name="confirmEmail"
                  />
                  <FormErrorMessage name="confirmEmail" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <div />
                <div>
                  <Field type="hidden" id="source" name="source" />

                  <div className={Styles["recaptcha"]}>
                    <Captcha onChange={handleCaptchaChange} />
                  </div>

                  <Button type="submit" disabled={disabled}>
                    Register
                  </Button>
                  <Loading loading={loading} />
                  <ErrorMessage error={error} />
                </div>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
