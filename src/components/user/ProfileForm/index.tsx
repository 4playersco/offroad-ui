import { FC, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Field } from "formik";
import get from "lodash/get";
import cn from "classnames";

import MEMBER_PROFILE_QUERY from "./memberProfile.graphql";
import USER_UPDATE_PROFILE_MUTATION from "./updateUserProfile.graphql";
import SELF_PROFILE_QUERY from "./self.graphql";

import { userSchema } from "./profileForm.schema";

import AvatarUploader from "@/components/common/AvatarUploader";
import ErrorMessage from "@/components/utility/ErrorMessage";
import SuccessMessage from "@/components/utility/SuccessMessage";
import FormErrorMessage from "@/components/utility/FormErrorMessage";
import Loading from "@/components/utility/Loading";
import Filter from "@/components/login/Filter";
import Button from "@/components/common/Button";
import { DatePickerField } from "@/components/utility/DateFields";
import { dateEighteenYearsAgo, formatPhone, isAtLeastBoardMember } from "@/lib";

import Styles from "./profileForm.module.scss";
import { setUser } from "@sentry/react";

interface ProfileFormProps {
  member?: string;
  isAdmin?: boolean;
}

const ProfileForm: FC<ProfileFormProps> = ({
  member = "self",
  isAdmin = false,
}) => {
  const isSelf = member === "self";
  const [userForm, setUserForm] = useState({});
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(isSelf ? SELF_PROFILE_QUERY : MEMBER_PROFILE_QUERY, {
    variables: { username: member },
  });

  const [
    userUpdateProfile,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(USER_UPDATE_PROFILE_MUTATION, {
    variables: userForm,
    refetchQueries: ["PROFILE_QUERY"],
  });

  if (queryLoading) {
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { user } = queryData;
  const isGuest =
    user.accountType === AccountType.GUEST ||
    (user.accountStatus !== AccountStatus.ACTIVE &&
      user.accountStatus !== AccountStatus.PAST_DUE);

  const userFormValues = {
    id: queryData.user.id,
    firstName: queryData.user.firstName || "",
    lastName: queryData.user.lastName || "",
    username: queryData.user.username || "", // admin
    gender: queryData.user.gender || "MALE",
    birthdate:
      (queryData.user.birthdate && new Date(queryData.user.birthdate)) || null, // admin
    email: queryData.user.email, // admin
    joined: (queryData.user.joined && new Date(queryData.user.joined)) || null, // admin
    phone:
      (queryData.user.contactInfo &&
        queryData.user.contactInfo.phone &&
        formatPhone(queryData.user.contactInfo.phone)) ||
      "",
    street:
      (queryData.user.contactInfo && queryData.user.contactInfo.street) || "",
    city: (queryData.user.contactInfo && queryData.user.contactInfo.city) || "",
    state:
      (queryData.user.contactInfo && queryData.user.contactInfo.state) || "CO",
    zip: (queryData.user.contactInfo && queryData.user.contactInfo.zip) || "",
    preferencesId: get(queryData, "user.preferences.id", null),
    contactInfoId: get(queryData, "user.contactInfo.id", null),
    emergencyContactName:
      (queryData.user.preferences &&
        queryData.user.preferences.emergencyContactName) ||
      "",
    emergencyContactPhone:
      (queryData.user.preferences &&
        queryData.user.preferences.emergencyContactPhone &&
        formatPhone(queryData.user.preferences.emergencyContactPhone)) ||
      "",
    comfortLevel: queryData.user.comfortLevel || "UNKNOWN",
    showPhoneNumber: queryData.user.showPhoneNumber,
  };

  return (
    <>
      {isSelf && (
        <AvatarUploader image={queryData.user.avatar} isGuest={isGuest} />
      )}

      <Formik
        initialValues={userFormValues}
        validationSchema={userSchema}
        onSubmit={(values, { setSubmitting }) => {
          setUser({
            ...values,
            joined: values.joined || null,
            showPhoneNumber: values.showPhoneNumber === "yes",
            phone: values.phone.split("-").join(""),
            emergencyContactPhone: values.emergencyContactPhone
              .split("-")
              .join(""),
          });
          setSubmitting(true);
          userUpdateProfile();
          setSubmitting(false);
        }}
      >
        {(formikProps) => (
          <div className={cn(Styles["form"], Styles["profile-form--user"])}>
            <form onSubmit={formikProps.handleSubmit}>
              <div className={Styles["form-field-wrapper"]}>
                <label
                  className={Styles["profile-form-label"]}
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <div className={Styles["profile-form-field"]}>
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
                <label
                  className={Styles["profile-form-label"]}
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <div className={Styles["profile-form-field"]}>
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
                <label
                  className={Styles["profile-form-label"]}
                  htmlFor="username"
                >
                  Username
                </label>
                <div className={Styles["profile-form-field"]}>
                  <Field
                    type="text"
                    onChange={formikProps.handleChange}
                    id="username"
                    name="username"
                    disabled={!isAdmin}
                  />
                  <FormErrorMessage name="username" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label
                  className={Styles["profile-form-label"]}
                  htmlFor="gender"
                >
                  Gender
                </label>
                <div className={Styles["profile-form-field"]}>
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
                <label
                  className={Styles["profile-form-label"]}
                  htmlFor="birthdate"
                >
                  Birthdate
                </label>
                <div>
                  <DatePickerField
                    id="birthdate"
                    name="birthdate"
                    value={formikProps.values.birthdate}
                    maxDate={dateEighteenYearsAgo()}
                    disabled={!isAdmin}
                    disableCalendar={!isAdmin}
                    onChange={formikProps.setFieldValue}
                    className={cn(Styles["profile-date-field"], {
                      [Styles["profile-date-field--disabled"]]: !isAdmin,
                    })}
                  />
                  <FormErrorMessage name="birthdate" />
                </div>
              </div>

              <Filter roleCheck={isAtLeastBoardMember}>
                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["profile-form-label"]}
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className={Styles["profile-form-field"]}>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      value={formikProps.values.email}
                      disabled
                    />
                    <FormErrorMessage name="email" />
                  </div>
                </div>
              </Filter>

              {isAdmin && (
                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["profile-form-label"]}
                    htmlFor="joined"
                  >
                    Joined
                  </label>
                  <div>
                    <DatePickerField
                      id="joined"
                      name="joined"
                      value={formikProps.values.joined}
                      maxDate={new Date()}
                      disabled={!isAdmin}
                      disableCalendar={!isAdmin}
                      onChange={formikProps.setFieldValue}
                      className={cn(Styles["profile-date-field"], {
                        [Styles["profile-date-field--disabled"]]: !isAdmin,
                      })}
                    />
                    <FormErrorMessage name="joined" />
                  </div>
                </div>
              )}

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["profile-form-label"]} htmlFor="phone">
                  Phone Number
                </label>
                <div className={Styles["profile-form-field"]}>
                  <Field
                    type="text"
                    inputMode="text"
                    placeholder="ex: 303-555-5555"
                    id="phone"
                    name="phone"
                  />
                  <FormErrorMessage name="phone" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label
                  className={Styles["profile-form-label"]}
                  htmlFor="street"
                >
                  Street Address
                </label>
                <div className={Styles["profile-form-field"]}>
                  <Field type="text" id="street" name="street" />
                  <FormErrorMessage name="street" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["profile-form-label"]} htmlFor="city">
                  City
                </label>
                <div className={Styles["profile-form-field"]}>
                  <Field type="text" id="city" name="city" />
                  <FormErrorMessage name="city" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["profile-form-label"]} htmlFor="state">
                  State
                </label>
                <div className={Styles["profile-form-field"]}>
                  <Field component="select" id="state" name="state">
                    {Object.entries(States).map(([abbrev, state]) => (
                      <option key={abbrev} value={abbrev}>
                        {state}
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage name="state" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["profile-form-label"]} htmlFor="zip">
                  Zip Code
                </label>
                <div className={Styles["profile-form-field"]}>
                  <Field
                    type="text"
                    placeholder="ex: 80206"
                    inputMode="numeric"
                    id="zip"
                    name="zip"
                  />
                  <FormErrorMessage name="zip" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label
                  className={Styles["profile-form-label"]}
                  htmlFor="emergencyContactName"
                >
                  Emergency Contact Name
                </label>
                <div className={Styles["profile-form-field"]}>
                  <Field
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                  />
                  <FormErrorMessage name="emergencyContactName" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label
                  className={Styles["profile-form-label"]}
                  htmlFor="emergencyContactPhone"
                >
                  Emergency Contact Phone Number
                </label>
                <div className={Styles["profile-form-field"]}>
                  <Field
                    type="text"
                    inputMode="text"
                    placeholder="ex: 303-555-5555"
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                  />
                  <FormErrorMessage name="emergencyContactPhone" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label
                  className={Styles["profile-form-label"]}
                  htmlFor="comfortLevel"
                >
                  Trail Comfort Level
                </label>
                <div className={Styles["profile-form-field"]}>
                  <Field
                    component="select"
                    name="comfortLevel"
                    id="comfortLevel"
                  >
                    {Object.keys(TrailDifficulties).map((difficulty, i) => (
                      <option key={i} value={difficulty}>
                        {
                          TrailDifficulties[
                            difficulty as keyof typeof TrailDifficulties
                          ]
                        }
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage name="comfortLevel" />
                </div>
              </div>

              <div className={Styles["form-footer"]}>
                <div />
                <div>
                  <Button
                    type="submit"
                    disabled={
                      (formikProps.errors &&
                        Object(formikProps.errors).length === 0) ||
                      !formikProps.dirty ||
                      !formikProps.isValid ||
                      formikProps.isSubmitting ||
                      mutationLoading
                    }
                  >
                    Update
                  </Button>
                  <Loading loading={mutationLoading} />
                  <ErrorMessage error={mutationError} />
                  {mutationData && (
                    <SuccessMessage
                      message={mutationData.updateUserProfileSettings.message}
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ProfileForm;
