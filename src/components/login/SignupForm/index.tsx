import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import SIGNUP_MUTATION from "./signupForm.graphql";
import REGISTRATION_QUERY from "./registration.graphql";
// Refetch
import CURRENT_USER_QUERY from "@/hooks/useUser/useUser.graphql";

import { userSchema } from "./signupForm.schema";

import Loading from "@/components/utility/Loading";
import SuccessMessage from "@/components/utility/SuccessMessage";
import ErrorMessage from "@/components/utility/ErrorMessage";
import FormErrorMessage from "@/components/utility/FormErrorMessage";
import Button from "@/components/common/Button";
import { DatePickerField } from "@/components/utility/DateFields";
import { dateEighteenYearsAgo } from "@/lib";

import Styles from "./signupForm.module.scss";

const SignupForm = () => {
  const router = useRouter();
  const { token } = router.query;

  const {
    error: queryError,
    loading: queryLoading,
    data: queryData,
  } = useQuery(REGISTRATION_QUERY, {
    variables: {
      token: token || "fail",
    },
    skip: !token,
  });

  const [
    signUp,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(SIGNUP_MUTATION);

  if (!token) {
    return <ErrorMessage error={{ message: "No token specified." }} />;
  }

  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  if (queryLoading || !queryData.getRegistration) {
    return "Loading...";
  }

  const { email, firstName, lastName } = queryData.getRegistration;

  return (
    <>
      <h2>Sign Up for a Guest Account</h2>

      {mutationData && mutationData.signUp && (
        <>
          <SuccessMessage message={mutationData.signUp.message} />
          <p>
            Click <Link to="/login">here</Link> to login.
          </p>
        </>
      )}
      {queryData && queryData.getRegistration && (
        <Formik
          initialValues={{
            email,
            firstName,
            lastName,
            username: "",
            gender: "MALE",
            birthdate: dateEighteenYearsAgo(),
            token,
          }}
          validationSchema={userSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await signUp({
              variables: values,
              refetchQueries: [{ query: CURRENT_USER_QUERY }],
              awaitRefetchQueries: true,
            });
            setSubmitting(false);
          }}
        >
          {(formikProps) => (
            <div className={`${Styles["form"]} profile-form--user`}>
              <form onSubmit={formikProps.handleSubmit}>
                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["form-label"]} htmlFor="firstName">
                    First Name
                  </label>
                  <div className={Styles["form-field"]}>
                    <Field
                      disabled
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
                      disabled
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
                      disabled
                      type="email"
                      onChange={formikProps.handleChange}
                      id="email"
                      name="email"
                    />
                    <FormErrorMessage name="email" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["form-label"]} htmlFor="username">
                    Username
                  </label>
                  <div className={Styles["form-field"]}>
                    <Field
                      type="text"
                      onChange={formikProps.handleChange}
                      id="username"
                      name="username"
                    />
                    <FormErrorMessage name="username" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["form-label"]} htmlFor="gender">
                    Gender
                  </label>
                  <div className={Styles["form-field"]}>
                    <Field component="select" name="gender" id="gender">
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                      <option value="UNDISCLOSED">Prefer not to say</option>
                    </Field>
                    <FormErrorMessage name="gender" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["form-label"]} htmlFor="birthdate">
                    Birthdate
                  </label>
                  <div>
                    <DatePickerField
                      id="birthdate"
                      name="birthdate"
                      value={formikProps.values.birthdate}
                      maxDate={dateEighteenYearsAgo()}
                      onChange={formikProps.setFieldValue}
                      className={Styles["date-field"]}
                    />
                    <FormErrorMessage name="birthdate" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["form-label"]} htmlFor="password">
                    Password
                  </label>
                  <div className={Styles["form-field"]}>
                    <Field
                      type="password"
                      onChange={formikProps.handleChange}
                      id="password"
                      name="password"
                    />
                    <FormErrorMessage name="password" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <div />
                  <div>
                    <Field type="hidden" id="token" name="token" />

                    <Button
                      type="submit"
                      disabled={
                        !formikProps.dirty ||
                        !formikProps.isValid ||
                        formikProps.isSubmitting ||
                        mutationLoading
                      }
                    >
                      Sign Up
                    </Button>
                    <Loading loading={mutationLoading} />
                    <ErrorMessage error={mutationError} />
                  </div>
                </div>
              </form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default SignupForm;
